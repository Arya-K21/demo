import { useState, useEffect } from 'react'
import { Building2, Search, Filter, MessageSquare, Settings, LogOut, Calendar, MapPin, Clock, Users, TrendingUp, Eye } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import type { UserType } from '../App'
import { api } from '../utils/api'

interface VendorDashboardProps {
  userType: 'staffing' | 'vendor'
  onLogout: () => void
}

// Mock data for available requirements
const mockRequirements = [
  {
    id: 1,
    hotel: "Grand Plaza Hotel",
    title: "Event Staff for Wedding Reception",
    type: "staffing",
    description: "Need 8 experienced waitstaff for a 200-person wedding reception. Must have formal dining experience and black-tie event background.",
    date: "2024-10-15",
    location: "Downtown Area",
    budget: "$2,000 - $2,500",
    urgency: "high",
    posted: "2 hours ago",
    responses: 12,
    requirements: ["Formal dining experience", "Black-tie events", "Weekend availability"]
  },
  {
    id: 2,
    hotel: "Seaside Resort",
    title: "Catering Service for Corporate Event",
    type: "vendor",
    description: "Breakfast and lunch catering for 150 guests in a conference setting. Need professional presentation and dietary accommodations.",
    date: "2024-10-20",
    location: "Seaside District",
    budget: "$4,500 - $6,000",
    urgency: "medium",
    posted: "1 day ago",
    responses: 8,
    requirements: ["Corporate catering", "Dietary restrictions", "Professional setup"]
  },
  {
    id: 3,
    hotel: "City Center Hotel",
    title: "Transportation Service",
    type: "vendor",
    description: "Airport shuttle service for VIP guests during conference week. Need luxury vehicles and professional drivers.",
    date: "2024-10-25",
    location: "City Center",
    budget: "$1,800 - $2,200",
    urgency: "low",
    posted: "3 hours ago",
    responses: 5,
    requirements: ["Luxury vehicles", "Professional drivers", "Airport experience"]
  },
  {
    id: 4,
    hotel: "Mountain Lodge",
    title: "Housekeeping Staff",
    type: "staffing",
    description: "Temporary housekeeping staff needed for peak season. 6 staff members for 2-week period.",
    date: "2024-11-01",
    location: "Mountain District",
    budget: "$3,200 - $4,000",
    urgency: "medium",
    posted: "6 hours ago",
    responses: 18,
    requirements: ["Housekeeping experience", "Mountain location", "2-week commitment"]
  }
]

export function VendorDashboard({ userType, onLogout }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.hotel.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === "all" || 
                       (selectedType === "staffing" && userType === "staffing" && req.type === "staffing") ||
                       (selectedType === "vendor" && userType === "vendor" && req.type === "vendor") ||
                       (selectedType === req.type)
    
    // Show relevant content based on user type
    if (userType === "staffing") {
      return req.type === "staffing" && matchesSearch
    } else {
      return req.type === "vendor" && matchesSearch
    }
  })

  const dashboardTitle = userType === 'staffing' ? 'ProStaff Solutions' : 'Elite Vendors Co.'
  const dashboardSubtitle = userType === 'staffing' ? 'Staffing Company Dashboard' : 'Vendor Dashboard'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {userType === 'staffing' ? (
                <Users className="h-8 w-8 text-green-600" />
              ) : (
                <Building2 className="h-8 w-8 text-purple-600" />
              )}
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{dashboardTitle}</h1>
                <p className="text-sm text-gray-500">{dashboardSubtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
                <Badge variant="destructive" className="ml-2">2</Badge>
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
                  <p className="text-sm text-gray-600">Available Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredRequirements.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Proposals Sent</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
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
                  <p className="text-sm text-gray-600">Active Contracts</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
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
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Opportunities</TabsTrigger>
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search opportunities..."
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

            {/* Opportunities List */}
            <div className="grid gap-6">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading opportunities...</p>
                </div>
              ) : filteredRequirements.map((requirement) => (
                <Card key={requirement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{requirement.title}</CardTitle>
                          <Badge className={getUrgencyColor(requirement.urgency)}>
                            {requirement.urgency} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{requirement.hotel}</p>
                        <CardDescription>
                          {requirement.description}
                        </CardDescription>
                      </div>
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
                        <Eye className="h-4 w-4" />
                        <span>{requirement.responses} interested</span>
                      </div>
                    </div>

                    {/* Requirements Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {requirement.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Posted {requirement.posted}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Send Proposal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>My Proposals</CardTitle>
                <CardDescription>Track your submitted proposals and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No proposals sent yet. Browse opportunities and send your first proposal.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Manage your ongoing service contracts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No active contracts. Win some proposals to see your contracts here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Manage your company information and credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <Input value={dashboardTitle} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                      <Input value={userType === 'staffing' ? 'Staffing Company' : 'Service Vendor'} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <Input value="Metropolitan Area" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                      <Input value="8 years" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}