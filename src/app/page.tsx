'use client'

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Car, 
  Search, 
  MapPin, 
  Calendar, 
  Star, 
  ChevronRight,
  Shield,
  Zap,
  Award,
  Heart,
  Share2,
  ArrowRight,
  Check,
  TrendingUp,
  Users,
  Clock,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Sparkles,
  ThumbsUp,
  MessageCircle,
  DollarSign,
  Gauge,
  Fuel,
  Wrench
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-red-50 text-red-600 border-red-200 px-4 py-1.5 mb-6 inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Trusted by 10,000+ renters
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Rent Cars from
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Trusted Owners
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover the perfect car for your next adventure. From economy to luxury, 
              find your ideal ride from verified owners in your area.
            </p>

            {/* Search Bar */}
            <Card className="bg-white border-2 border-gray-200 shadow-xl p-2 mb-8 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center space-x-3 px-4 py-3 border-r border-gray-200">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where are you going?"
                    className="border-0 focus-visible:ring-0 text-lg px-0"
                  />
                </div>
                <div className="flex-1 flex items-center space-x-3 px-4 py-3 border-r border-gray-200">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Pick-up date"
                    type="date"
                    className="border-0 focus-visible:ring-0 text-lg px-0"
                  />
                </div>
                <div className="flex-1 flex items-center space-x-3 px-4 py-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Return date"
                    type="date"
                    className="border-0 focus-visible:ring-0 text-lg px-0"
                  />
                </div>
                <Link href="/cars" className="md:w-auto w-full">
                  <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white h-full px-8 py-6 text-lg font-semibold w-full md:w-auto shadow-lg hover:shadow-xl transition-all">
                    <Search className="h-5 w-5 mr-2" />
                    Search Cars
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Verified Owners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Best Prices</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Instant Booking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect car type for your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Economy', icon: Car, count: '1,200+', color: 'bg-blue-50 text-blue-600' },
              { name: 'Luxury', icon: Award, count: '800+', color: 'bg-purple-50 text-purple-600' },
              { name: 'SUV', icon: Car, count: '950+', color: 'bg-green-50 text-green-600' },
              { name: 'Sports', icon: Zap, count: '450+', color: 'bg-red-50 text-red-600' },
              { name: 'Electric', icon: Sparkles, count: '600+', color: 'bg-yellow-50 text-yellow-600' },
              { name: 'Convertible', icon: Car, count: '320+', color: 'bg-pink-50 text-pink-600' }
            ].map((category, index) => (
              <Link key={index} href="/cars">
                <Card className="border-gray-200 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} cars</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CarRental?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless car rental experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Owners',
                description: 'All car owners are verified and background-checked for your safety',
                color: 'text-blue-500',
                bgColor: 'bg-blue-50'
              },
              {
                icon: Zap,
                title: 'Instant Booking',
                description: 'Book your car in minutes with our streamlined booking process',
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-50'
              },
              {
                icon: Award,
                title: 'Best Prices',
                description: 'Compare prices from multiple owners and get the best deals',
                color: 'text-green-500',
                bgColor: 'bg-green-50'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Round-the-clock customer support whenever you need help',
                color: 'text-purple-500',
                bgColor: 'bg-purple-50'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:border-red-300 hover:shadow-xl transition-all group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Popular Cars
              </h2>
              <p className="text-xl text-gray-600">
                Most booked cars this month
              </p>
            </div>
            <Link href="/cars">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                make: 'Tesla',
                model: 'Model S',
                year: 2023,
                price: 150,
                rating: 4.9,
                reviews: 124,
                image: '/placeholder-car.jpg',
                location: 'San Francisco, CA',
                features: ['Electric', 'Autopilot', 'Premium']
              },
              {
                make: 'BMW',
                model: 'M440 Coupe',
                year: 2024,
                price: 200,
                rating: 4.8,
                reviews: 89,
                image: '/placeholder-car.jpg',
                location: 'Los Angeles, CA',
                features: ['Sport', 'Luxury', 'Fast']
              },
              {
                make: 'Mercedes-Benz',
                model: 'AMG GT',
                year: 2023,
                price: 350,
                rating: 5.0,
                reviews: 67,
                image: '/placeholder-car.jpg',
                location: 'Miami, FL',
                features: ['Supercar', 'Premium', 'Powerful']
              }
            ].map((car, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all border-gray-200 group">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-24 w-24 text-gray-400 group-hover:text-gray-500 transition-colors group-hover:scale-110" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white shadow-md">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white">Available</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    {car.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-gray-600 text-sm">{car.year}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{car.rating}</span>
                      <span className="text-gray-600 text-sm">({car.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {car.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${car.price}</span>
                      <span className="text-gray-600">/day</span>
                    </div>
                    <Link href={`/cars/${car.make.toLowerCase()}-${car.model.toLowerCase().replace(' ', '-')}`}>
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link href="/cars">
              <Button variant="outline" size="lg">
                View All Cars
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from real renters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                location: 'San Francisco, CA',
                rating: 5,
                text: 'Amazing experience! The car was in perfect condition and the owner was very responsive. Will definitely rent again!',
                car: 'Tesla Model S'
              },
              {
                name: 'Michael Chen',
                location: 'Los Angeles, CA',
                rating: 5,
                text: 'Best car rental platform I\'ve used. Easy booking, great prices, and excellent customer support. Highly recommend!',
                car: 'BMW M440 Coupe'
              },
              {
                name: 'Emily Davis',
                location: 'Miami, FL',
                rating: 5,
                text: 'The process was so smooth from start to finish. Found the perfect car for my trip and saved money compared to traditional rentals.',
                car: 'Mercedes AMG GT'
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <p className="text-xs text-gray-500 mt-1">Rented {testimonial.car}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-red-100">Active Users</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-red-100">Cars Available</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-red-100">Cities</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-red-100">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rent a car in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Search & Compare',
                description: 'Browse through thousands of cars and compare prices, features, and reviews from verified owners.',
                icon: Search,
                color: 'bg-blue-100 text-blue-600'
              },
              {
                step: '02',
                title: 'Book Instantly',
                description: 'Select your dates, review the details, and book your car instantly with secure payment.',
                icon: Calendar,
                color: 'bg-green-100 text-green-600'
              },
              {
                step: '03',
                title: 'Hit the Road',
                description: 'Pick up your car and enjoy your journey. We\'re here to help if you need anything.',
                icon: Car,
                color: 'bg-red-100 text-red-600'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10" style={{ width: 'calc(100% - 4rem)', left: '50%' }}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${item.color} rounded-full text-2xl font-bold mb-6`}>
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Owners Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-1.5 mb-6">
                For Car Owners
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Earn Money from Your Car
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Turn your car into a source of income. List your vehicle and start earning 
                money when you're not using it. We handle payments, insurance, and support.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Set your own prices and availability',
                  'Full insurance coverage included',
                  'Secure payment processing',
                  '24/7 customer support',
                  'Easy booking management'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link href="/sign-up">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
                  List Your Car
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, label: 'Avg. Monthly', value: '$1,200', color: 'bg-green-500/20 text-green-400' },
                { icon: Users, label: 'Active Renters', value: '10K+', color: 'bg-blue-500/20 text-blue-400' },
                { icon: Star, label: 'Owner Rating', value: '4.9/5', color: 'bg-yellow-500/20 text-yellow-400' },
                { icon: TrendingUp, label: 'Growth Rate', value: '+25%', color: 'bg-purple-500/20 text-purple-400' }
              ].map((stat, i) => (
                <Card key={i} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of satisfied customers and start your journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-xl">
                Browse Cars
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                List Your Car
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">CarRental</span>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted platform for car rentals. Connect with verified owners and find the perfect car for your needs.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/cars" className="hover:text-white transition-colors">Browse Cars</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/become-owner" className="hover:text-white transition-colors">Become an Owner</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="/insurance" className="hover:text-white transition-colors">Insurance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} CarRental. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>support@carrental.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
