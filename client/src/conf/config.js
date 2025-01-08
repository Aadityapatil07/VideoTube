import { History, House, ListVideo, SquarePlay, ThumbsUp, UserRoundCheck } from "lucide-react"

export const sidebarContent = [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Subscriptions",
      url: "/subscriptions",
      icon: UserRoundCheck,
    },
    {
      name: "History",
      url: "/history",
      icon: History,
    },
    {
      name: "Playlist",
      url: "/playlist",
      icon: ListVideo,
    },
    {
      name: "Your Videos",
      url: "your-videos",
      icon: SquarePlay,
    },
    {
      name: "Liked Videos",
      url: "/liked-videos",
      icon: ThumbsUp,
    },
]