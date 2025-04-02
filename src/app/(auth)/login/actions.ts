'use server'

import { LoginFormState, LoginSchema } from "@/types/login"
import { z } from "zod"
import { loginSchema } from "./schema"
import { PrismaClient } from "@prisma/client"
import { checkHashedPassowrd, hashPassword } from "@/server/bcrypt"
import jwt from "jsonwebtoken"
import { deleteSession, saveSession } from "@/server/session"
import db from "../../../../prisma/prisma"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function createSession(form: z.infer<typeof loginSchema>): Promise<LoginFormState> {

    const values = loginSchema.safeParse(form)

    if (!values.success) {
        const errors = values.error.flatten().fieldErrors
        const fields: Record<string, string> = {}

        for (const key of Object.keys(errors)) {
            fields[key] = form[key as keyof typeof form]
        }

        return {
            status: 400,
            errors,
            fields
        }
    }

    const user = await db.users.findFirstOrThrow({
        where: {
            email: values.data?.email,
        }
    })

    const validPassword = await checkHashedPassowrd(user.password, values.data.password)

    if (!user || !validPassword) {
        return {
            status: 400,
            errors: { error: ['Email ou senha inválidos.'] },
            fields: values.data
        }
    }

    const token = jwt.sign(user, `${process.env.NEXT_JWT_SECRET}`)
    await saveSession({ user, token })
    return {
        status: 200,
    }

}

export async function destroySession() {
    await deleteSession()
    revalidateTag("/")
    redirect("/login")
}
