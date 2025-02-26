import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { StoreType } from "../../redux/store";

export default function Blog() {
    const _id = useParams<{_id:string}>();
    const blogs = useSelector((state:StoreType) => state.blogs)
    console.log(_id)

    console.log(`Finding blog with ID: ${_id._id}`);
    const currentBlog = blogs.find((blog) => {
        console.log(`Checking blog ID: ${blog._id}`);
        return blog._id === _id._id;
    });
    console.log(blogs)
    console.log(`hi: ${currentBlog}`)

    return(
        <section>
            <div>
                <h2>{currentBlog?.title}</h2>
            </div>
        </section>
    )
}
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
