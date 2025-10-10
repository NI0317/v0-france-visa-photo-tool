import Stripe from "stripe"

// 检查是否配置了 Stripe 密钥
const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY

let stripe: Stripe | null = null

if (isStripeConfigured) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
    typescript: true,
  })
}

export { stripe, isStripeConfigured }

export const PRICING_PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: ["Basic photo cropping", "3 photos per day", "Standard resolution"],
  },
  pro: {
    name: "Pro",
    price: 4.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_xxx",
    features: [
      "Unlimited photo cropping",
      "High resolution output",
      "Batch processing (up to 10 photos)",
      "Priority support",
      "No watermarks",
    ],
  },
  premium: {
    name: "Premium",
    price: 9.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || "price_xxx",
    features: [
      "Everything in Pro",
      "AI background removal",
      "Automatic face detection",
      "Batch processing (unlimited)",
      "24/7 premium support",
      "API access",
    ],
  },
}
