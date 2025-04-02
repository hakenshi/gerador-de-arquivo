import { z } from "zod";

export const userSchema = z.object({
    firstName: z.string().min(1, "Primeiro nome é obrigatório"),
    secondName: z.string().min(1, "Segundo nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
});

export const userUpdateSchema = z.object({
    firstName: z.string().min(1, "Primeiro nome é obrigatório"),
    secondName: z.string().min(1, "Segundo nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres").optional().or(z.literal('')),
});

export type UserFormValues = z.infer<typeof userSchema>;
export type UserUpdateFormValues = z.infer<typeof userUpdateSchema>;