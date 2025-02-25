import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBlogs } from "../../redux/blogs/blogSlice";

const useAddBlogs = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const AddBlogs = async (title:string,content:string,email:string,tags:string) => {
        setIsLoading(true)

        const response = await fetch("http://localhost:5050/api/blogs/create", {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({title,content,tags,author:email})
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

    return { AddBlogs, isLoading, error}
}

export default useAddBlogs