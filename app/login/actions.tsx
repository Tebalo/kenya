'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { storeUserProfile } from './session-actions'

interface AuthResponse {
  refresh: string
  access: string
  roles: string[]
  profile: {
    username: string
    first_name: string
    last_name: string
    email: string
    phone: string | null
    address: string | null
  }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const response = await fetch('http://172.236.179.13:8080/api/auth_app/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('email'),
        password: formData.get('password'),
      }),
    })

    if (!response.ok) {
      return 'Invalid credentials'
    }

    const data: AuthResponse = await response.json()
    
    // Store tokens in cookies
    const cookieStore = cookies()
    ;(await cookieStore).set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 // 1 hour
    })
    
    ;(await cookieStore).set('refresh_token', data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    // Store user profile with roles
    await storeUserProfile(data.profile, data.roles)

    redirect('/dashboard/monitoring/income-statements')
  } catch (error) {
    throw error
  }
}