import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import useSignup from "../../hooks/user/useSignup";

export default function Signup() {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')
    const { signup, isLoading, error} = useSignup();
    const navigate = useNavigate()

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = await signup(email,password);

        if(user === null) {
            return
        }

        if (user.email) {
            navigate('/')
        }
    }

    return (
        <div style={{backgroundImage: "url('/assets/signup.avif')",backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}} className="h-dvh min-h-[650px] flex justify-center items-center">
            <form onSubmit={(e) => handleSubmit(e)} className="h-[600px] p-2 rounded-4xl bg-cyan-100 borde max-w-[400px] w-[90vw] mx-auto flex flex-col items-center justify-center" method="post">
                <legend  className="text-5xl mb-20 underline-offset-8 underline font-extrabold text-slate-700">Sign Up</legend>
                <div className="w-[90%] md:text-2xl mx-aut text-lg flex justify-between">
                    <label className="font-bold text-slate-700" htmlFor="email">Email </label>
                    <input onChange={(e) => setEmail(e.target.value)} className="rounded px-1 w-[70%]" id="email" type="email" />
                </div>
                <div className="w-[90%] text-lg md:text-2xl flex gap-2 justify-between mt-5">
                    <label className="font-bold text-slate-700" htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="rounded px-1 w-[70%]" id="password" type="password" />
                </div>
                <button disabled={isLoading} className={`w-[80%] bg-cyan-400 py-2 rounded-2xl mt-8 font-bold text-2xl text-slate-700 mb-5 ${( isLoading )  ? 'bg-slate-500 text-slate-100' : ''}`} type="submit">Sign Up</button>
                <p className="text-lg text-center md:text-2xl">Already having an account? Then <Link className=" hover:underline decoration-2 text-cyan-600 font-bold decoration-red-400" to={'/login'}>Log In</Link></p>
                {
                    error && (
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )
                }
            </form>
            {
                isLoading && (
                    <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[92%] bg-cyan-300 absolute rounded-2xl top-[1/3] aspect-square "></div>
                )
            }
        </div>
    )
}