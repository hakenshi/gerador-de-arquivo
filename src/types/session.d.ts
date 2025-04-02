import { Users } from "@prisma/client"

type SessionType = {
    token: String
    user: Users
}
