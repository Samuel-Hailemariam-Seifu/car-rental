'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Car, 
  Star, 
  MapPin, 
  Users, 
  Settings, 
  Fuel, 
  Calendar as CalendarIcon,
  Heart,
  Share2,
  MessageSquare,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

interface CarDetails {
  id: string
  make: string
  model: string
  year: number
  seats: number
  transmission: string
  fuel_type: string
  city: string | null
  description: string | null
  photos: string[]
  pricing: {
    daily: number
    weekly?: number
    monthly?: number
    deposit?: number
  }
  rules: {
    min_age?: number
    max_km?: number
    smoking?: boolean
    pets?: boolean
  }
  owner: {
    id: string
    full_name: string | null
    profile_image_url: string | null
  }
  average_rating: number
  review_count: number
}

export default function CarDetailPage() {
  const params = useParams()
  const carId = params.id as string
  const [car, setCar] = useState<CarDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isFavorite, setIsFavorite] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [days, setDays] = useState(0)

  useEffect(() => {
    fetchCarDetails()
    checkFavorite()
  }, [carId])

  useEffect(() => {
    if (dateRange?.from && dateRange?.to && car) {
      const daysDiff = Math.ceil(
        (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
      )
      setDays(daysDiff)
      const dailyRate = car.pricing.daily
      const basePrice = dailyRate * daysDiff
      const deposit = car.pricing.deposit || 0
      setTotalPrice(basePrice + deposit)
    }
  }, [dateRange, car])

  async function fetchCarDetails() {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          owner:users!cars_owner_id_fkey(id, full_name, profile_image_url)
        `)
        .eq('id', carId)
        .single()

      if (error) throw error

      // Get average rating
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('reviewee_id', data.owner_id)

      const avgRating = reviews && reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

      setCar({
        ...data,
        owner: data.owner,
        average_rating: avgRating,
        review_count: reviews?.length || 0
      })
    } catch (error) {
      console.error('Error fetching car details:', error)
    } finally {
      setLoading(false)
    }
  }

  async function checkFavorite() {
    try {
      const response = await fetch('/api/favorites')
      if (!response.ok) return

      const favorites = await response.json()
      const isFav = favorites.some((fav: any) => fav.car_id === carId)
      setIsFavorite(isFav)
    } catch (error) {
      // Not favorited or not authenticated
    }
  }

  async function toggleFavorite() {
    try {
      if (isFavorite) {
        const response = await fetch(`/api/favorites?carId=${carId}`, {
          method: 'DELETE',
        })
        if (response.ok) setIsFavorite(false)
      } else {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ carId }),
        })
        if (response.ok) setIsFavorite(true)
        else if (response.status === 401) {
          window.location.href = '/sign-in'
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  function handleBookNow() {
    if (!dateRange?.from || !dateRange?.to) {
      alert('Please select your rental dates')
      return
    }
    window.location.href = `/bookings/new?carId=${carId}&start=${dateRange.from.toISOString()}&end=${dateRange.to.toISOString()}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
          <Link href="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/cars">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cars
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  {car.photos && car.photos.length > 0 ? (
                    <>
                      <img
                        src={car.photos[selectedImageIndex]}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                      {car.photos.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : car.photos.length - 1))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={() => setSelectedImageIndex((prev) => (prev < car.photos.length - 1 ? prev + 1 : 0))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {car.photos.map((_, idx) => (
                              <button
                                key={idx}
                                className={`w-2 h-2 rounded-full ${
                                  idx === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                                onClick={() => setSelectedImageIndex(idx)}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            {car.photos && car.photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.photos.slice(0, 4).map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img src={photo} alt={`${car.make} ${car.model} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Car Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{car.year} {car.make} {car.model}</CardTitle>
                    <CardDescription className="flex items-center mt-2 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {car.city || 'Location not specified'}
                      </span>
                      {car.average_rating > 0 && (
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {car.average_rating.toFixed(1)} ({car.review_count} reviews)
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">${car.pricing.daily}</div>
                    <div className="text-sm text-gray-600">per day</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{car.fuel_type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{car.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 whitespace-pre-line">
                      {car.description || 'No description available.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>GPS Navigation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Bluetooth</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Backup Camera</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Air Conditioning</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="rules" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {car.rules.min_age && (
                        <div>
                          <strong>Minimum Age:</strong> {car.rules.min_age} years
                        </div>
                      )}
                      {car.rules.max_km && (
                        <div>
                          <strong>Maximum Kilometers:</strong> {car.rules.max_km} km/day
                        </div>
                      )}
                      <div>
                        <strong>Smoking:</strong> {car.rules.smoking ? 'Allowed' : 'Not Allowed'}
                      </div>
                      <div>
                        <strong>Pets:</strong> {car.rules.pets ? 'Allowed' : 'Not Allowed'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-600">Reviews will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle>Meet the Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {car.owner.profile_image_url ? (
                      <img src={car.owner.profile_image_url} alt={car.owner.full_name || 'Owner'} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{car.owner.full_name || 'Car Owner'}</h3>
                    <p className="text-sm text-gray-600">Verified Owner</p>
                  </div>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book this car</CardTitle>
                <CardDescription>Select your rental dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calendar */}
                <div>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                {/* Price Breakdown */}
                {dateRange?.from && dateRange?.to && (
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
                )}

                {/* Book Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBookNow}
                  disabled={!dateRange?.from || !dateRange?.to}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Book Now
                </Button>

                {/* Trust Badges */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span>24/7 Support</span>
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
