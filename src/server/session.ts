'server-only'

import { SessionType } from "@/types/session"
import { Users } from "@prisma/client"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

const secret = `${process.env.NEXT_JWT_SECRET}`

export async function getUserSession() {

    const session = await getSession()

    return {
        user: session.user as Users,
        token: session.token as string
    }
}

export async function getSession() {
    const cookie = await cookies()

    return getIronSession<SessionType>(cookie, {
        password: secret,
        ttl: 0,
        cookieName: "auth_token",
        cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "lax"
        }
    })
}

export async function saveSession({ user, token }: SessionType) {
    const session = await getSession()
    session.token = token
    session.user = user
    await session.save()
}

export async function deleteSession() {
    const session = await getSession()
    await session.destroy()
}
