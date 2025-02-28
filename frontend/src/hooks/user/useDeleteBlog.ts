import { useState } from "react"
import useMyBlogs from "../blogs/useMyBlogs"

const useDeleteBlog = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [deleteError,setDeleteError] = useState<string | null>(null)
    const { getMyBlogs } = useMyBlogs()

    const deleteBlog = async (_id:string,email:string) => {
        setIsDeleting(true)
        const response = await fetch(`http://localhost:5050/api/blogs/delete/${email}/${_id}`, {
            method: 'DELETE',
            headers: {"Content-type" : "application/json"}
        })
        
        if (response.status === 204) {
            setDeleteError(null)
            setIsDeleting(false)
            getMyBlogs(email)
        }

        if (response.status !== 204) {
            setIsDeleting(false)
        }
    }
    return { deleteBlog,isDeleting,deleteError }
}

export default useDeleteBlog