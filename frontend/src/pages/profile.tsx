import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { StoreType } from "../redux/store";
import { Link } from "react-router";
import useMyBlogs from "../hooks/blogs/useMyBlogs";
import { useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Profile() {

    const user = useSelector((state:StoreType) => state.user)
    const blogs = useSelector((state:StoreType) => state.blogs)

    const { isLoading, getMyBlogs, error } = useMyBlogs()

    useEffect(() => {
        const fetchMyBlog = async () => {
            await getMyBlogs((user?.email)!)
        }
        fetchMyBlog()
    },[user])

    return (
        <>
            <Navbar />
            <section className="w-[90vw] mx-auto mt-5">
                <div>
                    <img
                    alt="Tailwind CSS Navbar component"
                    className="rounded-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    <div className="flex justify-between items-center mt-5">
                        <p>Email: {user?.email}</p>
                        <Link to={'/addblog'} className={`${blogs.length === 0 ? 'hidden' : ''} btn`}>Add Blog</Link>
                    </div>
                </div>

                {
                    blogs.map((blog) => (
                    <div className="mb-5 w-full flex flex-col gap-5 p-4 rounded-2xl bg-slate-200 shadow-xl text-slate-800 max-h-[400px] md:text-[1.2rem]">
                        <h3 className="text-lg underline decoration-2 font-bold text-center">{blog.title}</h3>
                        <p className="max-h-[70%] overflow-hidden">{blog.content}</p>
                        <div className="flex gap justify-between">
                        <p className="" >By: <span className="hover:underline decoration-2">{blog.author}</span></p>
                        <p className="underline">{formatDistanceToNow(parseISO(blog.createdAt))} ago</p>

                        </div>
                    </div>
                    ))
                }

                {
                    isLoading && (
                        <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[92%] bg-cyan-300 absolute rounded-2xl top-[1/3] aspect-square "></div>
                    )
                }

                
                {
                    blogs.length === 0 && (
                        <div className="flex flex-col mb-20">
                            <img src="/assets/add.gif" alt="" />
                            <Link to={'/addblog'} className="btn">Add Blog</Link>
                        </div>
                    )
                }

                {
                    error && (
                        <div className="text-lg rounded-lg mt-14 px-6 py-2 bg-red-100 text-red-950">{error}</div>
                    )
                }
            </section>
        </>
    )
}