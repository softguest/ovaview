import Challenges from '@/components/challenges/Challenges'
import ChatForm from '@/components/chat-form/ChatForm'
import Projects from '@/components/projects/Projects'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <Challenges searchParams={{}} />
      <ChatForm />
      <Projects/>
    </div>
  )
}

export default Dashboard