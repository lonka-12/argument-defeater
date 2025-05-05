import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    await connectDB()

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Update user verification status
    user.emailVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined
    await user.save()

    // Redirect to login page with success message
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    return NextResponse.redirect(`${baseUrl}/login?verified=true`)
  } catch (error: any) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
} 