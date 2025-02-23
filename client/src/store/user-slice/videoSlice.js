import weburl from "@/conf/conf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    videoLoading: true,
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
    async (videoId) => {
        const result = await axios.get(`${weburl}/api/v1/videos/${videoId}`)
        return result?.data.data[0]
    }

)

export const uploadVideo = createAsyncThunk(
    "videos/uploadVideo",
    async (formdata) => {
        const result = await axios.post(
            `${weburl}/api/v1/videos`,
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
        return result.data
    }

)

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideoDetails: (state, action) => {
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVideos.pending, (state, action) => {
                state.videoLoading = true;
            })
            .addCase(fetchAllVideos.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.videos = action.payload
                console.log(state.videos)
            })
            .addCase(fetchAllVideos.rejected, (state, action) => {
                state.videoLoading = false;
                state.videos = []
            })
            .addCase(getVideoById.pending, (state, action) => {
                state.videoLoading = true;
            })
            .addCase(getVideoById.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.videoDetails = action.payload
            })
            .addCase(getVideoById.rejected, (state, action) => {
                state.videoLoading = false;
                state.videoDetails = null
            })
            .addCase(uploadVideo.pending, (state, action) => {
                state.videoLoading = true;
            })
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.videoLoading = false;
                state.videoDetails = action.payload.data
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.videoLoading = false;
            })

    }
})

export const { setVideoDetails } = videoSlice.actions;
export default videoSlice.reducer;