import { useState } from 'react'
import { Search, Filter, Star, MapPin, Clock, Users, Building2, Phone, Mail, Globe } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

// Mock data for service providers
const mockProviders = [
  {
    id: 1,
    name: "Elite Event Staffing",
    type: "staffing",
    rating: 4.8,
    reviews: 124,
    location: "Downtown Area",
    services: ["Waitstaff", "Bartenders", "Event Coordinators", "Security"],
    description: "Premium staffing solutions for high-end events and hospitality venues. 10+ years experience.",
    responseTime: "< 2 hours",
    price: "$25-45/hour",
    availability: "Available",
    certifications: ["Food Safety", "Alcohol Service", "First Aid"],
    recentJobs: 45,
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 2,
    name: "Gourmet Catering Co.",
    type: "vendor",
    rating: 4.9,
    reviews: 89,
    location: "Metropolitan Area",
    services: ["Corporate Catering", "Wedding Catering", "Breakfast Service", "Special Dietary"],
    description: "Award-winning catering service specializing in corporate events and luxury occasions.",
    responseTime: "< 1 hour",
    price: "$35-65/person",
    availability: "Available",
    certifications: ["Health Department", "Organic Certified", "Kosher Certified"],
    recentJobs: 32,
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 3,
    name: "Crystal Clean Services",
    type: "vendor",
    rating: 4.7,
    reviews: 156,
    location: "City Center",
    services: ["Deep Cleaning", "Regular Maintenance", "Carpet Cleaning", "Window Cleaning"],
    description: "Professional cleaning services for hotels and commercial properties. Eco-friendly solutions.",
    responseTime: "< 3 hours",
    price: "$40-80/room",
    availability: "Busy",
    certifications: ["Green Certified", "Bonded & Insured", "Commercial License"],
    recentJobs: 78,
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 4,
    name: "VIP Transportation",
    type: "vendor",
    rating: 4.6,
    reviews: 201,
    location: "Airport District",
    services: ["Airport Shuttle", "VIP Transport", "Group Transportation", "Luxury Vehicles"],
    description: "Premium transportation services with a fleet of luxury vehicles and professional drivers.",
    responseTime: "< 30 mins",
    price: "$50-120/trip",
    availability: "Available",
    certifications: ["Commercial License", "Insurance Certified", "Background Checked"],
    recentJobs: 67,
    avatar: "/api/placeholder/64/64"
  },
  {
    id: 5,
    name: "ProStaff Solutions",
    type: "staffing",
    rating: 4.5,
    reviews: 93,
    location: "Suburban Area",
    services: ["Housekeeping", "Front Desk", "Maintenance", "Kitchen Staff"],
    description: "Reliable staffing for all hotel departments. Quick deployment and flexible scheduling.",
    responseTime: "< 4 hours",
    price: "$18-35/hour",
    availability: "Available",
    certifications: ["Background Checked", "Hospitality Training", "Multi-lingual"],
    recentJobs: 58,
    avatar: "/api/placeholder/64/64"
  }
]

export function ServiceBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = activeFilter === "all" || provider.type === activeFilter
    
    return matchesSearch && matchesFilter
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Busy': return 'bg-yellow-100 text-yellow-800'
      case 'Unavailable': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search service providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList>
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="staffing">Staffing Companies</TabsTrigger>
          <TabsTrigger value="vendor">Service Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="mt-6">
          <div className="grid gap-6">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={provider.avatar} alt={provider.name} />
                        <AvatarFallback>
                          {provider.type === 'staffing' ? (
                            <Users className="h-8 w-8" />
                          ) : (
                            <Building2 className="h-8 w-8" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-xl">{provider.name}</CardTitle>
                          <Badge className={getAvailabilityColor(provider.availability)}>
                            {provider.availability}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(provider.rating)}
                            <span className="text-sm text-gray-600 ml-1">
                              {provider.rating} ({provider.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{provider.location}</span>
                          </div>
                        </div>
                        <CardDescription className="mb-3">
                          {provider.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Services */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Response: {provider.responseTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Price: {provider.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>Recent jobs: {provider.recentJobs}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{provider.type === 'staffing' ? 'Staffing' : 'Vendor'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-3 text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">
                        Contact Provider
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No service providers found matching your criteria.</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}