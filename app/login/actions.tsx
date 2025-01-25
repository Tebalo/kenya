'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface AuthResponse {
  access_token: string
  refresh_token: string
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
    ;(await cookieStore).set('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 // 1 hour
    })
    
    ;(await cookieStore).set('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    redirect('/home')
  } catch (error) {
    throw error
    // return 'An error occurred during authentication'
  }
}

interface AuthResponse {
 access_token: string
 refresh_token: string
}

export async function register(prevState: string | undefined, formData: FormData) {
 try {
   const response = await fetch('http://172.236.179.13:8080/api/auth_app/register/', {
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
     return 'Registration failed'
   }

   const data: AuthResponse = await response.json()
   
   // Store tokens
   const cookieStore = cookies()
   ;(await cookieStore).set('access_token', data.access_token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'strict',
     maxAge: 3600 // 1 hour
   })
   
   ;(await cookieStore).set('refresh_token', data.refresh_token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production', 
     sameSite: 'strict',
     maxAge: 86400 // 24 hours
   })

   redirect('/home')
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 } catch (error) {
   return 'Registration failed'
 }
}