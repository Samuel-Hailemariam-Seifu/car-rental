import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Car, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Eye, 
  Play, 
  Menu, 
  ShoppingCart, 
  User, 
  ChevronDown,
  Zap,
  Shield,
  Award,
  Gauge,
  Weight,
  Battery,
  Timer,
  ArrowRight,
  Heart,
  Share2,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Clean Header */}
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
              <Link href="/cars" className="text-gray-600 hover:text-gray-900 font-medium">Cars</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Luxury Car Rental */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background with Luxury Car */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-red-900/20 to-gray-700">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        {/* Luxury Car Image Placeholder */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-30">
          <div className="w-full h-full bg-gradient-to-l from-transparent to-black/50 flex items-center justify-center">
            <Car className="h-96 w-96 text-white/20" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2 text-sm font-semibold">
                  PREMIUM LUXURY
                </Badge>
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  LUXURY
                  <span className="block text-white">CAR RENTAL</span>
                </h1>
                <p className="text-xl text-white/80 max-w-lg leading-relaxed">
                  Experience the ultimate in luxury and performance with our premium fleet of exotic and luxury vehicles.
                </p>
                <div className="text-3xl font-bold text-white">
                  From $299/day
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-lg">
                  <Car className="h-5 w-5 mr-2" />
                  EXPLORE FLEET
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-lg px-8 py-4 text-lg">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Video
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-white/60 text-sm">Luxury Cars</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-white/60 text-sm">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-white/60 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Right - Car Showcase */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Main Car Card */}
                <div className="col-span-2">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                      <Car className="h-32 w-32 text-white/40" />
                      <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-green-500 text-white">Available</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-white font-bold text-lg">Ferrari 488 GTB</h3>
                      <p className="text-white/60 text-sm">Supercar • Automatic</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-white font-bold">$899/day</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white/80 text-sm ml-1">4.9</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Side Car Cards */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Car className="h-16 w-16 text-white/40" />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="text-white font-semibold text-sm">Lamborghini Huracán</h4>
                    <p className="text-white/60 text-xs">$1,299/day</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Car className="h-16 w-16 text-white/40" />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="text-white font-semibold text-sm">McLaren 720S</h4>
                    <p className="text-white/60 text-xs">$1,199/day</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <ChevronDown className="h-4 w-4" />
            </div>
            <span className="text-sm">Scroll Down</span>
          </div>
        </div>
      </section>


      {/* Volvo EX30 Rental Interface */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Car Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <Car className="h-32 w-32 text-gray-400" />
                  <div className="absolute top-4 left-4">
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Volvo EX30</h2>
                    <Badge className="bg-green-100 text-green-800">Fully electric crossover</Badge>
                  </div>
                  
                  <div className="flex space-x-2 mb-6">
                    {['L', 'R', 'F', 'B'].map((badge, index) => (
                      <div 
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          index === 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - AI Assistant */}
            <div className="lg:col-span-1">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  <Button variant="ghost" size="sm">
                    <span className="sr-only">Close</span>
                    ×
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">How can I help you?</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardContent className="p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Shield className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">Book a rent</div>
                        <div className="text-xs text-gray-600">5 min</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardContent className="p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">Analysis</div>
                        <div className="text-xs text-gray-600">Damages</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardContent className="p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">Insurance</div>
                        <div className="text-xs text-gray-600">Pick a Plan</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardContent className="p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <Zap className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">Payment</div>
                        <div className="text-xs text-gray-600">Calculate</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-3">
                    <Input 
                      placeholder="Arrange to rent this car for 8am|" 
                      className="w-full"
                    />
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <span className="text-xs">$</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <span className="text-xs">📎</span>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <span className="text-xs">⚙️</span>
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">My Location</CardTitle>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Vermont Square, Los Angeles</div>
                    <div className="text-sm text-gray-600">Current location</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">My Dates</CardTitle>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">20th of July · 10:25 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">20 Jul</div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">‹</Button>
                      <Button variant="ghost" size="sm">›</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">10:25 AM</div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">‹</Button>
                      <Button variant="ghost" size="sm">›</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Payment Method</CardTitle>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">💳</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Credit Card</div>
                    <div className="text-sm text-gray-600">3451 **** **** 7896</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-black" />
                </div>
                <span className="text-xl font-bold">AUTOCAR</span>
              </div>
              <p className="text-gray-400 mb-4">Premium car rental service</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/rent" className="hover:text-white">Car Rental</Link></li>
                <li><Link href="/luxury" className="hover:text-white">Luxury Cars</Link></li>
                <li><Link href="/electric" className="hover:text-white">Electric Vehicles</Link></li>
                <li><Link href="/sports" className="hover:text-white">Sports Cars</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@autocar.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 AUTOCAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}