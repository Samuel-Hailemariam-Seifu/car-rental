'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Car, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Settings,
  MoreVertical
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CarListing {
  id: string
  make: string
  model: string
  year: number
  city: string
  photos: string[]
  pricing: {
    daily: number
  }
  status: 'available' | 'maintenance' | 'disabled'
  average_rating?: number
  review_count?: number
}

export default function MyCarsPage() {
  const [cars, setCars] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch user's cars
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/dashboard/cars')
      // const data = await response.json()
      // setCars(data.cars)
      
      // Mock data for now
      setCars([
        {
          id: '1',
          make: 'Tesla',
          model: 'Model S',
          year: 2023,
          city: 'San Francisco',
          photos: ['/placeholder-car.jpg'],
          pricing: { daily: 150 },
          status: 'available',
          average_rating: 4.9,
          review_count: 24
        },
        {
          id: '2',
          make: 'BMW',
          model: 'M440 Coupe',
          year: 2024,
          city: 'Los Angeles',
          photos: ['/placeholder-car.jpg'],
          pricing: { daily: 200 },
          status: 'available',
          average_rating: 4.8,
          review_count: 18
        }
      ])
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCars = cars.filter(car => 
    `${car.make} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500'
      case 'maintenance':
        return 'bg-yellow-500'
      case 'disabled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Cars</h1>
          <p className="text-white/60">Manage your car listings and track their performance</p>
        </div>
        <Link href="/dashboard/cars/new">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New Car
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Cars</p>
                <p className="text-2xl font-bold text-white">{cars.length}</p>
              </div>
              <Car className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Available</p>
                <p className="text-2xl font-bold text-white">
                  {cars.filter(c => c.status === 'available').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">In Maintenance</p>
                <p className="text-2xl font-bold text-white">
                  {cars.filter(c => c.status === 'maintenance').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold text-white">
                  {cars.length > 0 
                    ? (cars.reduce((sum, c) => sum + (c.average_rating || 0), 0) / cars.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-gray-900 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search your cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cars Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-white/60">Loading your cars...</p>
        </div>
      ) : filteredCars.length === 0 ? (
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-12 text-center">
            <Car className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
            <p className="text-white/60 mb-6">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by adding your first car'}
            </p>
            <Link href="/dashboard/cars/new">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Car
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="bg-gray-900 border-white/10 overflow-hidden hover:border-white/20 transition-colors">
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                {car.photos && car.photos.length > 0 ? (
                  <Image
                    src={car.photos[0]}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-16 w-16 text-white/20" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(car.status)}>
                    {car.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-white/60 text-sm">{car.year}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-white/60 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {car.city}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white font-semibold">{car.average_rating || 0}</span>
                      <span className="text-white/60 text-sm ml-1">
                        ({car.review_count || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-white font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${car.pricing.daily}/day
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link href={`/cars/${car.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/dashboard/cars/${car.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
