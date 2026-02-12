'use client'

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users,
  Target,
  Heart,
  Award,
  TrendingUp,
  Globe,
  ArrowRight,
  Check,
  Star,
  Shield
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-red-50 text-red-600 border-red-200 px-4 py-1.5 mb-6">
            Our Story
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About CarRental
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make car rental simple, affordable, and accessible for everyone. 
            Connecting car owners with renters in a trusted, secure marketplace.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-50 text-blue-600 border-blue-200 px-4 py-1.5 mb-4">
                Our Mission
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Car Owners and Renters
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                CarRental was founded with a simple vision: to create a platform where car owners 
                can earn extra income from their vehicles while providing renters with affordable, 
                convenient access to cars when they need them.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that car sharing is the future of transportation. By connecting verified 
                owners with trusted renters, we're building a community that benefits everyone 
                while reducing the environmental impact of car ownership.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">10K+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">5K+</div>
                  <div className="text-gray-600">Cars Listed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                  <div className="text-gray-600">Cities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 mb-2">4.9</div>
                  <div className="text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="border-gray-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <Users className="h-24 w-24 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trust & Safety',
                description: 'We verify every owner and renter to ensure a safe, secure experience for everyone on our platform.'
              },
              {
                icon: Heart,
                title: 'Community First',
                description: 'We build lasting relationships between owners and renters, creating a supportive car-sharing community.'
              },
              {
                icon: Target,
                title: 'Transparency',
                description: 'Clear pricing, honest reviews, and open communication are at the heart of everything we do.'
              }
            ].map((value, index) => (
              <Card key={index} className="border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why We're Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What sets CarRental apart from traditional car rental services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: 'Peer-to-Peer Model',
                description: 'Rent directly from car owners, cutting out the middleman and reducing costs for everyone.',
                benefits: [
                  'Lower prices than traditional rentals',
                  'More variety in vehicle selection',
                  'Personal connection with owners',
                  'Support local car owners'
                ]
              },
              {
                icon: Award,
                title: 'Verified Community',
                description: 'Every member of our community is verified and reviewed, ensuring trust and safety.',
                benefits: [
                  'Background checks for all users',
                  'ID verification required',
                  'Review system for accountability',
                  '24/7 support and assistance'
                ]
              },
              {
                icon: Globe,
                title: 'Sustainable Choice',
                description: 'Car sharing reduces the number of cars on the road, making a positive environmental impact.',
                benefits: [
                  'Reduce carbon footprint',
                  'Maximize vehicle utilization',
                  'Support sustainable transportation',
                  'Build greener communities'
                ]
              },
              {
                icon: TrendingUp,
                title: 'Growing Platform',
                description: 'Join a rapidly growing community of car owners and renters across the country.',
                benefits: [
                  'Expanding to new cities monthly',
                  'Growing selection of vehicles',
                  'Increasing user base',
                  'Continuous platform improvements'
                ]
              }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the CarRental Community
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Whether you're looking to rent a car or earn extra income from your vehicle, 
            we're here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/cars">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                Browse Cars
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
