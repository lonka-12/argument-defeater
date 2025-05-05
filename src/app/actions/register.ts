'use server'

import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/email"

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
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    
    // Create new user
    const newUser = new User({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      verificationTokenExpires
    })
    
    // Save to database
    const savedUser = await newUser.save()
    
    // Send verification email
    console.log("sending email")
    const emailSent = await sendVerificationEmail(data.email, verificationToken)
    console.log("email sent", emailSent)
    
    if (!emailSent) {
      // If email fails to send, delete the user and return error
      await User.deleteOne({ _id: savedUser._id })
      return {
        success: false,
        error: 'Failed to send verification email'
      }
    }
    
    return {
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    return {
      success: false,
      error: error.message || 'Failed to register'
    }
  }
} 