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
export const uploadVideoControls = [
    {
      name: "title",
      label: "Title",
      placeholder: "Enter video Title",
      componentType: "input",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Enter video description",
      componentType: "input",
      type: "text",
    },
    {
      name: "category",
      label: "Category",
      placeholder: "Gaming, song, vlog etc.",
      componentType: "input",
      type: "text",
    },
    {
      name: "videoFile",
      label: "Upload Video",
      componentType: "file",
    },
    {
      name: "thumbnail",
      label: "Upload Thumbnail",
      componentType: "file",
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


export const formatViews = (views) => {
  if (views >= 1_000_000) {
    return (views / 1_000_000).toFixed(1) + "M views"; // Convert to M (Million)
  } else if (views >= 1_000) {
    return (views / 1_000).toFixed(1) + "K views"; // Convert to K (Thousand)
  } else {
    return views.toString() + " views"; // Less than 1000, return as is
  }
}

export const calculateAge = (createdAt) => {
  const createdDate = new Date(createdAt); // Convert `createdAt` to Date
  const now = new Date();
  const differenceInMs = now - createdDate;

  const seconds = Math.floor(differenceInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}