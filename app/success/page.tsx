"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, Sparkles } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-2xl font-bold">Processing your payment...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-gradient-to-br from-white to-violet-50">
        <CardHeader className="text-center pb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-t-lg">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
              <CheckCircle className="h-20 w-20 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-4">Payment Successful! 🎉</CardTitle>
          <CardDescription className="text-white/90 text-xl font-medium">
            Welcome to the premium experience
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-12 pb-8 px-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-violet-900">What's Next?</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Your account has been upgraded! You now have access to all premium features including:
            </p>
            <ul className="space-y-3 ml-6">
              {[
                "Unlimited photo processing",
                "High resolution exports",
                "AI-powered features",
                "Priority support",
                "No watermarks",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700">
                  <Sparkles className="h-5 w-5 text-violet-500" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {sessionId && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Transaction ID:</span> {sessionId}
              </p>
            </div>
          )}

          <div className="pt-4">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white py-6 rounded-xl shadow-lg text-lg font-bold transition-all duration-300 hover:scale-105">
                <Home className="h-5 w-5 mr-2" />
                Start Using Premium Features
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
