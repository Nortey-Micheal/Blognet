import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMyBlogs } from "../../redux/blogs/myBlogSlice";

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
            const response = await fetch(`https://blognet-server.onrender.com/api/blogs/myBlogs/${encodeURIComponent(email)}`, {
                method: "GET",
                headers: { "Content-type": "application/json"},
    
            })
    
            const blogs = await response.json();
    
            if (!response.ok) {
                setIsLoading(false)
                setError(blogs.error)
            }
    
            if (response.ok) {
                setIsLoading(false)
                setError(null)
                dispatch(setMyBlogs(blogs))
            }
        } catch (error) {
            setIsLoading(false)
            setError("Failed to fetch blogs")
        }
    }

    return { getMyBlogs, isLoading, error}
}

export default useMyBlogs