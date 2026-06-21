import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

const AppHeader = () => {
    return (
        <div className='flex justify-between p-4 shadow'>
            <SidebarTrigger />
            <div>User</div>
        </div>
    )
}

export default AppHeader