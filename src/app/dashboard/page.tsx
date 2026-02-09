import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Star, 
  Users, 
  MapPin, 
  Clock,
  Crown,
  Diamond,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  MessageSquare,
  Settings,
  Plus,
  Filter,
  Search
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John</h1>
          <p className="text-white/60">Here's what's happening with your luxury car rental business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-white text-black hover:bg-gray-100">
            <Plus className="h-4 w-4 mr-2" />
            Add New Car
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">$24,580</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active Bookings</p>
                <p className="text-2xl font-bold text-white">18</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+3 this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Fleet Size</p>
                <p className="text-2xl font-bold text-white">12</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+2 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Customer Rating</p>
                <p className="text-2xl font-bold text-white">4.9</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-sm">Excellent</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Bookings</CardTitle>
                <CardDescription className="text-white/60">Your latest rental transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    car: "BMW M440 Coupe",
                    customer: "Sarah Johnson",
                    date: "Feb 15, 2024",
                    amount: "$159.99",
                    status: "Active",
                    statusColor: "bg-green-500"
                  },
                  {
                    car: "Mercedes-AMG GT 63 S",
                    customer: "Michael Chen",
                    date: "Feb 14, 2024",
                    amount: "$299.99",
                    status: "Completed",
                    statusColor: "bg-blue-500"
                  },
                  {
                    car: "Audi A4",
                    customer: "Emily Davis",
                    date: "Feb 13, 2024",
                    amount: "$129.99",
                    status: "Pending",
                    statusColor: "bg-yellow-500"
                  }
                ].map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-white/60" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{booking.car}</h4>
                        <p className="text-white/60 text-sm">{booking.customer}</p>
                        <p className="text-white/40 text-xs">{booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{booking.amount}</p>
                      <Badge className={`${booking.statusColor} text-white text-xs`}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gray-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-red-500 hover:bg-red-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Car
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                <Users className="h-4 w-4 mr-2" />
                Manage Customers
              </Button>
              <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>

          {/* Fleet Performance */}
          <Card className="bg-gray-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Fleet Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Utilization Rate</span>
                  <span className="text-white font-semibold">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Maintenance</span>
                  <span className="text-white font-semibold">2 Cars</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Available</span>
                  <span className="text-white font-semibold">8 Cars</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-white/60">Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: Calendar,
                title: "New booking received",
                description: "BMW M440 Coupe - Sarah Johnson",
                time: "2 hours ago",
                color: "text-green-400"
              },
              {
                icon: Car,
                title: "Car maintenance completed",
                description: "Mercedes-AMG GT 63 S is now available",
                time: "4 hours ago",
                color: "text-blue-400"
              },
              {
                icon: Star,
                title: "New 5-star review",
                description: "Excellent service! - Michael Chen",
                time: "6 hours ago",
                color: "text-yellow-400"
              },
              {
                icon: DollarSign,
                title: "Payment received",
                description: "$299.99 from Emily Davis",
                time: "1 day ago",
                color: "text-green-400"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('-400', '-500/20')}`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{activity.title}</h4>
                  <p className="text-white/60 text-sm">{activity.description}</p>
                  <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}