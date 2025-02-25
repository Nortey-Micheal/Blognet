import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice.ts'
import blogReducer from './blogs/blogSlice.ts'

const rootReducer = combineReducers({
    user: userReducer,
    blogs: blogReducer
})

export default rootReducer