import React from 'react'

const ArguePage = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold mb-6">Argument Analysis</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-600 mb-8">
          This is where you'll be able to analyze and counter arguments. More features coming soon!
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter your argument</li>
            <li>Specify the point you want to prove</li>
            <li>Get AI-powered analysis and counterarguments</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ArguePage 