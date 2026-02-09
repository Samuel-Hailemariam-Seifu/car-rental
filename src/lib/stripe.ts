import Stripe from 'stripe'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
})

// Client-side Stripe instance
export const getStripe = () => {
  if (typeof window !== 'undefined') {
    return require('@stripe/stripe-js').loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    )
  }
  return null
}

// Payment intent creation
export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string> = {}
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Create customer
export async function createCustomer(
  email: string,
  name?: string,
  metadata: Record<string, string> = {}
) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata,
    })

    return {
      success: true,
      customerId: customer.id,
    }
  } catch (error) {
    console.error('Error creating customer:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Create payment method
export async function createPaymentMethod(
  type: string,
  card: {
    number: string
    exp_month: number
    exp_year: number
    cvc: string
  }
) {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: type as any,
      card,
    })

    return {
      success: true,
      paymentMethodId: paymentMethod.id,
    }
  } catch (error) {
    console.error('Error creating payment method:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Capture payment intent
export async function capturePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId)
    return {
      success: true,
      paymentIntent,
    }
  } catch (error) {
    console.error('Error capturing payment intent:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Cancel payment intent
export async function cancelPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId)
    return {
      success: true,
      paymentIntent,
    }
  } catch (error) {
    console.error('Error canceling payment intent:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Create refund
export async function createRefund(
  chargeId: string,
  amount?: number,
  reason?: string
) {
  try {
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount,
      reason: reason as any,
    })

    return {
      success: true,
      refund,
    }
  } catch (error) {
    console.error('Error creating refund:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Calculate platform fee
export function calculatePlatformFee(amount: number, commissionRate: number = 0.1): number {
  return Math.round(amount * commissionRate)
}

// Calculate payout amount (amount minus platform fee)
export function calculatePayoutAmount(amount: number, commissionRate: number = 0.1): number {
  return amount - calculatePlatformFee(amount, commissionRate)
}

// Format amount for Stripe (convert dollars to cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

// Format amount from Stripe (convert cents to dollars)
export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}
