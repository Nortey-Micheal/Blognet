import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import useLogin from "../../hooks/user/useLogin";

export default function Login() {
    
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')
    const { login, isLoading, error} = useLogin();
    const navigate = useNavigate()

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = await login(email,password)

        if (!user.email) return 

        if(user.email) {
            navigate('/')
        }
    }

    return (
        <div style={{backgroundImage: "url('/assets/login.jpg')"}} className=" min-h-[650px] h-dvh flex justify-center items-center">
            <form onSubmit={handleSubmit} className=" borde bg-cyan-100 max-w-[400px] h-[600px] p-3 rounded-4xl w-[90vw] mx-auto flex flex-col items-center justify-center" method="post">
                <legend className="text-5xl mb-20 underline-offset-8 underline font-extrabold text-slate-700">Log In</legend>
                <div className="w-[90%] md:text-2xl mx-aut text-lg flex justify-between">
                    <label className="font-bold text-slate-700" htmlFor="email">Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} className="rounded px-1 w-[70%]" id="email" type="email" />
                </div>
                <div className="w-[90%] text-lg md:text-2xl flex gap-2 justify-between mt-5">
                    <label className="font-bold text-slate-700" htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="rounded px-1 w-[70%]" id="password" type="password" />
                </div>
                <button className="w-[80%] bg-cyan-400 py-2 rounded-2xl mt-8 font-bold text-2xl text-slate-700 mb-5" type="submit">Log In</button>
                <p className="text-lg text-center md:text-2xl">Don't have an account? Then <Link className=" hover:underline decoration-2 text-cyan-600 font-bold decoration-red-400" to={'/signup'}>Sign Up</Link></p>
                {
                    error && (
                        <div className="text-lg rounded-lg mt-14 px-6 py-2 bg-red-100 text-red-950">{error}</div>
                    )
                }
            </form>
            {
                isLoading && (
                    <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[92%] bg-cyan-300 absolute top-[1/3] rounded-2xl aspect-square "></div>
                )
            }
           
        
        </div>
    )
}