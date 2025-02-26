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

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state:BlogState[],action:PayloadAction<BlogState[]>) => {
            return action.payload
        }
    }
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer