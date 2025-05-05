'use server'

import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function checkEmailExists(email: string) {
  try {
    await connectDB()
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    
    return {
      success: true,
      exists: !!existingUser
    }
  } catch (error: any) {
    console.error('Email check error:', error)
    return {
      success: false,
      error: error.message || 'Failed to check email',
      exists: false
    }
  }
} 