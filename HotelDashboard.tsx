import { useState, useEffect } from 'react'
import { Building2, Plus, Search, Filter, MessageSquare, Settings, LogOut, Calendar, MapPin, Clock, Users } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { PostRequirementModal } from './PostRequirementModal'
import { ServiceBrowser } from './ServiceBrowser'
import { api } from '../utils/api'

interface HotelDashboardProps {
  onLogout: () => void
}

// Mock data for requirements
const mockRequirements = [
  {
    id: 1,
    title: "Event Staff for Wedding Reception",
    type: "staffing",
    description: "Need 8 experienced waitstaff for a 200-person wedding reception",
    date: "2024-10-15",
    location: "Downtown Hotel Ballroom",
    budget: "$2,000 - $2,500",
    status: "active",
    responses: 12,
    posted: "2 hours ago"
  },
  {
    id: 2,
    title: "Catering Service for Corporate Event",
    type: "vendor",
    description: "Breakfast and lunch catering for 150 guests, conference setting",
    date: "2024-10-20",
    location: "Conference Center",
    budget: "$4,500 - $6,000",
    status: "pending",
    responses: 8,
    posted: "1 day ago"
  },
  {
    id: 3,
    title: "Deep Cleaning Service",
    type: "vendor",
    description: "Post-renovation deep cleaning for 50 guest rooms and common areas",
    date: "2024-10-12",
    location: "Hotel Renovation Wing",
    budget: "$3,000 - $4,000",
    status: "completed",
    responses: 15,
    posted: "3 days ago"
  }
]

export function HotelDashboard({ onLogout }: HotelDashboardProps) {
  const [activeTab, setActiveTab] = useState("requirements")
  const [showPostModal, setShowPostModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [requirements, setRequirements] = useState(mockRequirements)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadRequirements()
  }, [])

  const loadRequirements = async () => {
    setLoading(true)
    try {
      const response = await api.getRequirements()
      if (response.data?.requirements) {
        setRequirements(response.data.requirements)
      }
    } catch (error) {
      console.error('Failed to load requirements:', error)
      // Keep using mock data on error
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRequirement = async (data: any) => {
    try {
      const response = await api.createRequirement(data)
      if (response.data?.requirement) {
        setRequirements(prev => [response.data.requirement, ...prev])
        setShowPostModal(false)
      } else {
        console.error('Failed to create requirement:', response.error)
      }
    } catch (error) {
      console.error('Error creating requirement:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'staffing' ? <Users className="h-4 w-4" /> : <Building2 className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Grand Plaza Hotel</h1>
                <p className="text-sm text-gray-500">Hotel Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Requirements</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-2xl font-bold text-gray-900">35</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.4h</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="requirements">My Requirements</TabsTrigger>
              <TabsTrigger value="browse">Browse Services</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <Button onClick={() => setShowPostModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Post New Requirement
            </Button>
          </div>

          <TabsContent value="requirements" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requirements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Requirements List */}
            <div className="grid gap-6">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading requirements...</p>
                </div>
              ) : requirements.map((requirement) => (
                <Card key={requirement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getTypeIcon(requirement.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{requirement.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {requirement.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(requirement.status)}>
                        {requirement.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{requirement.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{requirement.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{requirement.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{requirement.responses} responses</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Posted {requirement.posted}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Responses
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="browse">
            <ServiceBrowser />
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No messages yet. Start a conversation with service providers.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showPostModal && (
        <PostRequirementModal
          onClose={() => setShowPostModal(false)}
          onSubmit={handleCreateRequirement}
        />
      )}
    </div>
  )
}