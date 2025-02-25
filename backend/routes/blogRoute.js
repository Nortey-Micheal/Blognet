import express from 'express';
import { loadBlog,createBlog,deleteBlog,editBlog, myBlogs } from '../controllers/blogController.js'

const blogRouter = express.Router();

blogRouter.get('/load', loadBlog)
blogRouter.get('/myBlogs/:email', myBlogs)
blogRouter.post('/create', createBlog)
blogRouter.put('/put/:email/:_id', editBlog)
blogRouter.delete('/delete/:email/:_id', deleteBlog)

export default blogRouter