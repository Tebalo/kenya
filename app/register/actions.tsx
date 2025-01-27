'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { storeUserProfile } from '../login/session-actions'

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

export async function register(prevState: string | undefined, formData: FormData) {
  try {
    const response = await fetch('http://172.236.179.13:8080/api/auth_app/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        is_staff: false
      }),
    })

    if (response.status === 400) {
      const errorData = await response.json()
      console.error('Error Response:', errorData)
      return 'Registration failed'
    }

    const data: AuthResponse = await response.json()

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

    await storeUserProfile(data.profile, data.roles)

    redirect('/dashboard/monitoring/income-statements')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    redirect('/login')
  }
}