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

    <div className='flex items-center gap-3 p-3 shadow border-b border-b-[#00ff88] justify-between'>
        <div>
       <Image className='' src={'/logo.svg'} alt="logo" width={40} height={40}/>
        </div>
        <div className='hidden sm:block'>
            <ul className='flex items-center gap-6 text-sm text-muted-foreground'>
                <li><a className='transition-colors hover:text-foreground' href='#about'>About</a></li>
                <li><a className='transition-colors hover:text-foreground' href='#pricing'>Pricing</a></li>
            </ul>
        </div>
        <div className='flex items-center gap-2'>
            <Button variant='ghost' onClick={goLogin}>Log in</Button>
            <Button onClick={goSignup}>Get started</Button>
        </div>
    </div></>
  )
}

export default Navbar
