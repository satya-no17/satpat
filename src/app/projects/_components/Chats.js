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
        <div className='flex h-[45vh] w-full flex-col border-b bg-background p-2 shadow-sm xl:h-[90vh] xl:w-96 xl:border-b-0 xl:border-r' >
            <div className='flex-1 overflow-auto'>
                {Chatmsgs.map((Chatmsg, i) => (
                    <div key={i} className={`flex ${Chatmsg.id === 1 ? 'justify-end' : 'justify-start '}`}>
                        <div className=' bg-border border border-[#00ff88] text-sm rounded-2xl p-4 flex max-w-[75%]'>{Chatmsg.chat}</div>
                    </div>
                ))}
                {Loading&&<div className='flex justify-center items-center p-4'>
                    <div className='flex justify-center items-center animate-spin rounded-full h-6 w-6  border-[#00ff88] border-t-2 border-b-2'><Image src={'/logo.svg'} alt='loading' width={35} height={35}/></div>
                    <span className='ml-2'>Working on it cutie.....</span>
                </div>}
            </div>
            <div className="flex gap-2 p-3 sm:p-5">
                <Input disabled={Loading} placeholder="Describe your design....." className='border border-[#00ff88]' value={prompt} onKeyDown={(e) => { if (e.key === 'Enter') { handleClick() } }} onChange={(e) => (setPrompt(e.target.value))} /><Button className='bg-gradient-to-br from-[#bebfbe] via-[#072616] to-[#113005]' onClick={handleClick} disabled={Loading}> {Loading ? <Spinner/> : <ArrowUp />}</Button>
            </div>
            <div className='flex text-center text-xs'>Ai can make mistakes for now it just takes a refresh to fix.🙂</div>
        </div>
    )
}

export default Chats
