import mongoose from 'mongoose';
import validator from 'validator'

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        tags: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

blogSchema.statics.createBlog = async function (title,content,author,tags) {

    if (!title || !content || !author || !tags ) {
        throw new Error("All fields must be filled");
    }

    const blog = await this.create({ title, content, author , tags})
    
    return blog
}

blogSchema.statics.editBlog = async function (_id,title,content,email) {
    
    if (!title || !content ) {
        throw new Error("All fields must be filled");
    }



    const blog = await this.findById(_id)

    if(!blog) {
        throw new Error("Blog does not exist");
    }

    const match = await blog.author === email;

    if (!match) {
        throw new Error("This blog is not yours");
    }

    const updatedBlog = await this.findByIdAndUpdate(_id, { title, content, email })

    if (!updatedBlog) {
        throw new Error("Blog doesn't exist");
    }

    return updatedBlog
}

blogSchema.statics.loadBlog = async function () {
    const blogs = await this.find({})
    return blogs
}

blogSchema.statics.myBlogs = async function (email) {
    if (!email || !validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
    }

    const blogs = await this.find({ author: email});

    if (!blogs) {
        throw new Error("You have no blogs yet");
    }

    return blogs

}

blogSchema.statics.deleteBlog = async function (_id,email) {
    if (!_id) {
        throw new Error("ID must be provided");
    }

    if (!email) {
        throw new Error("Email must be provided");
    }

    const blog = await this.findById(_id)

    if (!blog) {
        throw new Error("Blog doesn't exist");
    }

    const match = await blog.author === email;

    if (!match) {
        throw new Error("This bog does not belong to you");
    }

    const deletedBlog = await this.findByIdAndDelete(_id)


    return deletedBlog
}

const Blog = mongoose.model("Blog",blogSchema)

export default Blog