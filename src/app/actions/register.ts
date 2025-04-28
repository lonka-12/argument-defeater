'use server'

import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function register(data: { name: string; email: string; password: string }) {
  try {
    await connectDB()
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email.toLowerCase().trim() })
    if (existingUser) {
      return {
        success: false,
        error: 'Email already exists'
      }
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    // Create new user with explicit emailVerified field
    const newUser = new User({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      emailVerified: true // Explicitly set to true
    })
    
    // Save to database
    const savedUser = await newUser.save()
    
    console.log('User registered successfully:', {
      id: savedUser._id,
      email: savedUser.email,
      emailVerified: savedUser.emailVerified
    })
    
    return {
      success: true
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    return {
      success: false,
      error: error.message || 'Failed to register'
    }
  }
} 