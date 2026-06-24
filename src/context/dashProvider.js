'use client'

import DashContext from "./dashContext"


export default function DashProvider({
    children,
    value
}){
    return (
         <DashContext.Provider value={value}>
      {children}
    </DashContext.Provider>
    )
}