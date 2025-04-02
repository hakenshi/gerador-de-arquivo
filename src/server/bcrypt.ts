import bcrypt from "bcrypt"

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export async function checkHashedPassowrd(userPassword: string, password: string) {
    return bcrypt.compare(password, userPassword)
}

