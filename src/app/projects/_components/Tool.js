import { Code, Download, Laptop, Smartphone } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button';

const Tool = ({screenSize,setScreenSize}) => {
  return (
    <div className='flex justify-between items-center p-2.5 pb-0 w-full'>
        <div className='flex justify-between gap-2'>
           <Button variant='ghost' className={`${screenSize?'border-primary':''}`} onClick={()=>setScreenSize(true)}> <Smartphone/> </Button>
            <Button variant='ghost' className={`${screenSize==false?'border-primary':''}`} onClick={()=>setScreenSize(false)}><Laptop/></Button>
        </div>
        <div className="flex gap-2">
            <Button>View</Button>
            <Button>Download<Download/></Button>
            <Button>Code <Code/></Button>
            
        </div>
    </div>
  )
}

export default Tool