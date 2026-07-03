'use client'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import Image from 'next/image'
import React, { useState } from 'react'

const ProjectHeader = ({setSave, dataLoading}) => {
  const handleClick = ()=>{
    setSave(true)
  }
  return (
    <div className='flex justify-between items-center p-4 border-b border-b-[#00ff88]'>
        <Image src={'/logo.svg'} alt='logo' height={40} width={40}/>
    <Button onClick={handleClick} disabled={dataLoading} className='bg-gradient-to-br from-[#bebfbe] via-[#072616] to-[#113005] text-white'>Save{dataLoading&&<Spinner/>}</Button></div>
  )
}

export default ProjectHeader