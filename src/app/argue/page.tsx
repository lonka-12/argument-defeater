'use client'

import React, { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import { IoSend } from 'react-icons/io5'
import { IoMenu, IoClose } from 'react-icons/io5'
import { useSession } from 'next-auth/react'

const ArguePage = () => {
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<{ isUser: boolean; text: string }[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isInitialState, setIsInitialState] = useState(true)
  const inputFormRef = useRef<HTMLFormElement>(null)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    // Store the current input value
    const currentInput = inputValue
    
    if (isInitialState) {
      // Immediately change state - no animation
      setIsInitialState(false)
      
      // Add user message immediately
      const newMessages = [...messages, { isUser: true, text: currentInput }]
      setMessages(newMessages)
      
      // Clear input
      setInputValue('')
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { isUser: false, text: `I've analyzed your argument: "${currentInput}"` }
        ])
      }, 800)
      
      return
    }
    
    // Regular message handling (not initial state)
    const newMessages = [...messages, { isUser: true, text: inputValue }]
    setMessages(newMessages)
    setInputValue('')

    // Simulate AI response
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { isUser: false, text: `I've analyzed your argument: "${currentInput}"` }
      ])
    }, 800)
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-gray-100 transition-all duration-300 overflow-hidden border-r border-gray-200`}
        >
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">History</h2>
            <div className="space-y-2">
              <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                Previous argument 1
              </div>
              <div className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                Previous argument 2
              </div>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col relative">
          {/* Chat header */}
          <div className="border-b border-gray-200 p-4 flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 mr-2"
            >
              {sidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
            </button>
            <h1 className="text-xl font-semibold">Argument Assistant</h1>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length > 0 && (
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-center`}
                >
                  {!message.isUser && (
                    <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                      AI
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser 
                        ? 'bg-purple-600 text-white rounded-br-none' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.isUser && (
                    <>
                      {session?.user?.image ? (
                        <img 
                          src={session.user.image} 
                          alt="User" 
                          className="h-8 w-8 rounded-full ml-2 flex-shrink-0 object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-2 flex-shrink-0">
                          {session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Question and centered input - only shown in initial state */}
          {isInitialState && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                What point would you like to prove?
              </h2>
              <form 
                ref={inputFormRef}
                onSubmit={handleSendMessage} 
                className="w-full max-w-lg"
              >
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter an argument point to prove or debate"
                      className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <IoSend size={20} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Bottom input - only shown after transition */}
          {!isInitialState && (
            <div className="p-4">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter an argument point to prove or debate"
                    className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoSend size={20} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArguePage 
