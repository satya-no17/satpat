'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUp } from 'lucide-react'
import React, { useState } from 'react'

const Chats = () => {
    const [prompt, setPrompt] = useState('')
    const [Chatmsgs, setChatsmsgs] = useState([])
    const handleClick = async()=>{
        if (!prompt.trim()) return;
        setChatsmsgs(prev=>[ ...prev,{chat:prompt,id:1}])
        setPrompt('')
    }

    return (
        <div className=' flex flex-col w-96 shadow h-[90vh] p-1 ' >
            <div className='flex-1'>
            {Chatmsgs.map((Chatmsg,i)=>(
                <div key={i} className={`flex ${Chatmsg.id===1 ?'justify-end':'justify-start'}`}>
                    <div className=' bg-border border border-[#00ff88] text-sm rounded-2xl p-4 flex max-w-44'>{Chatmsg.chat}</div>
                </div>
            ))}
            </div>
            <div className="flex p-5 sticky bottom-0">
                <Input placeholder="Describe your design....." className='border border-[#00ff88]' value={prompt}onKeyDown={(e)=>{if (e.key=== 'Enter'){handleClick()}}} onChange={(e)=>(setPrompt(e.target.value))}/><Button className='bg-gradient-to-br from-[#bebfbe] via-[#072616] to-[#113005]'onClick={handleClick}><ArrowUp/></Button>
            </div>
        </div>
    )
}

export default Chats