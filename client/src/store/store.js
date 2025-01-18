import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./user-slice/videoSlice"
import userSlice from "./auth-slice/userSlice"

const store = configureStore({
    reducer:{
        videos : videoSlice,
        user : userSlice

    }
})

export default store