import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { SignUpSchema } from "../../../lib/types";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { useRouter } from '@tanstack/react-router'
import { login } from "../../../redux/slices/userSlice";

interface SignUpFormValue {
    email: string;
    password: string;
    confirmPassword: string;
    acceptRules: boolean;
}

export const SignUpForm = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm <SignUpFormValue>( {
            resolver: zodResolver(SignUpSchema),
            defaultValues: {
                email: '',
                password: '',
                confirmPassword: '',
                acceptRules: false,
            }
    })
    const dispatch = useAppDispatch()


    const onSubmit = (data: SignUpFormValue) => {
        const userData = {email: data.email}
        dispatch(login(userData))
        
        console.log(userData);
        reset()
        router.navigate({to: '/'})
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <input 
                                {...field}
                                id="email" 
                                type="email" 
                                placeholder="email"                           
                            />
                        )}
                    />
                    {errors.email && <div>{errors.email.message as string}</div>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <Controller
                        name="password"
                        control={control}
                        render={({field}) => (
                            <input 
                                {...field}
                                id="password" 
                                type="password" 
                                placeholder="Пароль"                           
                            />
                        )}
                    />
                {errors.password && <div>{errors.password.message as string}</div>}    
                </div>

                <div>
                    <label htmlFor="confirmPassword">Password</label>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({field}) => (
                            <input 
                                {...field}
                                id="confirmPassword" 
                                type="Password" 
                                placeholder="Повторите пароль"                           
                            />
                        )}
                    />
                {errors.confirmPassword && <div>{errors.confirmPassword.message as string}</div>}    
                </div>
                
                <div>
                    <Controller
                        name="acceptRules"
                        control={control}
                        render={({field}) => (
                            <label>
                                <input 
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}    
                                />
                                Необходимо принять условия
                            </label>
                        )}
                    />
                {errors.acceptRules && <div>{errors.acceptRules.message as string}</div>}
                </div>
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
}