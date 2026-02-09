import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Car, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Crown,
  Diamond,
  Shield,
  Star,
  Users,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  User,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AUTOCAR</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/80 hover:text-white">
                <Phone className="h-4 w-4 mr-2" />
                +963 997 843 565
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Join AUTOCAR</h1>
            <p className="text-white/60">Create your luxury car rental account</p>
          </div>

          {/* Sign Up Form */}
          <Card className="bg-gray-900/80 backdrop-blur-md border-white/10">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-white text-center">Create Account</CardTitle>
              <CardDescription className="text-white/60 text-center">
                Enter your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone"
                      className="pl-10 bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-white/40 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-white/40 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 mt-1" />
                    <Label htmlFor="terms" className="text-white/80 text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-red-400 hover:text-red-300 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-red-400 hover:text-red-300 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="newsletter" className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 mt-1" />
                    <Label htmlFor="newsletter" className="text-white/80 text-sm">
                      Subscribe to our newsletter for exclusive offers
                    </Label>
                  </div>
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-white/60">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
              </div>

              <div className="text-center">
                <p className="text-white/60">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-red-400 hover:text-red-300 font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="h-6 w-6 text-white/60" />
              </div>
              <p className="text-white/60 text-xs">Premium Access</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-white/60" />
              </div>
              <p className="text-white/60 text-xs">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-white/60" />
              </div>
              <p className="text-white/60 text-xs">Luxury</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AUTOCAR</span>
            </div>
            
            <div className="flex space-x-6">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-white/40 text-sm">© 2024 AUTOCAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}