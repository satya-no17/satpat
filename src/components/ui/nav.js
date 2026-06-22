'use client'

import React from 'react'
import { Button } from './button'
import  Image  from 'next/image';
import { useState } from 'react';

const Navbar = ({btn}) => {


  return (<>

    <div className='flex items-center p-3 shadow justify-between'>
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
            <Button onClick={btn}>Log in</Button>
            <Button onClick={btn}>Get started</Button>
        </div>
    </div></>
  )
}

export default Navbar
