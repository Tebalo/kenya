'use client'

import React, { useState, useEffect } from 'react'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  // AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { updateCurrentRole } from '@/app/login/session-actions'

export function NavUser() {
  const [userProfile, setUserProfile] = useState<{
    profile: {
      username: string
      email: string
    }
    roles: string[]
    currentRole: string
  } | null>(null)
  const { isMobile } = useSidebar()

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/user-profile')
        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchUserProfile()
  }, [])

  const handleRoleChange = async (role: string) => {
    try {
      const updatedProfile = await updateCurrentRole(role)
      if (updatedProfile) {
        setUserProfile(updatedProfile)
      }
    } catch (error) {
      console.error('Error updating current role:', error)
    }
  }

  if (!userProfile) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {userProfile.profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userProfile.profile.username}</span>
                <span className="truncate text-xs">{userProfile.currentRole || 'No Role'}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {userProfile.profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userProfile.profile.username}</span>
                  <span className="truncate text-xs">{userProfile.profile.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            
            {userProfile.roles.length > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userProfile.roles.map((role) => (
                    <DropdownMenuItem 
                      key={role} 
                      onSelect={() => handleRoleChange(role)}
                      className={userProfile.currentRole === role ? 'bg-accent' : ''}
                    >
                      Switch to {role} Role
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}