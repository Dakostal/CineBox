import { z } from 'zod';

export const SignUpSchema = z.object ({
    email: z.string().email("Непарвильный Email"),
    password: z.string().min(6, "Слишком короткий пароль"),
    acceptRules: z.literal(true, {message: "Необходимо принять условия"}),
    confirmPassword: z.string().min(6, "Повторите пароль"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
})

export const SignInSchema = z.object({
    email: z.string().email("Непарвильный Email"),
    password: z.string().min(6, "Неправильный пароль")
})
