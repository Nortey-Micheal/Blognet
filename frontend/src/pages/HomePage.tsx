import { NavLink } from "react-router"
import Navbar from "../components/navbar"
import useAllBlogs from "../hooks/blogs/useAllBlogs"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { StoreType } from "../redux/store"
import { formatDistanceToNowStrict, parseISO } from "date-fns"

function HomePage() {

  const { getAllBlogs, error, isLoading } = useAllBlogs()
  const blogs = useSelector((state:StoreType) => state.blogs)

  useEffect(() => {
    const fetchBlog = async () => {
      await getAllBlogs()
    }
    fetchBlog()
  },[])

  return (
    <>
      <Navbar />
      <div className="max-w-[1300px] mx-auto flex pt-5 gap-7 w-[87vw]">
        <aside className="md:w-[25%] hidden md:flex border h-lvh"></aside>
        <div className="md:w-[70%] w-[90vw] flex flex-col">
          <div>
            <div className="flex gap-5 md:gap-10  md:text-xl text-slate-700">
              <NavLink to={''} className={({ isActive }) => isActive ? `font-bold` : 'font-normal'}>Relevant</NavLink>
              <NavLink to={'/latest'} className={({ isActive }) => isActive ? `font-bold` : 'font-normal'}>Latest</NavLink>
              <NavLink to={'/top'} className={({ isActive }) => isActive ? `font-bold` : 'font-normal'} >Top</NavLink>
            </div>
            <button></button>
          </div>
          <div>
            {
              blogs.map((blog) => (
                <div className="mb-5 w-full flex flex-col gap-5 p-4 rounded-2xl bg-slate-200 shadow-xl text-slate-800 max-h-[400px] md:text-[1.2rem]">
                  <h3 className="text-lg underline decoration-2 font-bold text-center">{blog.title}</h3>
                  <p className="max-h-[70%] overflow-hidden">{blog.content}</p>
                  <div className="flex gap justify-between">
                    <p className="" >By: <span className="hover:underline decoration-2">{blog.author}</span></p>
                    <p className="underline">{formatDistanceToNowStrict(parseISO(blog.createdAt))} ago</p>
                  </div>
                </div>
              ))
            }

            {
                isLoading && (
                    <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[100%] bg-cyan-400  top-[1/3] aspect-square "></div>
                )
            }

            {
                error && (
                    <div className="text-lg rounded-lg mt-14 px-6 py-2 bg-red-100 text-red-950">{error}</div>
                )
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage