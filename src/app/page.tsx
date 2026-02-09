'use client'

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
  Menu, 
  User,
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
  Linkedin
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  CarRental
                </span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/cars" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Browse Cars
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                About
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

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
            <Badge className="bg-red-50 text-red-600 border-red-200 px-4 py-1.5 mb-6">
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
            <Card className="bg-white border-2 border-gray-200 shadow-xl p-2 mb-8">
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
                  <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white h-full px-8 py-6 text-lg font-semibold w-full md:w-auto">
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

      {/* Features Section */}
      <section className="py-20 bg-white">
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
                color: 'text-blue-500'
              },
              {
                icon: Zap,
                title: 'Instant Booking',
                description: 'Book your car in minutes with our streamlined booking process',
                color: 'text-yellow-500'
              },
              {
                icon: Award,
                title: 'Best Prices',
                description: 'Compare prices from multiple owners and get the best deals',
                color: 'text-green-500'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Round-the-clock customer support whenever you need help',
                color: 'text-purple-500'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.color} bg-${feature.color.split('-')[1]}-50 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="py-20 bg-gray-50">
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
                location: 'San Francisco, CA'
              },
              {
                make: 'BMW',
                model: 'M440 Coupe',
                year: 2024,
                price: 200,
                rating: 4.8,
                reviews: 89,
                image: '/placeholder-car.jpg',
                location: 'Los Angeles, CA'
              },
              {
                make: 'Mercedes-Benz',
                model: 'AMG GT',
                year: 2023,
                price: 350,
                rating: 5.0,
                reviews: 67,
                image: '/placeholder-car.jpg',
                location: 'Miami, FL'
              }
            ].map((car, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all border-gray-200 group">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-24 w-24 text-gray-400 group-hover:text-gray-500 transition-colors" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white shadow-md">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white">Available</Badge>
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-red-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-red-100">Cars Available</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-red-100">Cities</div>
            </div>
            <div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search & Compare',
                description: 'Browse through thousands of cars and compare prices, features, and reviews from verified owners.',
                icon: Search
              },
              {
                step: '02',
                title: 'Book Instantly',
                description: 'Select your dates, review the details, and book your car instantly with secure payment.',
                icon: Calendar
              },
              {
                step: '03',
                title: 'Hit the Road',
                description: 'Pick up your car and enjoy your journey. We\'re here to help if you need anything.',
                icon: Car
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full text-2xl font-bold mb-6">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers and start your journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
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
