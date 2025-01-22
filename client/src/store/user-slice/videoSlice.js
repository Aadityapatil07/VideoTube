import weburl from "@/conf/conf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    videos: [],
    videoDetails: null
}

export const fetchAllVideos = createAsyncThunk(
    "videos/fetchAllVideos",
    async () => {
        const result = await axios.get(`${weburl}/api/v1/videos`)
        console.log(result.data.data.docs)
        return result?.data.data.docs;
    }
)

export const getVideoById = createAsyncThunk(
    "videos/getVideoById",
    async (videoId)=>{
        const result = await axios.get(`${weburl}/api/v1/videos/${videoId}`)
        return result?.data.data[0]
    }
    
)

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers:{
        setVideoDetails: (state, action) => {   
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVideos.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.videos = action.payload
                console.log(state.videos)
            })
            .addCase(fetchAllVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.videos = []
            })
            .addCase(getVideoById.pending, (state, action) => {
                state.isLoading = true;    
            })
            .addCase(getVideoById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.videoDetails = action.payload   
            })
            .addCase(getVideoById.rejected, (state, action) => {
                state.isLoading = false;
                state.videoDetails = null
            })

    }
})

export const {setVideoDetails} = videoSlice.actions;
export default videoSlice.reducer;