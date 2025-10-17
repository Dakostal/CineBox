import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
    email: string
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
        logout: (state) => {
            state.currentUser = null
            localStorage.removeItem('userData')
        }
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer