'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  HelpCircle,
  Search,
  MessageSquare,
  FileText,
  Video,
  Book,
  Mail
} from "lucide-react"

export default function HelpPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
        <p className="text-white/60">Get help and find answers to your questions</p>
      </div>

      {/* Search */}
      <Card className="bg-gray-900 border-white/10">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 bg-gray-800 border-white/10 text-white placeholder:text-white/40 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Book className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Help Center</h3>
            <p className="text-white/60 text-sm">Browse our knowledge base</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Live Chat</h3>
            <p className="text-white/60 text-sm">Chat with our support team</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Video className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Video Tutorials</h3>
            <p className="text-white/60 text-sm">Watch step-by-step guides</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Contact Us</h3>
            <p className="text-white/60 text-sm">Send us an email</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Categories */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
          <CardDescription className="text-white/60">Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                category: 'Getting Started',
                questions: [
                  'How do I list my car?',
                  'What are the requirements to rent a car?',
                  'How do I verify my driver\'s license?'
                ]
              },
              {
                category: 'Bookings',
                questions: [
                  'How do I cancel a booking?',
                  'What is the cancellation policy?',
                  'How do I modify a booking?'
                ]
              },
              {
                category: 'Payments',
                questions: [
                  'How do I receive payments?',
                  'What are the service fees?',
                  'When will I receive my payout?'
                ]
              },
              {
                category: 'Safety & Security',
                questions: [
                  'What insurance is included?',
                  'What happens if there\'s damage?',
                  'How are disputes handled?'
                ]
              }
            ].map((category, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-white/10">
                <h3 className="text-white font-semibold mb-3">{category.category}</h3>
                <ul className="space-y-2">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex}>
                      <button className="text-white/80 hover:text-white text-sm text-left">
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Still Need Help?</CardTitle>
          <CardDescription className="text-white/60">Our support team is here to help you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm mb-2 block">Subject</label>
              <Input
                placeholder="What can we help you with?"
                className="bg-gray-800 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Message</label>
              <textarea
                placeholder="Describe your issue or question..."
                className="w-full h-32 bg-gray-800 border border-white/10 text-white placeholder:text-white/40 rounded-md px-3 py-2"
              />
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
