
import { createSlice } from "@reduxjs/toolkit";
import { create } from "axios";

const requestSlice = createSlice({
    name:"requests",
    initialState : null,
    reducers:{
         addRequest : (state,action)=>
        {
            return action.payload;
        },
        removeRequest : ()=>
        {
            return null;
        }
    }

});


export const {} = requestSlice.actions;

export default requestSlice.reducer;