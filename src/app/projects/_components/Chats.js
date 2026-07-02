'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const Chats = ({
    handleClick,
    Loading,
    prompt,
    setPrompt,
    Chatmsgs }) => {


    return (
        <div className=' flex flex-col w-96 shadow h-[90vh] p-1 ' >
            <div className='flex-1  overflow-auto'>
                {Chatmsgs.map((Chatmsg, i) => (
                    <div key={i} className={`flex ${Chatmsg.id === 1 ? 'justify-end' : 'justify-start '}`}>
                        <div className=' bg-border border border-[#00ff88] text-sm rounded-2xl p-4 flex max-w-[75%]'>{Chatmsg.chat}</div>
                    </div>
                ))}
                {Loading&&<div className='flex justify-center items-center p-4'>
                    <div className='flex justify-center items-center animate-spin rounded-full h-6 w-6  border-[#00ff88] border-t-2 border-b-2'><Image src={'/logo.svg'} alt='loading' width={35} height={35}/></div>
                    <span className='ml-2'>Wait a sec cutie.....</span>
                </div>}
            </div>
            <div className="flex p-5 sticky bottom-0">
                <Input disabled={Loading} placeholder="Describe your design....." className='border border-[#00ff88]' value={prompt} onKeyDown={(e) => { if (e.key === 'Enter') { handleClick() } }} onChange={(e) => (setPrompt(e.target.value))} /><Button className='bg-gradient-to-br from-[#bebfbe] via-[#072616] to-[#113005]' onClick={handleClick} disabled={Loading}> {Loading ? <Spinner/> : <ArrowUp />}</Button>
            </div>
        </div>
    )
}

export default Chats