'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  Plus
} from "lucide-react"

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Payments</h1>
        <p className="text-white/60">Manage your payment methods and billing history</p>
      </div>

      {/* Payment Methods */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-white/60" />
              <div>
                <CardTitle className="text-white">Payment Methods</CardTitle>
                <CardDescription className="text-white/60">Manage your payment methods</CardDescription>
              </div>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg border border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-white/60 text-sm">Expires 12/25</p>
                </div>
              </div>
              <Badge className="bg-green-500">Default</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
          <CardDescription className="text-white/60">View your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: '1',
                description: 'Service Fee - February 2024',
                amount: 45.00,
                date: '2024-02-15',
                status: 'paid'
              },
              {
                id: '2',
                description: 'Service Fee - January 2024',
                amount: 45.00,
                date: '2024-01-15',
                status: 'paid'
              },
              {
                id: '3',
                description: 'Service Fee - December 2023',
                amount: 45.00,
                date: '2023-12-15',
                status: 'paid'
              }
            ].map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{transaction.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-white/60" />
                      <p className="text-white/60 text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-white font-semibold">${transaction.amount.toFixed(2)}</p>
                  <Badge className="bg-green-500">Paid</Badge>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">$8,450</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Last Month</p>
                <p className="text-2xl font-bold text-white">$7,230</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">$45,230</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
