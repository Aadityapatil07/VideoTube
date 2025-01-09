import { Compass, History, House, ListVideo, SquarePlay, ThumbsUp, UserRoundCheck } from "lucide-react"

export const sidebarContent = [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Explore",
      url: "/Explore",
      icon: Compass,
    },
    {
      name: "Subscriptions",
      url: "/feed/subscriptions",
      icon: UserRoundCheck,
    },
    {
      name: "History",
      url: "/feed/history",
      icon: History,
    },
    {
      name: "Playlists",
      url: "/feed/playlists",
      icon: ListVideo,
    },
    {
      name: "Your Videos",
      url: "/your-videos",
      icon: SquarePlay,
    },
    {
      name: "Liked Videos",
      url: "/feed/liked-videos",
      icon: ThumbsUp,
    },
]