import React from 'react'

const PromoBanner: React.FC = () => {
  return (
    <div className="flex justify-center py-3">
      <div className="bg-purple-600 rounded-2xl px-8 py-4 shadow-lg">
        <div className="flex space-x-6">
          <div className="bg-white px-6 py-2 rounded-xl">
            <span className="text-purple-600 font-medium">Limited time offer</span>
          </div>
          <div className="bg-white px-6 py-2 rounded-xl">
            <span className="text-purple-600 font-medium">Use for Completely free</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner 