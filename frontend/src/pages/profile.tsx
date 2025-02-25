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
    })

    function formatDistanceToNowStrict(arg0: any): import("react").ReactNode {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <Navbar />
            <section>
                <div>
                    <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    <div>
                        <p>Email: {user?.email}</p>
                        <Link to={'/addblog'} className="btn">Add Blog</Link>
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
            </section>
        </>
    )
}