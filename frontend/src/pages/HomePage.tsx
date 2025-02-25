import { NavLink } from "react-router"
import Navbar from "../components/navbar"
import useAllBlogs from "../hooks/blogs/useAllBlogs"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { StoreType } from "../redux/store"

function HomePage() {

  const { getAllBlogs, error, isLoading } = useAllBlogs()
  const blogs = useSelector((state:StoreType) => state.blogs)

  useEffect(() => {
    const fetchBlog = async () => {
      await getAllBlogs()
    }
    fetchBlog()
  })

  return (
    <>
      <Navbar />
      <div className="max-w-[1300px] mx-auto flex pt-5 gap-7 w-[87vw]">
        <aside className="w-[25%] hidden md:flex border h-lvh"></aside>
        <div className="w-[70%] flex">
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
                <div>
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  <div>
                    <p>By: {blog.author}</p>
                    <p>{blog.createdAt}</p>
                  </div>
                </div>
              ))
            }

            {
                isLoading && (
                    <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="h-[400px] bg-cyan-400 absolute top-[1/3] aspect-square "></div>
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