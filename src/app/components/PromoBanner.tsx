import React from 'react'

const PromoBanner: React.FC = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="bg-purple-100 rounded-4xl px-6 py-2 shadow-2xl">
        <div className="flex space-x-6">
          <div className="bg-white px-6 py-2 rounded-4xl">
            <span className="text-purple-600 font-medium">Limited time offer</span>
          </div>
          <div className="bg-white px-6 py-2 rounded-4xl">
            <span className="text-purple-600 font-medium">Use for Completely free</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner 