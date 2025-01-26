'use client'

import * as React from "react"
import Link from "next/link"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AtSymbolIcon, KeyIcon} from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { useFormStatus } from "react-dom"
import { register } from "../register/actions"

export default function SignupForm() {
  const [errorMessage, dispatch] = React.useActionState(register, undefined)

  return (
    <form action={dispatch} className="space-y-6">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-lg font-medium text-red-600 uppercase">
          Create Account 
        </CardTitle>
        <CardDescription>Sign up for PEEPA</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="First name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Last name"
              required
            />
          </div>
        </div>

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
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Your address"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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

        <SignUpButton />

        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </CardContent>

      <CardFooter className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

function SignUpButton() {
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