import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice.ts'
import allBlogReducer from './blogs/allBlogSlice.ts'
import myBlogReducer  from './blogs/myBlogSlice.ts'

const rootReducer = combineReducers({
    user: userReducer,
    blogs: allBlogReducer,
    myBlog: myBlogReducer,
})

export default rootReducer