import { z } from 'zod';

export const SignUpSchema = z.object ({
    email: z.string().email("Непарвильный Email"),
    password: z.string().min(6, "Слишком короткий пароль"),
    acceptRules: z.boolean().refine((val) => val === true, {
        message: "Необходимо принять условия"
    }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
})

export const SignInSchema = z.object({
    email: z.string().email("Непарвильный Email"),
    password: z.string().min(6, "Неправильный пароль")
})
