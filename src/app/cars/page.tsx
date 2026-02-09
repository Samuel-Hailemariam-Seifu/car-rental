import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, Star, Filter, ChevronDown, Users, Settings, Clock, Fuel, Wrench, Heart, MapPin, Calendar, Menu, Search, User } from "lucide-react";
import Link from "next/link";

interface CarListing {
  id: string
  make: string
  model: string
  year: number
  seats: number
  transmission: string
  fuel_type: string
  city: string | null
  photos: string[]
  pricing: {
    daily: number
  }
  average_rating: number
  review_count: number
}

export default function CarsPage() {
  const [cars, setCars] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    make: '',
    seats: '',
    transmission: '',
    fuelType: '',
  })
  const [sortBy, setSortBy] = useState('created_at')

  useEffect(() => {
    fetchCars()
  }, [filters, sortBy])

  async function fetchCars() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.city) params.append('city', filters.city)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.make) params.append('make', filters.make)
      if (filters.seats) params.append('seats', filters.seats)
      if (filters.transmission) params.append('transmission', filters.transmission)
      if (filters.fuelType) params.append('fuelType', filters.fuelType)
      params.append('sortBy', sortBy)

      const response = await fetch(`/api/cars/search?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch cars')
      
      const data = await response.json()
      setCars(data.cars || [])
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-black">AUTOCAR</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
              <Link href="/cars" className="text-gray-900 font-medium">Cars</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Luxury Car Rentals</h1>
              <p className="text-gray-600">Choose from our premium collection of exotic and luxury vehicles</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Los Angeles, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Feb 15-20, 2024</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900">Filter</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {[
                      { label: "$0 - $500", checked: false },
                      { label: "$500 - $1000", checked: true },
                      { label: "$1000 - $1500", checked: false },
                      { label: "$1500 - $2000", checked: true },
                      { label: "$2000 +", checked: false }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`price-${index}`}
                          checked={item.checked}
                          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label htmlFor={`price-${index}`} className="text-gray-700 text-sm">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Vehicle Category */}
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4">Vehicle Category</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Supercar", icon: Car },
                      { label: "Luxury", icon: Car, checked: true },
                      { label: "Convertible", icon: Car },
                      { label: "SUV", icon: Car },
                      { label: "Electric", icon: Car },
                      { label: "Classic", icon: Car }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4 text-gray-500" />
                        <label className="text-gray-700 text-sm flex-1">{item.label}</label>
                        {item.checked && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Transmission */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-900 font-semibold">Transmission</h3>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Fuel Type */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-900 font-semibold">Fuel Type</h3>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Choose your vehicle</h2>
                <p className="text-gray-600">{cars.length} {cars.length === 1 ? 'car' : 'cars'} available</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">Sort by</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Most Popular" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="created_at" className="text-gray-900">Most Recent</SelectItem>
                    <SelectItem value="price_low" className="text-gray-900">Price Low to High</SelectItem>
                    <SelectItem value="price_high" className="text-gray-900">Price High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Car Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading cars...</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-12">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <Card key={car.id} className="bg-white border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <Link href={`/cars/${car.id}`}>
                      <div className="relative cursor-pointer">
                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                          {car.photos && car.photos.length > 0 ? (
                            <img 
                              src={car.photos[0]} 
                              alt={`${car.year} ${car.make} ${car.model}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <Car className="h-16 w-16 text-gray-400" />
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                          {car.average_rating > 0 && (
                            <div className="absolute bottom-4 right-4">
                              <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs font-semibold text-gray-700">{car.average_rating.toFixed(1)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Link href={`/cars/${car.id}`}>
                            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {car.year} {car.make} {car.model}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm">{car.transmission} • {car.fuel_type}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">${car.pricing.daily}/day</div>
                            {car.city && (
                              <div className="text-sm text-gray-600 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {car.city}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-700 text-sm">{car.seats}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Settings className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-700 text-sm">{car.transmission}</span>
                            </div>
                          </div>
                          <Link href={`/cars/${car.id}`}>
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

