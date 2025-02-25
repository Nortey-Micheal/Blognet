import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/blogs/blogSlice";

const useMyBlogs = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const getMyBlogs = async (email:string) => {
        setIsLoading(true)

        if(!email) {
            console.warn("No Email");
            return
        }

        try {
            const response = await fetch(`http://localhost:5050/api/blogs/myBlogs/${encodeURIComponent(email)}`, {
                method: "GET",
                headers: { "Content-type": "application/json"},
    
            })

            console.log(response.status)
    
            const blogs = await response.json();
    
            if (!response.ok) {
                setIsLoading(false)
                setError(blogs.error)
            }
    
            if (response.ok) {
                setIsLoading(false)
                setError(null)
                dispatch(setBlogs(blogs))
            }
        } catch (error) {
            setIsLoading(false)
            setError("Failed to fetch blogs")
        }
    }

    return { getMyBlogs, isLoading, error}
}

export default useMyBlogs