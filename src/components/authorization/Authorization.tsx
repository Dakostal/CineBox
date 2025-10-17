import { useState } from "react"
import { SignUpForm } from "./signUp/SignUpForm"
import { SignInForm } from "./signIn/SignInForm"

export const Authorization = () => {
    const [isLogin, setIsLogin] = useState(true)
    return(
        <div>
            <div>
                <button onClick={()=> setIsLogin(false)}>Регистрация</button>
                <button onClick={()=> setIsLogin(true)}>Вход</button>
            </div>
            {isLogin ? <SignInForm /> : <SignUpForm />}
        </div>
    )
}