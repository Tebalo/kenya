import { getUserProfile } from '@/app/login/session-actions'
import { NextRequest, NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const userProfile = await getUserProfile()
    
    if (!userProfile) {
      return NextResponse.json({ error: 'No user profile found' }, { status: 401 })
    }
    
    return NextResponse.json(userProfile)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 })
  }
}