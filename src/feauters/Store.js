import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import ActiveSingleSlice from "./Slices/ActiveSingleSlice";

const store = configureStore({
    reducer:{
        logIn : UserSlice,
        active : ActiveSingleSlice
    }
})

export default store;