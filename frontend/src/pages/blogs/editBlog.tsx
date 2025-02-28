import { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import useEditBlog from "../../hooks/user/useEditBlog";

export default function EditBlog() {
    const [content,setContent] = useState<string>('')
    const [_id,set_id] = useState<string>('')
    const [title,setTitle] = useState<string>('')

    const { editBlog, isLoading, error } = useEditBlog()
    const user = useSelector((state:StoreType) => state.user)
    const email = user?.email;


    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(_id)
        await editBlog((_id)!,email!,title,content)


        setTitle('');
        setContent('');

        error && console.log(error)
        
    }

    useEffect(() => {
        const insertContents = async () => {
            const storedBlog = await localStorage.getItem('currentBlog')
            const currentBlog = JSON.parse(storedBlog!)
            set_id(currentBlog?._id)
            console.log(_id)
            
            const title = document.querySelector('#title') as HTMLInputElement
            title.value = (currentBlog?.title)!
            setTitle(currentBlog?.title)

            const content = document.querySelector('#content') as HTMLInputElement
            content.value = (currentBlog?.content)!
            setContent(currentBlog?.content)

        }
        insertContents()
    },[])

    
    return (
        <div>
            <Navbar />
            <div className="max-w-[90vw] w-[1000px] mx-auto ">
                <form onSubmit={ (e) => handleSubmit(e)} className="mt-10 flex flex-col" action="" method="post">
                    <legend className="text-3xl text-center underline font-bold text-slate-700">Edit Old Blog</legend>
                    {
                        error && (
                            <div role="alert" className="alert alert-error bg-red-400 font-bold rounded-2xl mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-red-50 " fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-50">{error}</span>
                            </div>
                        )
                    }
                    <div className="flex flex-col md:w-1/2 mx-auto mt-5 text-lg ">
                        <label htmlFor="title">Blog title </label>
                        <input onChange={(e) => setTitle(e.target.value)} className="border-slate-600 border-2 rounded-xl focus:border-cyan-400 p-2" id="title" name="title" type="text" />
                    </div>
                    <div className="flex flex-col mt-10 text-lg md:w-1/2 mx-auto ">
                        <label htmlFor="content">Blog Content </label>
                        <textarea onChange={(e) => setContent(e.target.value)} className="border-slate-600 border-2 rounded-xl focus:border-cyan-400 p-2" name="content" id="content"></textarea>
                    </div>
                    <button className="mt-10 hover:cursor-pointer bg-cyan-500 p-3 text-cyan-50 font-extrabold rounded-2xl text-2xl w-full md:w-1/2 self-center" type="submit">Post</button>
                </form>

                {
                    isLoading && (
                        <div style={{backgroundImage: "url('/assets/loading.gif')", backgroundRepeat: 'no-repeat', backgroundSize: "50% 50%", backgroundPosition: 'center'}} className="w-[92%] bg-cyan-300 absolute rounded-2xl top-[1/3] aspect-square "></div>
                    )
                }
            </div>
        </div>
    )
}
