"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown, Sparkles, Zap, AlertCircle } from "lucide-react"
import { PRICING_PLANS } from "@/lib/stripe"
import { useLanguage } from "@/contexts/language-context"

export default function PricingModal() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { t } = useLanguage()

  const handleCheckout = async (priceId: string, plan: string) => {
    try {
      setLoading(plan)
      setError(null)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, plan }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(null)
    }
  }

  const plans = [
    {
      key: "pro",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      popular: true,
    },
    {
      key: "premium",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: false,
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-violet-50">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Upgrade Your Experience
          </DialogTitle>
          <DialogDescription className="text-lg text-slate-600">
            Choose the perfect plan for your needs and unlock premium features
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Payment System Unavailable</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {plans.map(({ key, icon: Icon, color, popular }) => {
            const plan = PRICING_PLANS[key as keyof typeof PRICING_PLANS]
            if (!plan || typeof plan === "string" || !("priceId" in plan)) return null

            return (
              <Card
                key={key}
                className={`relative overflow-hidden border-2 ${
                  popular ? "border-violet-400 shadow-2xl scale-105" : "border-slate-200"
                } transition-all duration-300 hover:shadow-xl`}
              >
                {popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className={`bg-gradient-to-br ${color} text-white pb-8`}>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold mt-4">{plan.name}</CardTitle>
                  <CardDescription className="text-white/90 text-lg font-medium">
                    <span className="text-5xl font-black">${plan.price}</span>
                    <span className="text-xl ml-2">one-time</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8 pb-4">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mt-0.5">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleCheckout(plan.priceId, key)}
                    disabled={loading === key}
                    className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white py-6 rounded-xl shadow-lg text-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === key ? "Processing..." : `Get ${plan.name}`}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Check className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Money-Back Guarantee</h3>
              <p className="text-slate-600">
                Not satisfied? Get a full refund within 30 days, no questions asked. We're confident you'll love our
                service.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-amber-800 text-sm">
            <span className="font-semibold">Note:</span> To enable payments, please configure your Stripe API keys in
            the environment variables.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
