import React from 'react'
import { Button } from './button'

const Navbar = () => {
  return (
    <div className='flex justify-evenly'>
        <div>logo</div>
        <div>
            <ul className='flex justify-evenly'>
                <li>about</li>
                <li>pricing</li>
                <li></li>
            </ul>
        </div>
        <div>
            <Button>Log in</Button>
            <Button>Get started</Button>
        </div>
    </div>
  )
}

export default Navbar