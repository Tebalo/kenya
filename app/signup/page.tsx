import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import PEEPALogo from "../ui/peepa-logo"
import SignupForm from "../ui/signup-form"

export const metadata: Metadata = {
  title: "Login | Botswana eCSRM",
  description: "Login page for Botswana eCSRM system",
}

export default function LoginPage() {
  return (
    <main className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-6xl p-0 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left side with logo */}
          <div className="bg-gradient-to-br from-red-800 via-red-600 to-red-900 p-8 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/squares-pattern.png')] opacity-10" />
            <div className="relative z-10 space-y-8 text-center">
              <PEEPALogo />
              <div className="space-y-2">
                <h2 className="text-white text-2xl font-semibold">Breaking new grounds</h2>
                <p className="text-red-100 text-sm max-w-md">Public Enterprises Evaluation and Privatisation Agency</p>
              </div>
            </div>
          </div>
          
          {/* Right side with login form */}
          <div className="bg-white p-6">
            <SignupForm />
          </div>
        </div>
      </Card>
    </main>
  )
}