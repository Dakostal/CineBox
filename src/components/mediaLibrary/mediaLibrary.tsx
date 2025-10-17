import { useAppDispatch } from "../../redux/hooks/hooks"
import { logout } from "../../redux/slices/userSlice"

export const MediaLibrary = () => {
    const dispatch = useAppDispatch()
    
    return(
        <div>
            <h1>Главная старница</h1>
            <button onClick={()=> dispatch(logout())}>Выйти</button>
        </div>
    )
}