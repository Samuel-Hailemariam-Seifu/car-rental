'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Shield,
  Key,
  Smartphone,
  Lock
} from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Security</h1>
        <p className="text-white/60">Manage your account security settings</p>
      </div>

      {/* Change Password */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Key className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-white/60">Update your password to keep your account secure</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              className="bg-gray-800 border-white/10 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-white">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              className="bg-gray-800 border-white/10 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="bg-gray-800 border-white/10 text-white mt-1"
            />
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-white/60">Add an extra layer of security to your account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="2fa" className="text-white">Enable 2FA</Label>
              <p className="text-white/60 text-sm">Require a verification code in addition to your password</p>
            </div>
            <Switch id="2fa" />
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Configure 2FA
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Active Sessions</CardTitle>
              <CardDescription className="text-white/60">Manage your active login sessions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: '1',
                device: 'Chrome on Windows',
                location: 'San Francisco, CA',
                lastActive: '2 hours ago',
                current: true
              },
              {
                id: '2',
                device: 'Safari on iPhone',
                location: 'San Francisco, CA',
                lastActive: '1 day ago',
                current: false
              }
            ].map((session) => (
              <div
                key={session.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-white/10 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-white font-semibold">{session.device}</p>
                    {session.current && (
                      <Badge className="bg-green-500 text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-white/60 text-sm">{session.location}</p>
                  <p className="text-white/40 text-xs mt-1">Last active: {session.lastActive}</p>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-gray-900 border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Lock className="h-5 w-5 text-white/60" />
            <div>
              <CardTitle className="text-white">Privacy Settings</CardTitle>
              <CardDescription className="text-white/60">Control your privacy preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profile-visibility" className="text-white">Public Profile</Label>
              <p className="text-white/60 text-sm">Allow others to view your profile</p>
            </div>
            <Switch id="profile-visibility" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-email" className="text-white">Show Email</Label>
              <p className="text-white/60 text-sm">Display your email on your profile</p>
            </div>
            <Switch id="show-email" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-phone" className="text-white">Show Phone</Label>
              <p className="text-white/60 text-sm">Display your phone number on your profile</p>
            </div>
            <Switch id="show-phone" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
