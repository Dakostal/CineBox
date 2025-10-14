import { useState } from "react"
import { SignUpForm } from "./signUp/SignUpForm"
import { SignInForm } from "./signIn/SignInForm"

export const Authorization = () => {
    const [isLogin, setIsLogin] = useState(true)
    return(
        <div>
            <div>
                <button onClick={()=> setIsLogin(true)}>Ругистрация</button>
                <button onClick={()=> setIsLogin(false)}>Вход</button>
            </div>
            {isLogin ? <SignUpForm /> : <SignInForm />}
        </div>
    )
}