import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  User, 
  Shield, 
  CreditCard, 
  CheckCircle,
  Upload,
  FileText,
  Camera,
  ArrowRight,
  ArrowLeft,
  Crown,
  Diamond,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
        <div className="max-w-4xl w-full space-y-8">
          {/* Progress Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Complete Your Profile</h1>
            <p className="text-white/60">Verify your identity to access premium features</p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-sm">Step 2 of 3</span>
                <span className="text-white/60 text-sm">67% Complete</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </div>

          {/* Main Content */}
          <Card className="bg-gray-900/80 backdrop-blur-md border-white/10">
            <CardContent className="p-8">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-white/10">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="verification" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                    Verification
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                    Preferences
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 mt-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                      <p className="text-white/60 mb-6">Tell us about yourself to personalize your experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-white">Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter your address"
                        className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="space-y-6 mt-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Identity Verification</h3>
                      <p className="text-white/60 mb-6">Upload your driver's license for verification</p>
                    </div>

                    {/* Driver's License Upload */}
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-red-500/50 transition-colors">
                        <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                        <h4 className="text-white font-semibold mb-2">Upload Driver's License</h4>
                        <p className="text-white/60 text-sm mb-4">
                          Drag and drop your driver's license here, or click to browse
                        </p>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          Choose File
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber" className="text-white">License Number</Label>
                          <Input
                            id="licenseNumber"
                            placeholder="Enter license number"
                            className="bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-red-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            className="bg-white/5 border-white/20 text-white focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Verification Status */}
                    <div className="bg-gray-800/50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Shield className="h-6 w-6 text-yellow-400" />
                        <h4 className="text-white font-semibold">Verification Status</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-white/80 text-sm">Personal information verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-yellow-400" />
                          <span className="text-white/80 text-sm">Driver's license pending review</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-white/60 text-sm">Background check pending</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        Submit for Review
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6 mt-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Preferences</h3>
                      <p className="text-white/60 mb-6">Set your preferences for a personalized experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Vehicle Preferences</h4>
                        <div className="space-y-3">
                          {[
                            { label: "Luxury Cars", icon: Crown },
                            { label: "Sports Cars", icon: Car },
                            { label: "SUVs", icon: Car },
                            { label: "Electric Vehicles", icon: Car }
                          ].map((pref, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <pref.icon className="h-5 w-5 text-white/60" />
                              <span className="text-white/80">{pref.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Communication</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-white/60" />
                            <span className="text-white/80">Email notifications</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-white/60" />
                            <span className="text-white/80">SMS notifications</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Star className="h-5 w-5 text-white/60" />
                            <span className="text-white/80">Special offers</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white">
                        Complete Setup
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white/60" />
              </div>
              <h4 className="text-white font-semibold mb-2">Secure Verification</h4>
              <p className="text-white/60 text-sm">Your information is encrypted and secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="h-6 w-6 text-white/60" />
              </div>
              <h4 className="text-white font-semibold mb-2">Premium Access</h4>
              <p className="text-white/60 text-sm">Unlock exclusive luxury car rentals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white/60" />
              </div>
              <h4 className="text-white font-semibold mb-2">Priority Support</h4>
              <p className="text-white/60 text-sm">Get 24/7 premium customer support</p>
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
            
            <div className="text-center">
              <p className="text-white/40 text-sm">© 2024 AUTOCAR. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}