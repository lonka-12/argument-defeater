import React from 'react'
import Link from 'next/link'

const MainTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-center leading-tight">
        <span className="block">AI-Powered Argument</span>
        <span className="block">Winner and Predictor</span>
      </h1>
      <p className="text-gray-600 text-xl font-medium mt-6 max-w-2xl text-center">
        Win all of your online arguments by simply showing your online argument and the point you want to prove
      </p>
      <Link 
        href="/argue"
        className="bg-purple-600 text-white text-2xl font-bold px-12 py-4 rounded-xl mt-8 hover:bg-purple-700 transition-colors"
      >
        Start for free
      </Link>
    </div>
  )
}

export default MainTitle 