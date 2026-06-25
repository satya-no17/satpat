'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowRightFromLine, ArrowUp, ArrowUp01, ArrowUpAzIcon, ArrowUpFromDotIcon, ArrowUpSquare, Ghost, ImagePlus, LucideSendHorizonal, Send, SendIcon, SendToBack } from 'lucide-react'
import React, { useState } from 'react'

const Hero = () => {
    const [prompt, setPrompt] = useState("")
    
    return (
        <div>
            <div className='min-h-[90vh] justify-center items-center flex flex-col text-center '>
                <h2 className='p-2 font-bold text-5xl lg:text-6xl justify-center items-center flex bg-gradient-to-br from-[#bebfbe] via-[#072616] to-[#113005]
bg-clip-text text-transparent'>What U want to Design?</h2>
                <p className='mt-2 text-2xl'>generate the coolest landingPage</p>
                <div className='pt-5 w-[80%]  p-5 m-5 sm:w-full max-w-xl border rounded-2xl  bg-gradient-to-br from-[#070b08] via-[#072616] to-black'>
                    <textarea className='pt-5 h-40  w-full focus:outline-0 resize-none' placeholder='Describe your design' value={prompt} onChange={(e)=>{setPrompt(e.target.value);console.log(prompt)}}/>
                    <div className='flex justify-between'>
                        <Button variant={'ghost'}> <ImagePlus /></Button>
                        <Button ><ArrowUp size='lg' /></Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Hero