import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
    email: string
    password: string
}

interface UserState {
    currentUser: User | null
}

const initialState: UserState = {
    currentUser: JSON.parse(localStorage.getItem('userData') || 'null')
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload))
        },
        register: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload))

            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
            if (!registeredUsers.some((user: User) => user.email === action.payload.email)) {
                registeredUsers.push(action.payload)
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
            }
        },
        logout: (state) => {
            state.currentUser = null
            localStorage.removeItem('userData')
        }
    }
})

export const {login, register, logout} = userSlice.actions
export default userSlice.reducer