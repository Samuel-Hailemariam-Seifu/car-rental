'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, 
  User,
  Car,
  Calendar
} from "lucide-react"

interface Review {
  id: string
  reviewer: {
    name: string
    avatar?: string
  }
  car: {
    make: string
    model: string
  }
  rating: number
  comment: string
  date: string
  type: 'received' | 'given'
}

export default function ReviewsPage() {
  // Mock data
  const receivedReviews: Review[] = [
    {
      id: '1',
      reviewer: { name: 'Sarah Johnson' },
      car: { make: 'Tesla', model: 'Model S' },
      rating: 5,
      comment: 'Excellent car! Clean, fast, and the autopilot feature was amazing. The owner was very responsive and helpful.',
      date: '2024-02-10',
      type: 'received'
    },
    {
      id: '2',
      reviewer: { name: 'Michael Chen' },
      car: { make: 'BMW', model: 'M440 Coupe' },
      rating: 5,
      comment: 'Great experience! The car was in perfect condition and the owner was very accommodating.',
      date: '2024-02-08',
      type: 'received'
    }
  ]

  const givenReviews: Review[] = [
    {
      id: '3',
      reviewer: { name: 'You' },
      car: { make: 'Mercedes', model: 'AMG GT' },
      rating: 5,
      comment: 'Great renter! Returned the car in perfect condition and was very respectful.',
      date: '2024-02-05',
      type: 'given'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reviews</h1>
        <p className="text-white/60">View and manage reviews from your rentals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">4.9</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Reviews</p>
                <p className="text-2xl font-bold text-white">{receivedReviews.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">5-Star Reviews</p>
                <p className="text-2xl font-bold text-white">
                  {receivedReviews.filter(r => r.rating === 5).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <Tabs defaultValue="received">
            <TabsList className="bg-gray-800 border-white/10">
              <TabsTrigger value="received" className="text-white data-[state=active]:bg-red-500">
                Reviews Received ({receivedReviews.length})
              </TabsTrigger>
              <TabsTrigger value="given" className="text-white data-[state=active]:bg-red-500">
                Reviews Given ({givenReviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="received" className="mt-6">
              <div className="space-y-4">
                {receivedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 bg-gray-800/50 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white/60" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{review.reviewer.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-white/60 text-sm">
                              {review.car.make} {review.car.model}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-white/40 text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-white/80">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="given" className="mt-6">
              <div className="space-y-4">
                {givenReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 bg-gray-800/50 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                          <Car className="h-6 w-6 text-white/60" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{review.car.make} {review.car.model}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-white/40 text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-white/80">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}
