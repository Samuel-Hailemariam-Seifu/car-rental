'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Car,
  MapPin,
  Star,
  DollarSign,
  Eye,
  Trash2
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FavoriteCar {
  id: string
  make: string
  model: string
  year: number
  city: string
  photos: string[]
  pricing: {
    daily: number
  }
  average_rating?: number
  review_count?: number
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteCar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/favorites')
      // const data = await response.json()
      // setFavorites(data.favorites)
      
      // Mock data for now
      setFavorites([
        {
          id: '1',
          make: 'Porsche',
          model: '911 Turbo',
          year: 2024,
          city: 'Miami',
          photos: ['/placeholder-car.jpg'],
          pricing: { daily: 350 },
          average_rating: 4.9,
          review_count: 45
        },
        {
          id: '2',
          make: 'Lamborghini',
          model: 'Huracán',
          year: 2023,
          city: 'Los Angeles',
          photos: ['/placeholder-car.jpg'],
          pricing: { daily: 500 },
          average_rating: 5.0,
          review_count: 32
        }
      ])
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (carId: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/favorites?carId=${carId}`, { method: 'DELETE' })
      setFavorites(favorites.filter(f => f.id !== carId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Favorites</h1>
        <p className="text-white/60">Your saved cars for future rentals</p>
      </div>

      {/* Favorites Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-white/60">Loading your favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
            <p className="text-white/60 mb-6">
              Start exploring cars and add them to your favorites
            </p>
            <Link href="/cars">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Browse Cars
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => removeFavorite(car.id)}
                  >
                    <Heart className="h-4 w-4 fill-white" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-white/60 text-sm">{car.year}</p>
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
                        ({car.review_count || 0})
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
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => removeFavorite(car.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
