import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";
import { StoreType } from "../../redux/store";
import Navbar from "../../components/navbar";
import { compareAsc, formatDistanceToNow, parseISO } from "date-fns";

export default function Blog() {
    const _id = useParams<{_id:string}>();
    const blogs = useSelector((state:StoreType) => state.blogs)
    const user = useSelector((state:StoreType) => state.user)

    const currentBlog = blogs.find((blog) =>  blog._id === _id._id);

    return(
        <>
            <Navbar />
           
            <section className="max-w-[1000px] w-[90vw] mx-auto mt-5 mb-10 ">
                 <div>
                    <NavLink className={'btn border-cyan-400 rounded-3xl mb-5'} to={'/'}>{'< Back'}</NavLink>
                </div>
                <div>
                    <div className="flex items-center gap-5 ">
                    <img
                    alt="Tailwind CSS Navbar component"
                    className="rounded-full max-w-[100px]  "
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        <div>
                            <p className="font-bold text-slate-900">{user?.email}</p>
                            <div className="flex">
                                <p className=""> Posted <span className="underline">
                                {formatDistanceToNow(parseISO((currentBlog?.createdAt)!))} ago
                                </span>
                                </p>
                                {
                                    compareAsc(parseISO((currentBlog?.createdAt)!),parseISO((currentBlog?.updatedAt)!)) !== 0 
                                    ? (<p>{currentBlog?.updatedAt}</p>) 
                                    : (<p className="hidden"></p>)
                                }
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-700 my-9 ">{currentBlog?.title}</h1>
                    {
                        <div className="mb-10">
                        <p>{currentBlog?.tags?.split(' ').map(tag => (
                          <span key={tag} className="hover:text-cyan-700 text-slate-700 mx-1 hover:underline font-semibold">{tag} </span>
                        ))}</p>
                      </div>
                    }
                    <p className="text-slate-800 text-lg/relaxed">{currentBlog?.content}</p>
                    <div>

                    </div>
                </div>
            </section>
        </>
    )
}
