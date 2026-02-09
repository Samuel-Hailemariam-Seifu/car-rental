'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Car, 
  Calendar, 
  DollarSign, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CarDetails {
  id: string
  make: string
  model: string
  year: number
  photos: string[]
  pricing: {
    daily: number
    deposit?: number
  }
  owner: {
    full_name: string | null
  }
}

function CheckoutForm({ car, startDate, endDate, totalPrice, onSuccess }: {
  car: CarDetails
  startDate: string
  endDate: string
  totalPrice: number
  onSuccess: (bookingId: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: car.id,
          startDate,
          endDate,
        }),
      })

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json()
        throw new Error(errorData.error || 'Failed to create booking')
      }

      const { booking, clientSecret } = await bookingResponse.json()

      // Confirm payment
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/bookings/${booking.id}/success`,
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        throw confirmError
      }

      onSuccess(booking.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full"
        size="lg"
      >
        {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
      </Button>
    </form>
  )
}

export default function NewBookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const carId = searchParams.get('carId')
  const startDateParam = searchParams.get('start')
  const endDateParam = searchParams.get('end')

  const [car, setCar] = useState<CarDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [days, setDays] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (!carId || !startDateParam || !endDateParam) {
      router.push('/cars')
      return
    }

    fetchCarDetails()
    calculatePrice()
  }, [carId, startDateParam, endDateParam])

  function calculatePrice() {
    if (!startDateParam || !endDateParam || !car) return

    const start = new Date(startDateParam)
    const end = new Date(endDateParam)
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    setDays(daysDiff)

    const dailyRate = car.pricing.daily
    const basePrice = dailyRate * daysDiff
    const deposit = car.pricing.deposit || 0
    setTotalPrice(basePrice + deposit)
  }

  async function fetchCarDetails() {
    try {
      const response = await fetch(`/api/cars/${carId}`)
      if (!response.ok) throw new Error('Failed to fetch car')
      const data = await response.json()
      setCar(data)
    } catch (error) {
      console.error('Error fetching car:', error)
      router.push('/cars')
    } finally {
      setLoading(false)
    }
  }

  function handleSuccess(bookingId: string) {
    router.push(`/bookings/${bookingId}/success`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!car || !startDateParam || !endDateParam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid booking request</h1>
          <Link href="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </div>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/cars/${carId}`}>
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Car Details
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Car Info */}
                <div className="flex space-x-4">
                  {car.photos && car.photos.length > 0 && (
                    <img
                      src={car.photos[0]}
                      alt={`${car.make} ${car.model}`}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-sm text-gray-600">Owner: {car.owner.full_name || 'Car Owner'}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {new Date(startDateParam).toLocaleDateString()} - {new Date(endDateParam).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {days} {days === 1 ? 'day' : 'days'}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>${car.pricing.daily} × {days} days</span>
                    <span>${(car.pricing.daily * days).toFixed(2)}</span>
                  </div>
                  {car.pricing.deposit && (
                    <div className="flex justify-between text-sm">
                      <span>Security Deposit</span>
                      <span>${car.pricing.deposit.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                      car={car}
                      startDate={startDateParam}
                      endDate={endDateParam}
                      totalPrice={totalPrice}
                      onSuccess={handleSuccess}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-8">
                    <Button
                      onClick={async () => {
                        const response = await fetch('/api/bookings', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            carId: car.id,
                            startDate: startDateParam,
                            endDate: endDateParam,
                          }),
                        })
                        const { clientSecret: secret } = await response.json()
                        setClientSecret(secret)
                      }}
                    >
                      Initialize Payment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trust Badges */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Why book with us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Secure Payment</div>
                    <div className="text-sm text-gray-600">Your payment is protected</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Instant Confirmation</div>
                    <div className="text-sm text-gray-600">Get confirmed immediately</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Best Price Guarantee</div>
                    <div className="text-sm text-gray-600">Competitive pricing</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
