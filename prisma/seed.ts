import { hashPassword } from "@/server/bcrypt";
import { PrismaClient, Users } from "@prisma/client";

const db = new PrismaClient()
try {
    const defaultUser = await db.users.create({
        data: {
            firstName: "jorge",
            secondName: "da silva",
            email: "jorge@email.com",
            password: await hashPassword("123"),
        }
    })
    console.log(defaultUser)
} catch (e) {
    console.error(e)
}