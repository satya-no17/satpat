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
import { LogOut } from "lucide-react"
import { useState } from "react"
import { Progress } from "./ui/progress"
import NewProjectModal from "./newProjectModal"
import { useRouter } from "next/navigation"


export function AppSidebar({userData}) {
  const router = useRouter()
  const [showUpgradeWarning, setShowUpgradeWarning] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.replace('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

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
      <SidebarFooter className={'space-y-3 p-3'}>
        <div className="space-y-4 rounded-xl border bg-secondary p-3">
          <h2 className="flex justify-between p-5">Credits..  <span className="font-bold">{userData.credits}</span></h2>
          <Progress value={(userData.credits/10)*100}/>
          <Button className="w-full" onClick={() => setShowUpgradeWarning(true)}>Upgrade to Elite</Button>
          {showUpgradeWarning && (
            <p role="alert" className="rounded-lg border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900">
              Elite upgrades are not available during the testing period yet.
            </p>
          )}
        </div>
        <Button variant="outline" className="w-full" onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut /> {isLoggingOut ? 'Logging out…' : 'Log out'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
