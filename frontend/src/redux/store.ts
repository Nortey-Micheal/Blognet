import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: rootReducer
})

export default store

export type StoreType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch