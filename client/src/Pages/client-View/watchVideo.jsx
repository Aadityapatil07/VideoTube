import { getVideoById } from "@/store/user-slice/videoSlice";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {getChannelDetails} from "@/store/auth-slice/userSlice"
import { ArrowDownToLine, EllipsisVertical, Forward, ThumbsDown, ThumbsUp } from "lucide-react";
import { calculateAge, formatViews } from "@/conf/config";


function WatchVideo() {
  const dispatch = useDispatch();
  const { videoId } = useParams();

  // Extract video details and loading state from Redux
  const { videoDetails, videoLoading } = useSelector((state) => state.videos);
  const {channelDetails ,channelLoading } = useSelector((state) => state.user);

  // Fetch video details on mount and when `videoId` changes
  useEffect(() => {
    if (videoId && !videoDetails) {
      dispatch(getVideoById(videoId));
    }
  }, [dispatch,videoId, videoDetails]);

  useEffect(()=>{
      if(videoDetails?.owner){
        dispatch(getChannelDetails(videoDetails?.owner))
      }
  },[dispatch,videoDetails?.owner])

  const handleDownload = () => {
    fetch(videoDetails.videoFile)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'CustomFileName.pdf'; // Specify your filename here
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Download failed:', error));
}


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
      className="video-player mb-3 rounded-xl overflow-hidden shadow-lg border border-gray-300"
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
    <h1 className="text-xl font-bold mb-2 text-gray-900">
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
            className="h-full w rounded-full object-cover"
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
        <button onClick={handleDownload} className="flex items-center gap-1 hover:text-green-600 transition-all">
          <ArrowDownToLine/> <span>Save</span>
        </button>
        <button className="flex items-center gap-1 hover:text-purple-600 transition-all">
          <Forward/><span>Share</span>
        </button>
        <button className="hover:text-gray-800">
          <EllipsisVertical />
        </button>
      </div>
    </div>

    {/* Video Details */}
    <div className="video-details p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between text-black text-base">
      <p>{formatViews(videoDetails.views)}</p>
<p>{calculateAge(videoDetails.createdAt)}</p>

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
