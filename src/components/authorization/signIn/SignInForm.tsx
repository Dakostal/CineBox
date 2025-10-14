import {Controller, useForm, type SubmitHandler} from 'react-hook-form'

type FormFields = {
    email: string;
    password: string;
}

export const SignInForm = () => {
    const {
        control, 
        handleSubmit,
        reset,
        formState: {errors},
     } = useForm<FormFields>( {
        defaultValues: {
            email: '',
            password: '',
        }
     })
    
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
        reset()
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