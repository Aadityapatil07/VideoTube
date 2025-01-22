import { getVideoById } from "@/store/user-slice/videoSlice";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {getChannelDetails} from "@/store/auth-slice/userSlice"
import { ArrowDownToLine, EllipsisVertical, Forward, ThumbsDown, ThumbsUp } from "lucide-react";
import { useMemo } from "react";

function WatchVideo() {
  const dispatch = useDispatch();
  const { videoId } = useParams();

  // Extract video details and loading state from Redux
  const { videoDetails, isLoading:videoLoading } = useSelector((state) => state.videos);
  const {channelDetails , isLoading:channelLoading } = useSelector((state) => state.user);

  // Fetch video details on mount and when `videoId` changes
  useEffect(() => {
    if (videoId || !videoDetails) {
      dispatch(getVideoById(videoId));
    }
  }, [dispatch,videoId, videoDetails]);

  useEffect(()=>{
      if(videoDetails?.owner){
        dispatch(getChannelDetails(videoDetails?.owner))
      }
  },[dispatch,videoDetails?.owner])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (diffInDays < 1) return "Today";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }
  const formatViews = (views) => {
    if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1) + "M views"; // Convert to M (Million)
    } else if (views >= 1_000) {
      return (views / 1_000).toFixed(1) + "K views"; // Convert to K (Thousand)
    } else {
      return views.toString(); // Less than 1000, return as is
    }
  }


const formattedViews = useMemo(() => formatViews(videoDetails?.views || 0), [videoDetails?.views]);
const formattedDate = useMemo(() => formatDate(videoDetails?.createdAt || ""), [videoDetails?.createdAt]);

  const recommendations = [
    {
      id: "1",
      title: "Exploring the Cosmos",
      thumbnail: "https://via.placeholder.com/150",
      views: "1M views",
      creator: "Space Channel",
    },
    {
      id: "2",
      title: "How to Cook Perfect Pasta",
      thumbnail: "https://via.placeholder.com/150",
      views: "500K views",
      creator: "Chef’s Delight",
    },
    {
      id: "3",
      title: "Top 10 Coding Tips",
      thumbnail: "https://via.placeholder.com/150",
      views: "200K views",
      creator: "CodePro",
    },
  ];

  // Loading state
  if (videoLoading || channelLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }
  

  // No video found
  if (!videoDetails) {
    return <div className="text-center mt-4">No video found.</div>;
  }
  if (!channelDetails) {
    return <div className="text-center mt-4">No channel found.</div>;
  }

  // Video URL and details
  const videoUrl = videoDetails.videoFile || "";


  return (
    <div className="flex flex-col md:flex-row bg-white text-black min-h-screen p-6">
  {/* Main Video Section */}
  <div className="flex-1">
    {/* Video Player */}
    <div
      className="video-player mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-300"
      style={{ borderRadius: "12px" }}
    >
      <ReactPlayer
        url={videoDetails.videoFile}
        controls
        playing
        width="100%"
        height="65vh"
        className="react-player"
      />
    </div>

    {/* Video Title */}
    <h1 className="text-3xl font-bold mb-2 text-gray-900">
      {videoDetails.title || "Untitled Video"}
    </h1>

    {/* Channel Info & Actions */}
    <div className="flex justify-between items-center pb-4">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar className="h-10 w-10 rounded-full shadow-md">
          <AvatarImage
            src={videoDetails.user[0].avatar}
            alt={videoDetails.user[0].username}
          />
        </Avatar>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">
            {videoDetails.user[0].fullName || "Unknown User"}
          </span>
          <span className="text-sm text-gray-500">
            {`${channelDetails.subscribersCount} Subscribers`}
          </span>
        </div>
      </div>

      {/* Video Action Buttons */}
      <div className="flex gap-4 text-gray-700">
        <button className="flex items-center gap-1 hover:text-blue-600 transition-all">
          <ThumbsUp /> <span>Like</span>
        </button>
        <button className="flex items-center gap-1 hover:text-red-500 transition-all">
          <ThumbsDown /> <span>Dislike</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-600 transition-all">
          <ArrowDownToLine /> <span>Save</span>
        </button>
        <button className="flex items-center gap-1 hover:text-purple-600 transition-all">
          <Forward /> <span>Share</span>
        </button>
        <button className="hover:text-gray-800">
          <EllipsisVertical />
        </button>
      </div>
    </div>

    {/* Video Details */}
    <div className="video-details p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between text-black text-base">
      <p>{formattedViews}</p>
<p>{formattedDate}</p>

      </div>
      <p className="mt-4 text-gray-600">{videoDetails.description || "No description available."}</p>
    </div>
  </div>

  {/* Recommendations Section */}
  <div className="recommendations md:w-1/3 ml-4 mt-6 md:mt-0">
    <h2 className="text-xl font-semibold mb-4 text-gray-900">Recommended Videos</h2>
    <div className="flex flex-col gap-4">
      {recommendations.map((video) => (
        <div
          key={video.id}
          className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-all shadow-md cursor-pointer"
        >
          {/* Thumbnail */}
          <img src={video.thumbnail} alt={video.title} className="w-24 h-14 rounded-lg object-cover" />

          {/* Video Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.views} views</p>
            <p className="text-xs text-gray-500">{video.creator}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default WatchVideo;
