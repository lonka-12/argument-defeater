import React from 'react'
import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-black font-bold text-xl">
            Argwin
          </Link>
          <div className="flex space-x-4">
            <button className="text-black hover:text-gray-600">
              Log in
            </button>
            <Link 
              href="/register" 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 