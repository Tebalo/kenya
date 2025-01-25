import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Error 404",
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container relative px-6 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.red.600/10%)_0%,transparent_65%)]" />
        <div className="relative space-y-6">
          <Image
            src="/assets/images/error/404-dark.svg"
            alt="404"
            width={500}
            height={400}
            className="mx-auto w-full max-w-xl"
            priority
          />
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-lg text-gray-600">The page you requested was not found!</p>
          <Button asChild className="bg-red-700 hover:bg-red-800">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}