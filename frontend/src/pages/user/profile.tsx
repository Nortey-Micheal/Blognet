import { useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import { StoreType } from "../../redux/store";
import { Link } from "react-router";
import useMyBlogs from "../../hooks/blogs/useMyBlogs";
import { useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import useDeleteBlog from "../../hooks/user/useDeleteBlog";
import { BlogState } from "../../redux/blogs/myBlogSlice";
import useAllBlogs from "../../hooks/blogs/useAllBlogs";

export default function Profile() {

    const user = useSelector((state:StoreType) => state.user)
    const myBlogs = useSelector((state:StoreType) => state.myBlog)

    const { isLoading, getMyBlogs, error } = useMyBlogs()
    const { deleteBlog,isDeleting,deleteError } = useDeleteBlog()
    const { getAllBlogs } = useAllBlogs()

    const handleClick = (blog:BlogState) => {
        localStorage.setItem('currentBlog',JSON.stringify(blog))
    }

    useEffect(() => {
        const fetchMyBlog = async () => {
            await getMyBlogs((user?.email)!)
            await getAllBlogs()
        }
        fetchMyBlog()
    },[user,myBlogs.length])

    return (
        <>
            <Navbar />
            <section className="w-[90vw] max-w-[700px] mx-auto mt-5">
                <div className="mb-10">
                    <img
                    alt="Tailwind CSS Navbar component"
                    className="rounded-full max-w-[200px] mx-auto "
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    <div className="flex justify-between items-center mt-5">
                        <p>Email: {user?.email}</p>
                        <Link to={'/addblog'} className={`${myBlogs.length === 0 ? 'hidden' : ''} btn border-cyan-600 rounded-2xl`}>Add Blog</Link>
                    </div>
                </div>

                {
                    myBlogs.map((blog) => (
                    <div key={blog._id} className="mb-5 w-full flex flex-col gap-5 p-4 rounded-2xl bg-slate-200 shadow-xl text-slate-800 max-h-[400px] md:text-[1.2rem] hover:text-cyan-900 hover:border-3 border-cyan-600 ">
                        <Link to={`/blog/${blog._id}`} className="text-lg underline decoration-2 font-bold text-center">{blog.title}</Link>
                        <p className="max-h-[70%] overflow-hidden">{blog.content}</p>
                        <div className="flex gap justify-between ">
                            <div className="flex gap-5">
                                <Link onClick={() => handleClick(blog)} to={`/editblog/${blog._id}`}  className={`${( isDeleting ) ? 'btn-disabled' : ''} btn btn-soft btn-success text-cyan-700 rounded-2xl`}>Edit</Link>
                                <button disabled={isDeleting} onClick={() => deleteBlog(blog._id,blog.author)} className="btn btn-soft btn-error text-red-600 rounded-2xl">Delete</button>
                            </div>
                            <p className="underline">{formatDistanceToNow(parseISO(blog.createdAt))} ago</p>

                        </div>
                    </div>
                    ))
                }

                {
                    isDeleting && (
                        <div style={{backgroundImage: "url('/assets/delete.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[92%] bg-cyan-300 absolute rounded-2xl top-[25vh] aspect-square "></div>
                    )
                }

                {
                    isLoading && (
                        <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[92%] max-w-[700px] bg-cyan-300 absolute rounded-2xl top-[1/3] md:top-10 aspect-square "></div>
                    )
                }

                
                {
                    myBlogs.length === 0 && (
                        <div className="flex flex-col mb-20">
                            <img src="/assets/add.gif" alt="" />
                            <Link to={'/addblog'} className="btn">Add Blog</Link>
                        </div>
                    )
                }

                {
                    (error || deleteError) && (
                        <div className="text-lg absolute top-10 rounded-lg mt-14 px-6 py-2 bg-red-100 text-red-950">{error}</div>
                    )
                }
            </section>
        </>
    )
}