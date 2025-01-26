'use server'

import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

interface Profile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

interface UserSession {
  roles: string[];
  currentRole: string;
  profile: Profile;
}

export async function storeUserProfile(profile: Profile, roles: string[]) {
  const cookieStore = await cookies()
  
  // Store user profile
  cookieStore.set('user_profile', JSON.stringify({
    roles: roles,
    currentRole: roles.length > 0 ? roles[0] : '',
    profile: profile
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24 hours
  })
}

export async function getUserProfile(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const profileCookie = cookieStore.get('user_profile')
  
  if (!profileCookie) return null
  
  try {
    return JSON.parse(profileCookie.value)
  } catch (error) {
    console.error('Error parsing user profile:', error)
    return null
  }
}

export async function updateCurrentRole(role: string) {
  const currentProfile = await getUserProfile()
  
  if (!currentProfile) return null
  
  const updatedProfile: UserSession = {
    ...currentProfile,
    currentRole: role
  }
  
  const cookieStore = await cookies()
  cookieStore.set('user_profile', JSON.stringify(updatedProfile), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 // 24 hours
  })
  
  return updatedProfile
}