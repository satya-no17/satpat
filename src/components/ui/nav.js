'use client'

import React from 'react'
import { Button } from './button'
import  Image  from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
const router = useRouter()
  const goSignup = ()=>{
    router.push('/signup')
  }
  const goLogin = ()=>{
    router.push('/login')
  }


  return (<>

    <div className='flex items-center p-3 shadow border-b border-b-[#00ff88] justify-between'>
        <div>
       <Image className='' src={'/logo.svg'} alt="logo" width={40} height={40}/>
        </div>
        <div>
            <ul className='flex justify-evenly'>
                <li>about</li>
                <li>pricing</li>
                <li></li>
            </ul>
        </div>
        <div>
            <Button onClick={goLogin}>Log in</Button>
            <Button onClick={goSignup}>Get started</Button>
        </div>
    </div></>
  )
}

export default Navbar
