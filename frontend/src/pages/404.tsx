import { Link } from "react-router";

export default function NoPageFound() {
    return (
        <section className="bg-slate-200 w-[100vw] h-[100vh] flex justify-center items-center ">
            <div className="text-center">
                <p className="text-6xl font-extrabold text-slate-700">ERROR 404</p>
                <p className="text-3xl font-semibold text-slate-500">NO PAGE FOUND</p>
                <Link className="text-xl text-cyan-700 font-semibold hover:underline" to={'/'}>Return to home</Link>
            </div>
        </section>
    )
}