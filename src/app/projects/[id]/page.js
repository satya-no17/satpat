'use client'
import React, { useEffect } from 'react'
import ProjectHeader from '../_components/ProjectHeader'
import WebsiteDes from '../_components/WebsiteDes'
import Chats from '../_components/Chats'
import Element from '../_components/Element'
import { useParams } from 'next/navigation'

const Page = () => {
  const { id } = useParams()
  console.log(id)
  useEffect(() => {

    id && getCode()

  }, [id])

  const getCode = async () => {
    const result = await fetch(`/api/projects/${id}`, {
      method: "GET",
    })
    console.log(result)

  }

  return (
    <div>
      <ProjectHeader />
      <div className='flex'>
        <Chats />

        <WebsiteDes />

        <Element/>
      </div>
    </div>
  )
}
export default Page