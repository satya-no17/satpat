'use client'
import { createContext,useContext } from "react"

const DashContext = createContext(null)


export const useDashboard=()=>{
    return useContext(DashContext)
}

export default DashContext