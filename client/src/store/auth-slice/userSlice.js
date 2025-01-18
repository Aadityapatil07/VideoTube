import weburl from "@/conf/conf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading:false,
    isAuthenticated:false,
    channelDetails:null,
    user:null
}

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async(formdata)=>{
        const response = await axios.post(
            `${weburl}/api/v1/users/register`,
            formdata,
            {
                withCredentials:true
            }
        )
        return response.data
    }
)
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async(formdata)=>{
        const response = await axios.post(
            `${weburl}/api/v1/users/login`,
            formdata,
            {
                withCredentials:true
            }
        )
        return response.data
    }
)

export const getChannelDetails = createAsyncThunk(
    "user/getChannelDetails",
    async(channelId)=>{
        const result = await axios.get(`${weburl}/api/v1/users/c/${channelId}`)
        console.log("channel",result.data.data)
        return result.data.data
    }
)

const userSlice = createSlice({
name:"user",
initialState,
reducers:{
    setUserDetails:()=>{

    }
},
extraReducers:(builder)=>{
    builder
    .addCase(registerUser.pending, (state)=>{
        state.isLoading=true
    })
    .addCase(registerUser.fulfilled, (state,action)=>{
        state.isLoading = false
    })
    .addCase(registerUser.rejected, (state,action)=>{
        state.isLoading = false
    })
    .addCase(getChannelDetails.pending,(state)=>{
        state.isLoading = true;
    })
    .addCase(getChannelDetails.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.channelDetails= action.payload;
    })
    .addCase(getChannelDetails.rejected,(state)=>{
        state.isLoading = false;
        state.channelDetails= null;
    })
}
}
   
)

export const {setUserDetails} = userSlice.actions;
export default userSlice.reducer