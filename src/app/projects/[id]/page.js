'use client'
import React, { useEffect, useState } from 'react'
import ProjectHeader from '../_components/ProjectHeader'
import WebsiteDes from '../_components/WebsiteDes'
import Chats from '../_components/Chats'
import Element from '../_components/Element'
import { useParams } from 'next/navigation'

const Page = () => {

  const { id } = useParams()
  const [Loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [Chatmsgs, setChatsmsgs] = useState([])
  const [generatedCode, setGeneratedCode] = useState('')


  const handleClick = async () => {
    if (Loading) return;
    if (!prompt?.trim()) {
      return
    }

    const currentPrompt = prompt;

    setLoading(true)
    setChatsmsgs(prev => [...prev, { chat: prompt, id: 1 }])
    setPrompt('')

    try {

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      });
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      if (!response.body) {
        throw new Error('No response body');
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let aiResponse = ''
      let isCode = false
      setGeneratedCode('')
      while (true) {
        const { done, value } = await reader?.read()
        if (done) break


        const chunk = decoder.decode(value, { stream: true })
        aiResponse += chunk

        // chekc ai is sending

        if (!isCode && aiResponse.includes('```code')) {
          isCode = true

          const index = aiResponse.indexOf('```code') + '```code'.length

          const initialCodeChunk = aiResponse.slice(index)



          setGeneratedCode(prev => prev + initialCodeChunk)
        } else if (isCode) {
          setGeneratedCode(prev => prev + chunk)
        }
      }
      if (isCode) {
        setGeneratedCode(prev => prev.replace(/```$/, ''))
      }
      if (!isCode) {
        setChatsmsgs(prev => [
          ...prev,
          { id: 2, chat: aiResponse }
        ])
      }
      else {
        setChatsmsgs(prev => [
          ...prev,
          { id: 2, chat: 'your code is ready to roll' }
        ])
      }
      // check(currentPrompt)
      // setChatsmsgs(prev=>[...prev , {chat: response,id:2}])
    } catch (error) {
      console.error(error)
    }
    finally {
      //after streaming end

      setLoading(false)
    }
  }

  // console.log(id)
  // useEffect(() => {

  //   id && getCode()

  // }, [id])
  const getCode = async () => {
    const result = await fetch(`/api/projects/${id}`, {
      method: "GET",
    })
    console.log(result)

  }


  useEffect(() => {
    console.log(generatedCode)
  }, [generatedCode])


  return (
    <div className=''>
      <ProjectHeader />
      <div className='flex'>
        <Chats handleClick={handleClick}
          Loading={Loading}
          prompt={prompt}
          setPrompt={setPrompt}
          Chatmsgs={Chatmsgs} />

        <WebsiteDes />

        {/* <Element /> */}
      </div>
    </div>
  )
}
export default Page
