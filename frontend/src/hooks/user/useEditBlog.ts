import { useState } from "react"
import { useNavigate } from "react-router"

const useEditBlog = () => {
    const [error,setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [message,setMessage] = useState<string | null>(null)
    const navigate = useNavigate()

    const editBlog = async (_id:string,email:string,title:string,content:string) => {
        setIsLoading(true)

        const response = await fetch(`https://blognet-server.onrender.com/api/blogs/put/${email}/${_id}`,{
            method: 'PUT',
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({title,content})
        })

        const data = await response.json()

        console.log(data)
        
        if(response.status === 201) {
            setIsLoading(false)
            setError(null)
            setMessage(data)
            navigate('/profile')
            localStorage.removeItem('currentBlog')
        }

        if (response.status !== 201) {
            setIsLoading(false)
            setMessage(null)
            setError(data)
        }
    }

    return { editBlog, isLoading, error, message }
}

export default useEditBlog