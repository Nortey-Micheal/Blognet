import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
    title: string,
    content: string,
    tags: string,
    createdAt: string,
    updatedAt: string,
    author: string,
    _id: string,
}

const initialState: BlogState[] = [] 

const AllBlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state:BlogState[],action:PayloadAction<BlogState[]>) => {
            return action.payload
        }
    }
})

export const { setBlogs } = AllBlogSlice.actions

export default AllBlogSlice.reducer