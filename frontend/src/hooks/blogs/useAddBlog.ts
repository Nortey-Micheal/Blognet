import { useState } from "react";
import { useNavigate } from "react-router";

const useAddBlogs = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null);
    const [success,setSuccess] = useState<boolean>(false)
    const navigate = useNavigate()

    const AddBlogs = async (title:string,content:string,email:string,tags:string) => {
        setIsLoading(true)

        const response = await fetch("https://blognet-server.onrender.com/api/blogs/create", {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({title,content,tags,author:email})
        })

        const blogs = await response.json();

        if (!response.ok) {
            setSuccess(false)
            setIsLoading(false)
            setError(blogs.error)
        }

        if (response.ok) {
            setSuccess(true)
            setIsLoading(false)
            setError(null)
            navigate('/')
        }
    }

    return { AddBlogs, isLoading, error, success}
}

export default useAddBlogs