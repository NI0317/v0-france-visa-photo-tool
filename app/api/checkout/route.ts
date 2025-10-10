import { NextResponse } from "next/server"
import { stripe, isStripeConfigured } from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    // 检查 Stripe 是否已配置
    if (!isStripeConfigured || !stripe) {
      return NextResponse.json(
        { error: "Payment system is not configured. Please set up Stripe environment variables." },
        { status: 503 },
      )
    }

    const { priceId, plan } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?canceled=true`,
      metadata: {
        plan,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
