'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  Car,
  DollarSign,
  Clock,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Booking {
  id: string
  car: {
    make: string
    model: string
    year: number
    photos: string[]
  }
  renter: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  startDate: string
  endDate: string
  totalAmount: number
  status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
}

export default function BookingDetailPage() {
  const params = useParams()
  const bookingId = params.id as string
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooking()
  }, [bookingId])

  const fetchBooking = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/bookings/${bookingId}`)
      // const data = await response.json()
      // setBooking(data.booking)
      
      // Mock data for now
      setBooking({
        id: bookingId,
        car: {
          make: 'Tesla',
          model: 'Model S',
          year: 2023,
          photos: ['/placeholder-car.jpg']
        },
        renter: {
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567'
        },
        startDate: '2024-02-20',
        endDate: '2024-02-25',
        totalAmount: 750,
        status: 'confirmed',
        createdAt: '2024-02-15T10:00:00'
      })
    } catch (error) {
      console.error('Error fetching booking:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500'
      case 'in_progress':
        return 'bg-green-500'
      case 'completed':
        return 'bg-gray-500'
      case 'cancelled':
        return 'bg-red-500'
      case 'requested':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading booking details...</p>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Booking not found</p>
          <Link href="/bookings">
            <Button>Back to Bookings</Button>
          </Link>
        </div>
      </div>
    )
  }

  const days = Math.ceil(
    (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/bookings">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
              <p className="text-gray-600">Booking ID: {booking.id}</p>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Information */}
            <Card>
              <CardHeader>
                <CardTitle>Car Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                    {booking.car.photos && booking.car.photos.length > 0 ? (
                      <Image
                        src={booking.car.photos[0]}
                        alt={`${booking.car.make} ${booking.car.model}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {booking.car.make} {booking.car.model}
                    </h3>
                    <p className="text-gray-600">{booking.car.year}</p>
                    <Link href={`/cars/${booking.car.make.toLowerCase()}-${booking.car.model.toLowerCase().replace(' ', '-')}`}>
                      <Button variant="outline" className="mt-4">
                        View Car Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Dates */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(booking.startDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">End Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(booking.endDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{days} {days === 1 ? 'day' : 'days'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Renter Information */}
            <Card>
              <CardHeader>
                <CardTitle>Renter Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{booking.renter.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{booking.renter.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{booking.renter.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-semibold text-gray-900">
                      ${(booking.totalAmount / days).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days</span>
                    <span className="font-semibold text-gray-900">{days}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        ${(booking.totalAmount * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold text-gray-900">
                        ${(booking.totalAmount * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      <DollarSign className="inline h-5 w-5" />
                      {booking.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {booking.status === 'requested' && (
                  <>
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      Confirm Booking
                    </Button>
                    <Button variant="outline" className="w-full">
                      Decline
                    </Button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <Button variant="outline" className="w-full">
                    Cancel Booking
                  </Button>
                )}
                {booking.status === 'in_progress' && (
                  <Button variant="outline" className="w-full">
                    Mark as Completed
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Download Receipt
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
