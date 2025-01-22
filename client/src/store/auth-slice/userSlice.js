import weburl from "@/conf/conf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading: true,
    isAuthenticated: false,
    channelDetails: null,
    userData: null
}

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (formdata) => {
        const response = await axios.post(
            `${weburl}/api/v1/users/register`,
            formdata,
            {
                withCredentials: true,
                headers: {
                    "Authorization": "bearer",
                    "Content-Type": "multipart/form-data",
                    "Cache-Control":
                        "no-store, no-cache, must-revalidate, proxy-revalidate",
                }
            }
        )
        return response.data
    }
)
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (formdata) => {
        console.log(formdata)
        const response = await axios.post(
            `${weburl}/api/v1/users/login`,
            formdata,
            {
                withCredentials: true,
                headers: {
                    "Authorization": "bearer",
                    "Content-Type": 'application/json',
                    "Cache-Control":
                        "no-store, no-cache, must-revalidate, proxy-revalidate",
                }
            }
        )
        return response.data
    }
)

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async()=>{
        console.log("logout")
        const response = axios.post(`${weburl}/api/v1/users/logout`,
            {},
            {
                withCredentials: true,
            }
        )
        console.log("logout")
        return response.data
       
    }
)

export const getCurrentUser = createAsyncThunk(
    "user/getCurrentUser",
    async () => {
        const result = await axios.get(
            `${weburl}/api/v1/users/current-user`,
            {
                withCredentials: true,
                headers: {
                    "Cache-Control":
                        "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
            }
        )
        return result.data
    }
)

export const getChannelDetails = createAsyncThunk(
    "user/getChannelDetails",
    async (channelId) => {
        const result = await axios.get(`${weburl}/api/v1/users/c/${channelId}`)
        return result.data.data
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: () => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.userData = null
                state.isAuthenticated = false

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false
                state.userData = action.payload.data
                console.log(state.userData)
                state.isAuthenticated = action.payload.success

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.userData = action.payload.data
                state.isAuthenticated = action.payload.success
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.userData = null;
                state.isAuthenticated = false;
            })
            .addCase(getChannelDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChannelDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.channelDetails = action.payload;
            })
            .addCase(getChannelDetails.rejected, (state) => {
                state.isLoading = false;
                state.channelDetails = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = null;
                state.isAuthenticated = false;
              });
    }
}

)

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer