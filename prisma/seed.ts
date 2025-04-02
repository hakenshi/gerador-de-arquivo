import { hashPassword } from "@/server/bcrypt";
import { PrismaClient } from "@prisma/client";
import db from "./prisma";

try {
    const defaultUser = await db.users.create({
        data: {
            firstName: "Usuário",
            secondName: "Admin",
            email: "admin@admin.com",
            password: await hashPassword("admin"),
        }
    })
    console.log(defaultUser)
} catch (e) {
    console.error(e)
}