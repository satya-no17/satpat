'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./ui/button"
import { PlusCircleIcon } from "lucide-react"
import { useState } from "react"
import { Progress } from "./ui/progress"


export function AppSidebar() {
  const [projectList, setProjectList] = useState([])
  const [userDetails, setUserDetails] = useState([])
  return (
    <Sidebar>
      <SidebarHeader className={"p-5"}>
        <div className="flex items-center gap-2">
          <Image className='' src={'/logo.svg'} alt="logo" width={40} height={40} />
          <h2 className='pl-2 pr-2 text-xl'>SatPat Build</h2>
        </div>
        <Button> <PlusCircleIcon/>New Project</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroup>
          {projectList.length==0&&
          <div className='flex items-center w-full'>
          <h2 className="text-sm px-2 text-gray-500">No Projects</h2></div>}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={'p-3'}>
    <div className="p-3 border rounded-xl space-y-4 bg-secondary">
      <h2 className="flex justify-between p-5">Credits..  <span className="font-bold">2</span></h2>
      <Progress value={40}/>
      <Button className={"w-full"}>Upgrade to Elite</Button>
    </div>
      </SidebarFooter>
    </Sidebar>
  )
}