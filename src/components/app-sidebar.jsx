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
import NewProjectModal from "./newProjectModal"
import { useRouter } from "next/navigation"


export function AppSidebar({userData}) {
  const router = useRouter()

  return (
    <Sidebar>
      <SidebarHeader className={"p-5"}>
        <div className="flex items-center gap-2">
          <Image className='' src={'/logo.svg'} alt="logo" width={40} height={40} />
          <h2 className='pl-2 pr-2 text-xl'>SatPat Build</h2>
        </div>
        <NewProjectModal />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroup>
          {userData.projects.length===0?
         ( <div className='flex items-center w-full'>
          <h2 className="text-sm px-2 text-gray-500">No Projects</h2></div>):
          (userData.projects.map((project)=>(
            <div onClick={()=>{router.push(`/projects/${project.id}`)}} className="p-2 border rounded-sm m-2 "key={project.id}>{project.name} </div>
          )))}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={'p-3'}>
    <div className="p-3 border rounded-xl space-y-4 bg-secondary">
      <h2 className="flex justify-between p-5">Credits..  <span className="font-bold">{userData.credits}</span></h2>
      <Progress value={(userData.credits/10)*100}/>
      <Button className={"w-full"}>Upgrade to Elite</Button>
    </div>
      </SidebarFooter>
    </Sidebar>
  )
}