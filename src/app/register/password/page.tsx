'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { register } from '../../actions/register'

export default function PasswordPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Retrieve user data from sessionStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const storedName = sessionStorage.getItem('registerName')
      const storedEmail = sessionStorage.getItem('registerEmail')
      
      if (!storedName || !storedEmail) {
        // Redirect back to register page if data is missing
        router.push('/register')
        return
      }
      
      setName(storedName)
      setEmail(storedEmail)
    }
  }, [router])

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    
    // Length check
    if (password.length >= 8) strength += 25
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25 // Uppercase
    if (/[0-9]/.test(password)) strength += 25 // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 25 // Special characters
    
    setPasswordStrength(strength)
  }, [password])

  // Get color based on password strength
  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500'
    if (passwordStrength <= 50) return 'bg-orange-500'
    if (passwordStrength <= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Get text description based on password strength
  const getStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak'
    if (passwordStrength <= 50) return 'Fair'
    if (passwordStrength <= 75) return 'Good'
    return 'Strong'
  }

  const handleGoBack = () => {
    router.push('/register')
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!name || !email) {
        setError('Missing user information. Please go back and try again.')
        setIsLoading(false)
        return
      }

      // Register the user
      const result = await register({ name, email, password })
      
      if (!result.success) {
        setError(result.error || 'Registration failed')
        setIsLoading(false)
        return
      }
      
      // If registration successful, show success message and redirect to login
      setSuccess(result.message || 'Registration successful. Please check your email to verify your account.')
      
      // Clear session storage
      sessionStorage.removeItem('registerName')
      sessionStorage.removeItem('registerEmail')
      
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error: any) {
      console.error('Registration error:', error)
      setError(error.message || 'An error occurred')
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
              Secure your account
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <form className="space-y-6" onSubmit={handleSignUp}>
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
              
              <div className="p-4 bg-gray-100 rounded-lg mb-6">
                <p className="text-gray-700 mb-1">Creating account for:</p>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-gray-700 text-base font-medium mb-2">
                    Create Password:
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                  {password && (
                    <>
                      <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500">
                          Password strength: <span className={`font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>{getStrengthText()}</span>
                        </span>
                        <span className="text-sm text-gray-500">{passwordStrength}%</span>
                      </div>
                    </>
                  )}
                  <div className="mt-3 text-sm text-gray-500 bg-gray-100 p-3 rounded">
                    <p className="font-medium mb-1">Strong passwords include:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li className={password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>Uppercase letters (A-Z)</li>
                      <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>Numbers (0-9)</li>
                      <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>Special characters (!@#$%^&*)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="w-1/3 bg-gray-200 text-gray-800 py-4 px-4 rounded-lg hover:bg-gray-300 transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-purple-600 text-white py-4 px-4 rounded-lg hover:bg-purple-700 transition-colors text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || passwordStrength < 50}
                >
                  {isLoading ? 'Signing up...' : 'Create Account'}
                </button>
              </div>
              
              <div className="text-center text-gray-600 mt-4">
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