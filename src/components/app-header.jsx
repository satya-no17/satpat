import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

const AppHeader = ({user}) => {
    return (
        <div className='flex justify-between p-4 shadow'>
            <SidebarTrigger />
            <div>Welcome Back... {user.name}</div>
        </div>
    )
}

export default AppHeader