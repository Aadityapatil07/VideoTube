import { fetchAllVideos } from '@/store/user-slice/videoSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoCard from "@/components/home/videoCard"

function Home() {

  const dispatch = useDispatch()
  const { videos, isloading } = useSelector((state) => state.videos)

  useEffect(() => {
    dispatch(fetchAllVideos())
  }, [])
  

  console.log(videos)

  return !isloading ? (

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4 lg">
          {videos && videos.length > 0
            ? (videos.map((item) =>
              // <div key={item._id} className="aspect-video rounded-xl">
              //   <img src={item.thumbnail} alt="" />
              //   <h1>{item.title}</h1>
              //   <h1>{item.user[0].fullName}</h1>
              //   <h1>{`${item.views} views | one mont ago`}</h1>
                
              // </div>
              <VideoCard
              video={item}/>
            )) : (null)
          }
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  ) : (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 lg">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>)


}

export default Home
