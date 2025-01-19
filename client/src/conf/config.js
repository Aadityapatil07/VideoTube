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

export const registerFormControls = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      componentType: "input",
      type: "text",
    },
    {
      name: "username",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "avatar",
      label: "Avatar",
      componentType: "file",
    },
    {
      name: "coverImage",
      label: "coverImage",
      componentType: "file",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    }
  
]

export const loginFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  }
]