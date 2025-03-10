import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BlogState {
    title: string,
    content: string,
    tags: string,
    createdAt: string,
    updatedAt: string,
    author: string,
    _id: string,
}

const initialState: BlogState[]  = [] 

const myBlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setMyBlogs: (state:BlogState[],action:PayloadAction<BlogState[]>) => {
            state
            return action.payload
        }
    }
})

export const { setMyBlogs } = myBlogSlice.actions

export default myBlogSlice.reducer