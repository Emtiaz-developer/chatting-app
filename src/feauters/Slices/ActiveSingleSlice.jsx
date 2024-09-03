import { createSlice } from "@reduxjs/toolkit";

const ActiveSingleSlice = createSlice({
    name: "single",
    initialState : {
       active : JSON.parse(localStorage.getItem("active")) || null
    },
    reducers:{
      activeSingle : (state, action) =>{
        state.active = action.payload
      }
    }
})

export const {activeSingle} = ActiveSingleSlice.actions;

export default  ActiveSingleSlice.reducer;