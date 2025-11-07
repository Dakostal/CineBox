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
}).refine(data => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const emailExists = registeredUsers.some((user: { email: string }) => user.email === data.email)
    return !emailExists
}, {
    message: "Пользователь с таким email уже зарегистрирован",
    path: ["email"],
})

export const SignInSchema = z.object({
    email: z.string().email("Непарвильный Email"),
    password: z.string().min(6, "Неправильный пароль")
}).refine(data => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const userExists = registeredUsers.some((user: { email: string; password: string }) => 
        user.email === data.email && user.password === data.password
    )
    return userExists
}, {
    message: "Неверный email или пароль",
    path: ["email"],
})
