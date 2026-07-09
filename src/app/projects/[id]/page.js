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
  const [code, setCode] = useState('')
  const [save, setSave] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    if (!id) { return }
    const getCode = async () => {
      try {
        const result = await fetch(`/api/projects/${id}`);

        if (!result.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await result.json();


        setGeneratedCode(data.project.code);
        setProjectName(data.project.name)

        const chats = data.project.chats
        setChatsmsgs(chats || []);

      } catch (error) {
        console.error(error);
      }
    };
    id && getCode()
  }, [id])




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



        if (!isCode && aiResponse.includes('```html')) {
          isCode = true

          const index = aiResponse.indexOf('```html') + 7

          const initialCodeChunk = aiResponse.slice(index)



          setGeneratedCode(prev => prev + initialCodeChunk)
        } else if (isCode) {
          setGeneratedCode(prev => prev + chunk)
        }
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

    } catch (error) {
      console.error(error)
    }
    finally {
      //after streaming end

      setLoading(false)
    }
  }



  useEffect(() => {
    if (!save) {
      return
    }

    const saveData = async () => {
      setDataLoading(true)
      try {
        const result = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: generatedCode,
            name: projectName,
            chats: Chatmsgs
          })
        })
        if (!result.ok) {
          throw new Error('Failed to put data')
        }
        const res = await result.json()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
      finally {
        setDataLoading(false)
        setSave(false)
      }
    }

    save && saveData()
  }, [save, id, generatedCode, projectName, Chatmsgs])


  return (
    <div className=''>
      <ProjectHeader setSave={setSave} dataLoading={dataLoading} />
      <div className='flex'>
        <Chats handleClick={handleClick}
          Loading={Loading}
          prompt={prompt}
          setPrompt={setPrompt}
          Chatmsgs={Chatmsgs} />

        <WebsiteDes generatedCode={generatedCode?.replace('```', '')}  setGeneratedCode={setGeneratedCode}/>
      </div>
    </div>
  )
}
export default Page
