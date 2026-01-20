import {Controller, useForm } from 'react-hook-form'
import { SignInSchema } from '../../../lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { login, type User } from '../../../redux/slices/userSlice'
import { useRouter } from "@tanstack/react-router"
import { z } from 'zod';

type FormFields = z.infer<typeof SignInSchema>

export const SignInForm = () => {
    const router = useRouter()

    const {
        control, 
        handleSubmit,
        reset,
        formState: {errors},
     } = useForm<FormFields>( {
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
     })
    
    const dispatch = useAppDispatch()

    const onSubmit = (data: FormFields ) => {
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const user = users.find((user: User) => user.email === data.email && user.password === data.password)

        dispatch(login(user))
        reset()
        router.navigate({to: '/'})
    } 

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Controller 
                        control={control}
                        name='email'
                        rules={{
                            required: 'Электронная почта обязательна',
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        }}
                        render={({field}) => (
                            <input 
                                id="email"  
                                type="email" 
                                placeholder="email"
                                {...field}
                            />
                        )}
                    />
                    {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                </div>
                <div>  
                    <label htmlFor='password'>Password</label>
                        <Controller 
                            control={control}
                            name='password'
                            rules={{
                                required: 'Длина пароля должна быть не менее 6 символов',
                                minLength: 6,
                            }}
                            render={({field}) => (
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="password"
                                    {...field}
                                />
                            )}
                        />
                    {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
                </div>
                <button type='submit'>Вход</button>
            </form>
        </div>
    )
}