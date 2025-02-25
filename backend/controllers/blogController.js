import Blog from "../models/blogModel.js"

const createBlog = async (req,res) => {
    const { title, content, author } = req.body

    try {
        await Blog.createBlog(title,content,author)
        res.status(201).json({message: "Blog has been created"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const loadBlog = async (req,res) => {
    const { title, content, author } = req.body

    try {
        const blogs = await Blog.loadBlog();
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const editBlog = async (req,res) => {
    const { _id,email } = req.params
    const { title, content } = req.body

    try {
        const update =  await Blog.editBlog(_id, title, content, email )
        res.status(201).json({message: "Blog has been successfully updated"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteBlog = async (req,res) => {
    const { _id,email } = req.params

    try {
        await Blog.deleteBlog( _id,email );
        res.status(204).json({message: "Blog has been deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const myBlogs = async (req,res) => {
    const { email } = req.params
    
    try {
        const blogs = await Blog.myBlogs(email);
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}

export { createBlog, loadBlog, editBlog, deleteBlog, myBlogs }