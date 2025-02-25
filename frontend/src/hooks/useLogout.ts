import { useDispatch } from "react-redux"
import { setUser } from "../redux/user/userSlice"

const useLogout = () => {
    const dispatch = useDispatch()
    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem('user')
        dispatch(setUser(null))
    }

    return { logout }
}

export default useLogout