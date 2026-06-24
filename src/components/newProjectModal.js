'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircleIcon } from "lucide-react"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"

export default function NewProjectModal() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [pName, setPName] = useState('')
    const handleclick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            
        } catch (error) {
            
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> <PlusCircleIcon /> New Project</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input placeholder="Project Name" value={pName} onChange={(e) => setPName(e.target.value)} />

                    <Button>Create{loading&&<Spinner/>}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}