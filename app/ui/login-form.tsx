'use client'

import * as React from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "@heroicons/react/20/solid"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticate } from "../login/actions"

export default function LoginForm() {
  const [errorMessage, dispatch] = React.useActionState(authenticate, undefined)

  return (
    <form action={dispatch} className="space-y-6">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-lg font-medium text-red-600 uppercase">
          Welcome Back!
        </CardTitle>
        <CardDescription>
          Sign in to continue with PEEPA
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="pl-10"
              required
            />
            <AtSymbolIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              href="../auth/forgotpassword" 
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              className="pl-10"
              required
              minLength={6}
            />
            <KeyIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember Me
          </Label>
        </div>

        <LoginButton />

        {errorMessage && (
          <div className="flex items-center space-x-2 text-red-500">
            <ExclamationCircleIcon className="h-5 w-5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-600">
          Don&#39;t have an account?{" "}
          <Link 
            href="/register" 
            className="text-blue-600 hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      className="w-full"
      disabled={pending}
    >
      <span className="mr-2">Sign In</span>
      <ArrowRightIcon className="h-4 w-4" />
    </Button>
  )
}