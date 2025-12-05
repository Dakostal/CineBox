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

export const MovieSchema = z.object({
  title: z.string().min(2, 'Название должно быть не короче 2 символов'),

  year: z
    .number()
    .int('Год должен быть целым числом')
    .min(1800, 'Год не может быть раньше 1800')
    .max(new Date().getFullYear() + 1, 'Год из будущего?')
    .refine((val) => val !== undefined, {
      message: 'Год обязателен',
    }),

  genre: z.string().min(1, 'Выберите жанр'),
  watched: z.boolean(),
});

export type MovieFormData = z.infer<typeof MovieSchema>;