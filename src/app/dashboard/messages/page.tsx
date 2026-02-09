'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Search, 
  Send,
  User,
  Clock
} from "lucide-react"

interface Message {
  id: string
  sender: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  participant: {
    name: string
    avatar?: string
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  messages: Message[]
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      participant: { name: 'Sarah Johnson' },
      lastMessage: 'Thanks for the great car!',
      timestamp: '2 hours ago',
      unreadCount: 2,
      messages: [
        {
          id: '1',
          sender: { name: 'Sarah Johnson' },
          content: 'Hi, I\'m interested in renting your Tesla Model S',
          timestamp: '2024-02-15T10:00:00',
          read: true
        },
        {
          id: '2',
          sender: { name: 'You' },
          content: 'Great! When would you like to pick it up?',
          timestamp: '2024-02-15T10:05:00',
          read: true
        },
        {
          id: '3',
          sender: { name: 'Sarah Johnson' },
          content: 'Thanks for the great car!',
          timestamp: '2024-02-15T14:00:00',
          read: false
        }
      ]
    },
    {
      id: '2',
      participant: { name: 'Michael Chen' },
      lastMessage: 'Is the car available this weekend?',
      timestamp: '5 hours ago',
      unreadCount: 0,
      messages: [
        {
          id: '1',
          sender: { name: 'Michael Chen' },
          content: 'Is the car available this weekend?',
          timestamp: '2024-02-15T08:00:00',
          read: true
        }
      ]
    }
  ]

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-white/60">Communicate with renters and owners</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <Card className="bg-gray-900 border-white/10 flex flex-col">
          <CardHeader className="border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-gray-800 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="divide-y divide-white/10">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 text-left hover:bg-gray-800/50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-gray-800/70' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold truncate">
                          {conversation.participant.name}
                        </h3>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/60 text-sm truncate mb-1">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-white/40 text-xs">{conversation.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages View */}
        <Card className="bg-gray-900 border-white/10 lg:col-span-2 flex flex-col">
          {selectedConv ? (
            <>
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <CardTitle className="text-white">{selectedConv.participant.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender.name === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender.name === 'You'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender.name === 'You' ? 'text-white/80' : 'text-white/60'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 bg-gray-800 border-white/10 text-white placeholder:text-white/40"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && messageInput.trim()) {
                        // Handle send message
                        setMessageInput('')
                      }
                    }}
                  />
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      if (messageInput.trim()) {
                        // Handle send message
                        setMessageInput('')
                      }
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
