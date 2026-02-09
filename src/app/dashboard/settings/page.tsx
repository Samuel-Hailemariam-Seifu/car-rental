'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Settings,
  User,
  Bell,
  Shield,
  Globe
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your account settings and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-white/60">Update your personal information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white">First Name</Label>
              <Input
                id="firstName"
                defaultValue="John"
                className="bg-gray-800 border-white/10 text-white mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white">Last Name</Label>
              <Input
                id="lastName"
                defaultValue="Doe"
                className="bg-gray-800 border-white/10 text-white mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              className="bg-gray-800 border-white/10 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="bg-gray-800 border-white/10 text-white mt-1"
            />
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Notifications</CardTitle>
              <CardDescription className="text-white/60">Manage how you receive notifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
              <p className="text-white/60 text-sm">Receive notifications via email</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
              <p className="text-white/60 text-sm">Receive push notifications in browser</p>
            </div>
            <Switch id="push-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="booking-updates" className="text-white">Booking Updates</Label>
              <p className="text-white/60 text-sm">Get notified about booking status changes</p>
            </div>
            <Switch id="booking-updates" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="messages" className="text-white">New Messages</Label>
              <p className="text-white/60 text-sm">Get notified when you receive new messages</p>
            </div>
            <Switch id="messages" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reviews" className="text-white">New Reviews</Label>
              <p className="text-white/60 text-sm">Get notified when you receive new reviews</p>
            </div>
            <Switch id="reviews" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Preferences</CardTitle>
              <CardDescription className="text-white/60">Customize your experience</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="language" className="text-white">Language</Label>
            <select
              id="language"
              className="w-full mt-1 bg-gray-800 border border-white/10 text-white rounded-md px-3 py-2"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <Label htmlFor="currency" className="text-white">Currency</Label>
            <select
              id="currency"
              className="w-full mt-1 bg-gray-800 border border-white/10 text-white rounded-md px-3 py-2"
              defaultValue="usd"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
            </select>
          </div>
          <div>
            <Label htmlFor="timezone" className="text-white">Timezone</Label>
            <select
              id="timezone"
              className="w-full mt-1 bg-gray-800 border border-white/10 text-white rounded-md px-3 py-2"
              defaultValue="pst"
            >
              <option value="pst">Pacific Standard Time (PST)</option>
              <option value="est">Eastern Standard Time (EST)</option>
              <option value="cst">Central Standard Time (CST)</option>
            </select>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
