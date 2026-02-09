import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Home, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  ChevronDown,
  User,
  LogOut,
  Shield,
  CreditCard,
  BarChart3,
  Calendar,
  MapPin,
  Star,
  Heart,
  MessageSquare,
  FileText,
  HelpCircle,
  Crown,
  Diamond,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {/* Top Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AUTOCAR</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </Badge>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-white text-sm font-medium">John Doe</p>
                  <p className="text-white/60 text-xs">Premium Member</p>
                </div>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Vertical Sidebar - Inspired by Mazda CX-5 design */}
        <aside className="w-64 bg-gray-900 border-r border-white/10 min-h-screen">
          <div className="p-6">
            {/* User Profile Card */}
            <Card className="bg-gray-800 border-white/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">John Doe</h3>
                    <p className="text-white/60 text-sm">Premium Member</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    <span className="text-white/80 text-sm">VIP Status</span>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs">Active</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-500 text-white">
                <Home className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
              
              <Link href="/dashboard/cars" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <Car className="h-5 w-5" />
                <span>My Cars</span>
              </Link>
              
              <Link href="/dashboard/bookings" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <Calendar className="h-5 w-5" />
                <span>Bookings</span>
              </Link>
              
              <Link href="/dashboard/analytics" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              
              <Link href="/dashboard/messages" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
                <Badge className="bg-red-500 text-white text-xs ml-auto">2</Badge>
              </Link>
              
              <Link href="/dashboard/reviews" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <Star className="h-5 w-5" />
                <span>Reviews</span>
              </Link>
              
              <Link href="/dashboard/favorites" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
              
              <div className="border-t border-white/10 my-4"></div>
              
              <Link href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              
              <Link href="/dashboard/billing" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <CreditCard className="h-5 w-5" />
                <span>Billing</span>
              </Link>
              
              <Link href="/dashboard/security" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </Link>
              
              <Link href="/dashboard/help" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </Link>
              
              <div className="border-t border-white/10 my-4"></div>
              
              <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/5">
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-black">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}