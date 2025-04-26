'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  async function handleEmailSubmit(formData: FormData) {
    setIsLoading(true)
    setError('')
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    setError('')
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <Link href="/" className="text-4xl font-bold text-black hover:text-purple-600 transition-colors">
              Argwin
            </Link>
            <p className="text-xl font-medium text-gray-600 mt-2">
              Start to win all of your arguments
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <form action={handleEmailSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-gray-700 text-base font-medium mb-2">
                    Email:
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 text-base font-medium mb-2">
                    Password:
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 px-4 rounded-lg hover:bg-purple-700 transition-colors text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Log in'}
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isLoading ? 'Signing in...' : 'Log in with Google'}
              </button>
              <div className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-800">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 