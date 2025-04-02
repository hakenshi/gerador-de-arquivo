import { z } from "zod"

export const loginSchema = z.object({
    email: z.string()
        .email({
            message: "Por favor insira um email válido."
        })
        .min(3, { message: "O email deve ter ao menos 3 caractéres." })
        .nonempty({
            message: "O email é obrigatório."
        })
        ,
    password: z.string({ message: "Por favor insira uma senha válida." })
        .min(3, {
            message: "A senha deve ter ao menos 3 caractéres."
        })
        .nonempty({
            message: "A senha é obrigatória"
        })
})