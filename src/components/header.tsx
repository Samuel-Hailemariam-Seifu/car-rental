'use client'

import { Button } from "@/components/ui/button"
import { Car, Menu, Search, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CarRental
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/cars" 
              className={`font-medium transition-colors ${
                isActive('/cars') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Browse Cars
            </Link>
            <Link 
              href="/how-it-works" 
              className={`font-medium transition-colors ${
                isActive('/how-it-works') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              How It Works
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
