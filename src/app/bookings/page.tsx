'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Car, 
  Calendar, 
  MapPin, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

interface Booking {
  id: string
  start_ts: string
  end_ts: string
  total_amount_cents: number
  status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'dispute'
  car: {
    id: string
    make: string
    model: string
    year: number
    photos: string[]
    city: string | null
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchBookings()
  }, [activeTab])

  async function fetchBookings() {
    try {
      const url = activeTab === 'all' 
        ? '/api/bookings'
        : `/api/bookings?status=${activeTab}`
      
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch bookings')
      
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  function getStatusBadge(status: string) {
    const statusConfig = {
      requested: { label: 'Pending', variant: 'default' as const, icon: Clock },
      confirmed: { label: 'Confirmed', variant: 'default' as const, icon: CheckCircle },
      in_progress: { label: 'In Progress', variant: 'default' as const, icon: Clock },
      completed: { label: 'Completed', variant: 'default' as const, icon: CheckCircle },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle },
      dispute: { label: 'Dispute', variant: 'destructive' as const, icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.requested
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </Badge>
    )
  }

  function formatPrice(cents: number) {
    return `$${(cents / 100).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your car rental bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="requested">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600 mb-6">
                    {activeTab === 'all' 
                      ? "You haven't made any bookings yet."
                      : `You don't have any ${activeTab} bookings.`
                    }
                  </p>
                  <Link href="/cars">
                    <Button>Browse Cars</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Car Image */}
                        <div className="md:w-48">
                          {booking.car.photos && booking.car.photos.length > 0 ? (
                            <img
                              src={booking.car.photos[0]}
                              alt={`${booking.car.make} ${booking.car.model}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Car className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <Link href={`/cars/${booking.car.id}`}>
                                <h3 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">
                                  {booking.car.year} {booking.car.make} {booking.car.model}
                                </h3>
                              </Link>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {booking.car.city || 'Location not specified'}
                                </div>
                              </div>
                            </div>
                            {getStatusBadge(booking.status)}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-gray-600">Start Date</div>
                              <div className="font-semibold flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(new Date(booking.start_ts), 'MMM dd, yyyy')}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">End Date</div>
                              <div className="font-semibold flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(new Date(booking.end_ts), 'MMM dd, yyyy')}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Total Amount</div>
                              <div className="font-semibold flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {formatPrice(booking.total_amount_cents)}
                              </div>
                            </div>
                            <div className="flex items-end">
                              <Link href={`/bookings/${booking.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
