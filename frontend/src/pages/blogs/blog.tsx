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
           
            <section className="max-w-[1000px] w-[90vw] mx-auto mt-5 ">
                 <div>
                    <NavLink className={'btn border-cyan-400 rounded-3xl mb-5'} to={'/'}>{'< Back'}</NavLink>
                </div>
                <div>
                    <div className="flex">
                        <img src="" alt="" />
                        <div>
                            <p>{user?.email}</p>
                            <div className="flex border">
                                <p className="underline">{formatDistanceToNow(parseISO((currentBlog?.createdAt)!))} ago</p>
                                {
                                    compareAsc(parseISO((currentBlog?.createdAt)!),parseISO((currentBlog?.updatedAt)!)) !== 0 
                                    ? (<p>{currentBlog?.updatedAt}</p>) 
                                    : (<p className="hidden"></p>)
                                }
                            </div>
                        </div>
                    </div>
                    <h1>{currentBlog?.title}</h1>
                    {
                        <div className="flex gap justify-between">
                        <p>{currentBlog?.tags?.split(' ').map(tag => (
                          <span className="hover:text-cyan-500">{tag} </span>
                        ))}</p>
                      </div>
                    }
                    <p>{currentBlog?.content}</p>
                </div>
            </section>
        </>
    )
}
