import { useDispatch } from "react-redux"
import { setUser } from "../../redux/user/userSlice"
import { setMyBlogs } from "../../redux/blogs/myBlogSlice"

const useLogout = () => {
    const dispatch = useDispatch()
    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('currentBlog')
        dispatch(setUser(null))
        dispatch(setMyBlogs([]))
    }

    return { logout }
}

export default useLogout