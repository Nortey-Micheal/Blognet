import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../redux/store"
import { Link } from "react-router"
import { useEffect } from "react"
import { setUser } from "../redux/user/userSlice"
import useLogout from "../hooks/useLogout"

export default function Navbar () {

    const dispatch = useDispatch()
    const user = useSelector((state:StoreType) => state.user)

    useEffect(() => {
        const initiateUser = async () => {
            const userString = localStorage.getItem("user");
            if (userString !== null) {
                const user = JSON.parse(userString);
                dispatch(setUser(user));
            }
        };
        initiateUser();
    }, []);

    const { logout } = useLogout()

    return (
        <nav className=" shadow-sm sticky top-0 bg-slate-100">
            <div className="navbar w-[96vw] justify-between max-w-[1300px] mx-auto ">
                {
                    !user?.email && (
                        <div className="navbar-start md:w-[30%]">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-cyan-300 rounded-lg z-1 mt-3 w-52 p-2 shadow">
                                    <li className="hover:bg-cyan-950  rounded-lg ">
                                        <Link className="font-semibold text-[1.0rem] text-slate-800 hover:text-cyan-100" to={'/'}>Home</Link>
                                    </li>

                                    <li className="hover:bg-cyan-950  rounded-lg ">
                                        <Link className="font-semibold text-[1.0rem] text-slate-800 hover:text-cyan-100" to={'/login'}>Log In</Link>
                                    </li>

                                    <li className="hover:bg-cyan-950  rounded-lg hover:text-cyan-100">
                                        <Link className="font-semibold text-[1.0rem] text-slate-800 hover:text-cyan-100" to={'/blogs'}>Blogs</Link>
                                    </li>
                                </ul>
                            </div>
                            <Link to={'/'} className="btn btn-ghost text-lg px-2 md:text-3xl">blog NET</Link>
                        </div>
                    )
                }

                {
                    user?.email && (
                        <div className="navbar-start md:w-[30%]">
                            <Link to={'/'} className="btn btn-ghost text-lg px-2 md:text-3xl">blog NET</Link>
                        </div>
                    )
                }

                {
                    user?.email && (
                        <div className="navbar-center w-[60%] ml-0 hidden lg:flex">
                            <ul className="menu w-full menu-horizontal px-1">
                            <input type="text" placeholder={`\u{1F50D}  Search`} className="border-slate-400 border rounded-lg input w-full" />
                            </ul>
                        </div>
                    )
                }
                {
                    user?.email && (
                        <div className="navbar-end bordr ml-auto self-end">
                            <button className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                            </button>
                            <button className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                                    <span className="badge badge-xs badge-primary indicator-item"></span>
                                </div>
                            </button>
                            <div className="flex gap-2">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content rounded-2xl bg-cyan-300 z-1 mt-3 w-52 p-2 shadow">
                                        <li className="hover:bg-cyan-950  rounded-lg">
                                            <Link to={'/profile'} className="font-semibold text-[1.0rem] text-slate-800 hover:text-cyan-100 justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </Link>
                                        </li>
                                        <li className="hover:bg-cyan-950  rounded-lg">
                                            <Link className="font-semibold text-[1.0rem] text-slate-800 hover:text-cyan-100" to={'/'}>Settings</Link>
                                        </li>
                                        <li className="hover:bg-cyan-950  rounded-lg">
                                            <Link className="font-semibold text-[1.0rem] text-slate-800 hover:text-cyan-100" onClick={logout} to={'/'}>Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )    
                }

                {
                    !user?.email && (
                        <div className="navbar-end ">
                            <Link to={'/login'} className="btn border-0 mr-5 md:text-lg hidden md:inline-flex">Log In</Link>
                            <Link to={'/signup'} className="btn sm:px-2 md:text-lg rounded-lg hover:bg-slate-300 border">Create account</Link>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}