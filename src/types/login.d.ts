import { loginSchema } from "@/app/(auth)/login/schema";

type LoginSchema = z.infer<typeof loginSchema>

type LoginFormState = {
    status: number
    errors?: Record<string, string[]>
    fields?: Record<string, string>
}