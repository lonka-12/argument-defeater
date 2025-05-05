'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MainTitle: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  
  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (session) {
      router.push('/argue')
    } else {
      router.push('/login?warning=Please sign in before using the argument winner')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center leading-tight">
        <span className="block">AI-Powered Argument</span>
        <span className="block">Winner and Predictor</span>
      </h1>
      <p className="text-gray-400 text-xl font-medium mt-8 max-w-4xl text-center">
        Win all of your online arguments by simply showing your online argument and the point you want to prove
      </p>
      <button 
        onClick={handleStartClick}
        className="bg-purple-600 text-white text-2xl border-2 border-black font-bold px-12 py-4 rounded-xl mt-14 shadow-2xl hover:bg-purple-700 transition-colors"
      >
        Start for free
      </button>
      <p className="text-gray-400 text-sm font-medium mt-4 max-w-4xl text-center">
        No Paywall, No Credit Card Required
      </p>
    </div>
  )
}

export default MainTitle 