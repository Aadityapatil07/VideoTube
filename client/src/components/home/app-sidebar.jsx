"use client"

import * as React from "react"
import {
  TvMinimalPlay,
} from "lucide-react"

import { ChevronsUpDown } from "lucide-react"

import { NavUser } from "@/components/home/nav-user"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { sidebarContent } from "@/conf/config.js"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}
 

export function AppSidebar({ ...props }) {
  const navigate = useNavigate()

const {userData, isAuthenticated }= useSelector((state)=> state.user)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <SidebarMenu>
        <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-7 items-center justify-center rounded-lg ">
              <TvMinimalPlay size={50}/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight mt-1 mb-1">
                <span className="truncate font-semibold">
                <h1 className="text-lg tracking-tighter font-bold">VideoTube</h1>
                </span>
              </div>
            </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-5">
          {sidebarContent.map((item)=>(
            <Link key={item.name} to={item.url}>
            <SidebarMenuButton 
            size="sm">
              <div className="ml-1" >
              <item.icon size={20}/>
              </div>
              <div className="grid flex-1 text-left text-base leading-tight mt-1 mb-1">
                <span className="truncate font-semibold">
                <h1 className="text-base tracking-tighter font-normal">{item.name}</h1>
                </span>
              </div>
              
            </SidebarMenuButton>
            </Link>
          )
              
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated?
        (<NavUser user={data.user} />):(
          <SidebarMenu>
            
          <SidebarMenuButton
          onClick={()=> navigate('/auth/login')}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/avatars/shadcn.jpg" alt="login"/>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">signin</span>
                <span className="truncate text-xs">sign in</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
            </SidebarMenu>
        )
      }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
