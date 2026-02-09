'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Search, 
  Filter,
  Eye,
  Car,
  User,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  car: {
    make: string
    model: string
    photos: string[]
  }
  renter: {
    name: string
    email: string
    phone: string
  }
  startDate: string
  endDate: string
  totalAmount: number
  status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
}

export default function DashboardBookingsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data
  const bookings: Booking[] = [
    {
      id: '1',
      car: { make: 'Tesla', model: 'Model S', photos: [] },
      renter: { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234-567-8900' },
      startDate: '2024-02-20',
      endDate: '2024-02-25',
      totalAmount: 750,
      status: 'confirmed'
    },
    {
      id: '2',
      car: { make: 'BMW', model: 'M440 Coupe', photos: [] },
      renter: { name: 'Michael Chen', email: 'michael@example.com', phone: '+1 234-567-8901' },
      startDate: '2024-02-18',
      endDate: '2024-02-22',
      totalAmount: 800,
      status: 'in_progress'
    },
    {
      id: '3',
      car: { make: 'Mercedes', model: 'AMG GT', photos: [] },
      renter: { name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234-567-8902' },
      startDate: '2024-02-15',
      endDate: '2024-02-17',
      totalAmount: 600,
      status: 'completed'
    }
  ]

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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = `${booking.car.make} ${booking.car.model} ${booking.renter.name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    
    const matchesTab = activeTab === 'all' || booking.status === activeTab
    
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bookings</h1>
          <p className="text-white/60">Manage all your rental bookings</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{bookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active</p>
                <p className="text-2xl font-bold text-white">
                  {bookings.filter(b => b.status === 'in_progress' || b.status === 'confirmed').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-gray-900 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search bookings..."
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

      {/* Bookings List */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800 border-white/10">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-red-500">All</TabsTrigger>
              <TabsTrigger value="requested" className="text-white data-[state=active]:bg-red-500">Requested</TabsTrigger>
              <TabsTrigger value="confirmed" className="text-white data-[state=active]:bg-red-500">Confirmed</TabsTrigger>
              <TabsTrigger value="in_progress" className="text-white data-[state=active]:bg-red-500">In Progress</TabsTrigger>
              <TabsTrigger value="completed" className="text-white data-[state=active]:bg-red-500">Completed</TabsTrigger>
              <TabsTrigger value="cancelled" className="text-white data-[state=active]:bg-red-500">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">No bookings found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-6 bg-gray-800/50 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                        <Car className="h-8 w-8 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold text-lg">
                            {booking.car.make} {booking.car.model}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-white/60 text-sm mb-1">Renter</p>
                            <p className="text-white font-medium">{booking.renter.name}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm mb-1">Dates</p>
                            <p className="text-white text-sm">
                              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm mb-1">Amount</p>
                            <p className="text-white font-semibold">${booking.totalAmount}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm mb-1">Contact</p>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link href={`/bookings/${booking.id}`}>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
