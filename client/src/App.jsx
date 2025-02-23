import { AppSidebar } from "@/components/home/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {Search} from "lucide-react"
import { Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, getCurrentUser } from "./store/auth-slice/userSlice"
import { useState } from "react"
import AddVideoDialog from "./components/home/addVideoDialog"

export default function Page() {
  const dispatch = useDispatch()

  const {isAuthenticated, userData, isLoading} = useSelector((state)=>state.user)

  useEffect(() => {
    dispatch(getCurrentUser())  
  }, [dispatch])

if(isLoading)return <div>Loading.....</div>
  return (
    <SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-4 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-8 w-[1.5px] bg-gray-300" />

      {/* Search Bar */}
      <div className="relative w-[450px] mx-auto">
        <input
          type="text"
          className="w-full p-1 pl-5 pr-12 text-lg border-2 border-gray-300 rounded-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          placeholder="Search..."
        />
        <Separator orientation="vertical" className="h-9 w-[1px] bg-gray-300 absolute right-12 top-1/2 transform -translate-y-1/2" />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer">
        <Search size={23} strokeWidth={1.5} />
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {isAuthenticated && <AddVideoDialog/>}
{isAuthenticated?
(<Avatar className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
          <AvatarImage
          src={userData.avatar}
          alt={userData.username}
          className="h-full w-full object-cover" />
        </Avatar>):(<Avatar className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
          <AvatarImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
          className="h-full w-full object-cover" />
        </Avatar>)}
      </div>
    </header>

    <Outlet />
  </SidebarInset>
</SidebarProvider>

  )
}

