import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "login",
    initialState : {
        loginValues : JSON.parse(localStorage.getItem("user")) || null
    },
    reducers:{
        loginUsers : (state, action) =>{
            state.loginValues = action.payload
        },
        logoutUsers : (state) =>{
            state.loginValues = null
        }
    }
})

export const {loginUsers, logoutUsers} = UserSlice.actions;

export default UserSlice.reducer;