import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/blogs/allBlogSlice";

const useAllBlogs = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const getAllBlogs = async () => {
        setIsLoading(true)

        const response = await fetch("https://blognet-server.onrender.com/api/blogs/load", {
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
            dispatch(setBlogs(blogs))
        }
    }

    return { getAllBlogs, isLoading, error}
}

export default useAllBlogs