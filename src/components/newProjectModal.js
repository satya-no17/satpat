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
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [pName, setPName] = useState('')
    const handleclick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/projects/create', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: pName
                })
            })
            const data = await res.json()
            if (res.ok) {
                setOpen(false);
                router.push(`/projects/${data.project.id}`)
                router.refresh()
            }

        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button> <PlusCircleIcon /> New Project</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input placeholder="Project Name" value={pName} onChange={(e) => setPName(e.target.value)} />

                    <Button disabled={loading} onClick={handleclick}>Create{loading && <Spinner />}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}