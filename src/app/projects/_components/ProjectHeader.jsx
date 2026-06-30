import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const ProjectHeader = () => {
  return (
    <div className='flex justify-between items-center p-4 border-b border-b-[#00ff88]'>
        <Image src={'/logo.svg'} alt='logo' height={40} width={40}/>
    <Button className='bg-gradient-to-br from-[#bebfbe] via-[#072616] to-[#113005] text-white'>Save</Button></div>
  )
}

export default ProjectHeader