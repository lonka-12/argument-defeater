'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { signIn, useSession } from 'next-auth/react'
import { checkEmailExists } from '../actions/checkEmail'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  
  // Get error from URL if present
  useEffect(() => {
    const errorParam = searchParams?.get('error')
    if (errorParam === 'EmailAlreadyRegistered') {
      setError('This email is already registered with a password. Please use password login instead.')
    } else if (errorParam) {
      setError(errorParam)
    }
  }, [searchParams])

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(email)
    
    if (!isValid) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
    
    return isValid
  }

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    
    // Validate email on change, but only if there was already an error
    if (emailError) {
      validateEmail(newEmail)
    }
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    setEmailError('')

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    if (!name || !email) {
      setError('Please provide both name and email')
      setIsLoading(false)
      return
    }

    // Validate email format
    if (!validateEmail(email)) {
      setIsLoading(false)
      return
    }

    try {
      // Check if email already exists
      const result = await checkEmailExists(email)
      
      if (!result.success) {
        setError('Failed to validate email. Please try again.')
        setIsLoading(false)
        return
      }
      
      if (result.exists) {
        setError('This email is already registered. Please use a different email or log in instead.')
        setIsLoading(false)
        return
      }
      
      // Store form data in sessionStorage temporarily
      sessionStorage.setItem('registerName', name)
      sessionStorage.setItem('registerEmail', email)
      
      // Redirect to password page
      router.push('/register/password')
    } catch (error: any) {
      console.error('Email validation error:', error)
      setError('An error occurred during validation. Please try again.')
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      await signIn('google', { callbackUrl: '/argue' })
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google')
      setIsLoading(false)
    }
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
          <form className="space-y-6" onSubmit={handleContinue}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Name:
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 text-base font-medium mb-2">
                  Email:
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={(e) => validateEmail(e.target.value)}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 px-4 rounded-lg hover:bg-purple-700 transition-colors text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !!emailError}
            >
              {isLoading ? 'Processing...' : 'Continue'}
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
              onClick={handleGoogleSignUp}
              className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-lg font-medium flex items-center justify-center"
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
              {isLoading ? 'Continuing...' : 'Continue with Google'}
            </button>
            <div className="text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-800">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
