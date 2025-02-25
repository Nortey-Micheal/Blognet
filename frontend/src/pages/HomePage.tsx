import { NavLink } from "react-router"
import Navbar from "../components/navbar"

function HomePage() {
  

  return (
    <>
      <Navbar />
      <div className="max-w-[1300px] mx-auto flex pt-5 gap-7 w-[87vw]">
        <aside className="w-[25%] hidden md:flex border h-lvh"></aside>
        <div className="w-[70%] flex">
          <div className="flex gap-5 md:gap-10  md:text-xl text-slate-700">
            <NavLink to={''} className={({ isActive }) => isActive ? `font-bold` : 'font-normal'}>Relevant</NavLink>
            <NavLink to={'/latest'} className={({ isActive }) => isActive ? `font-bold` : 'font-normal'}>Latest</NavLink>
            <NavLink to={'/top'} className={({ isActive }) => isActive ? `font-bold` : 'font-normal'} >Top</NavLink>
          </div>
          <button></button>
        </div>
      </div>
    </>
  )
}

export default HomePage