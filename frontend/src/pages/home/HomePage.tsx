import { Link, NavLink } from "react-router"
import Navbar from "../../components/navbar"
import useAllBlogs from "../../hooks/blogs/useAllBlogs"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { StoreType } from "../../redux/store"
import { formatDate,  parseISO } from "date-fns"

type sideBarItemsType = {
  name: string,
  icon: string
}

function HomePage() {

  const { getAllBlogs, error, isLoading } = useAllBlogs()
  const blogs = useSelector((state:StoreType) => state.blogs)

  const sideBar:sideBarItemsType[] = [
    {
      name: "Home",
      icon: ""
    },

    {
      name: "BlogNet++",
      icon: ""
    },
    
    {
      name: "Reading List 2",
      icon: ""
    },

    {
      name: "Podcasts",
      icon: ""
    },

    {
      name: "Videos",
      icon: ""
    },

    {
      name: "Tags",
      icon: ""
    },

    {
      name: "BlogNet Help",
      icon: ""
    },

    {
      name: "Forem Shop",
      icon: ""
    },

    {
      name: "Advertise on BlogNet",
      icon: ""
    },

    {
      name: "BlogNet Challenges",
      icon: ""
    },

    {
      name: "BlogNet Showcase",
      icon: ""
    },
    
    {
      name: "About",
      icon: ""
    },

    {
      name: "Contact" ,
      icon: ""
    } 

    
    
    
  ]

  console.log(sideBar.length)

  useEffect(() => {
    const fetchBlog = async () => {
      await getAllBlogs()
    }
    fetchBlog()
  },[])

  return (
    <>
      <Navbar />
      <div className="max-w-[1300px] mx-auto flex pt-5 gap-7 w-[96vw]">
        <aside className="md:w-[25%] hidden md:flex flex-col h-full border-slate-200 rounded-xl shadow-lg lg:shadow-2xl ">
          {
            sideBar.map((content,index) => (
              <Link className={`${((index === 0 )) ? 'pt-5 rounded-lg' : (index === (sideBar.length - 1)) ? 'pb-5 rounded-lg ' : ''} hover:bg-cyan-200 hover:underline border-0 bg-slate-20 justify-start rounded-xl font-extrabold text-slate-800 px-4 py-3  `} to={'/'}>
                <p><span>{content.icon} </span> {content.name}</p>
              </Link>
            ))
          }
        </aside>
        <div className="md:w-[70%] w-[100vw] flex flex-col">
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
                <Link to={`/blog/${blog._id}`} key={blog._id} className="mb-5 w-full flex flex-col gap-5 p-4 rounded-2xl bg-slate-200 shadow-xl text-slate-800 max-h-[400px] md:text-[1.2rem] hover:border-2 hover:text-cyan-700 border-cyan-300">
                  <div className="flex gap-5 items-center ">
                    <img
                      alt="Tailwind CSS Navbar component"
                      className="w-15 aspect-square rounded-full"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    <div>
                      <p className="text-lg font-bold text-slate-900">{blog.author}</p>
                      <p className="text-sm font-medium text-slate-700">Posted on {formatDate(parseISO(blog.createdAt), 'do MMM')} </p>
                    </div>
                  </div>
                  <h3 className="text-lg underline decoration-2 font-bold text-cente">{blog.title}</h3>
                  <div className="flex gap justify-between">
                    <p>{blog.tags?.split(' ').map(tag => (
                      <span key={tag} className="hover:text-cyan-500">{tag} </span>
                    ))}</p>
                    
                  </div>
                </Link>
              ))
            }

            {
                isLoading && (
                    <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[100%] bg-cyan-300  top-[1/3] aspect-square rounded-2xl "></div>
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
