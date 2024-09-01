import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";

const store = configureStore({
    reducer:{
        logIn : UserSlice
    }
})

export default store;