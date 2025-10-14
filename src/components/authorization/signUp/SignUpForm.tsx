import { Controller, useFormContext } from "react-hook-form"



export const SignUpForm = () => {
    const {
        control,
        formState: {errors}
    } = useFormContext()

    return (
        <div>
            <div>
                <label htmlFor="login">Login</label>
                <Controller
                    name="login"
                    control={control}
                    render={({field}) => (
                        <input
                            {...field} 
                            id="login"
                            type="text"
                            placeholder="Введите ваше имя" />
                    )}
                />
                {errors.login && <div>{errors.login.message as string}</div>}
            </div>

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
        </div>
    )
}