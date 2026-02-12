'use client'

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Calendar, 
  Car, 
  Shield,
  Check,
  ArrowRight,
  CreditCard,
  Clock,
  Star,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-red-50 text-red-600 border-red-200 px-4 py-1.5 mb-6">
            Simple & Easy
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Renting a car has never been easier. Follow these simple steps to get on the road in minutes.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Search & Compare',
                description: 'Browse through thousands of verified cars from trusted owners. Use our filters to find the perfect vehicle for your needs.',
                details: [
                  'Search by location, dates, and preferences',
                  'Compare prices and features side-by-side',
                  'Read reviews from previous renters',
                  'View detailed photos and specifications'
                ]
              },
              {
                step: '02',
                icon: Calendar,
                title: 'Book Instantly',
                description: 'Select your dates, review the rental terms, and complete your booking with secure payment in just a few clicks.',
                details: [
                  'Choose your pickup and return dates',
                  'Review pricing and rental terms',
                  'Secure payment with Stripe',
                  'Instant booking confirmation'
                ]
              },
              {
                step: '03',
                icon: Car,
                title: 'Hit the Road',
                description: 'Pick up your car and enjoy your journey. We provide 24/7 support throughout your rental period.',
                details: [
                  'Meet the owner at the agreed location',
                  'Complete quick vehicle inspection',
                  'Start your adventure',
                  'Return the car and leave a review'
                ]
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full text-3xl font-bold mb-6">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
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
              Everything you need for a safe and seamless rental experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Owners',
                description: 'All car owners go through a thorough verification process including background checks and ID verification.'
              },
              {
                icon: CreditCard,
                title: 'Secure Payments',
                description: 'All payments are processed securely through Stripe. Your financial information is never shared with owners.'
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Our support team is available around the clock to help with any questions or issues during your rental.'
              },
              {
                icon: Star,
                title: 'Trusted Reviews',
                description: 'Read authentic reviews from verified renters to make informed decisions about your rental.'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-red-600" />
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about renting with CarRental
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How do I book a car?',
                answer: 'Simply search for cars in your area, select your dates, review the details, and complete the booking with secure payment. You\'ll receive instant confirmation.'
              },
              {
                question: 'What documents do I need?',
                answer: 'You\'ll need a valid driver\'s license and a credit card. Some owners may require additional documentation, which will be clearly stated in the listing.'
              },
              {
                question: 'How does insurance work?',
                answer: 'All rentals include basic insurance coverage. You can also purchase additional coverage for extra protection. Details are provided during the booking process.'
              },
              {
                question: 'Can I cancel my booking?',
                answer: 'Yes, cancellation policies vary by owner. You can view the cancellation policy before booking. Most bookings can be cancelled for a full refund if done 24 hours before pickup.'
              },
              {
                question: 'What if there\'s an issue with the car?',
                answer: 'Contact the owner immediately through our messaging system. If you can\'t resolve the issue, our 24/7 support team is here to help.'
              },
              {
                question: 'How do I pay?',
                answer: 'Payment is processed securely through Stripe when you book. The owner receives payment after you return the car, ensuring a safe transaction for both parties.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of satisfied customers and find your perfect car today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Browse Cars
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
