import { Building2, Users, Truck, CheckCircle, Clock, Shield, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import type { UserType } from '../App'

interface LandingPageProps {
  onLogin: (type: UserType) => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HotelConnect</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Hotels with 
            <span className="text-blue-600"> Trusted Service Providers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            The digital platform that seamlessly connects hotels, staffing companies, and vendors in real-time. 
            Find verified providers, manage requirements, and coordinate services efficiently.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onLogin('hotel')}>
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>I'm a Hotel</CardTitle>
                <CardDescription>
                  Post requirements for staffing, catering, cleaning, transportation and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => onLogin('hotel')}>
                  Get Started as Hotel
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onLogin('staffing')}>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>I'm a Staffing Company</CardTitle>
                <CardDescription>
                  Discover hotel staffing opportunities and showcase your workforce
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => onLogin('staffing')}>
                  Get Started as Staffing Company
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onLogin('vendor')}>
              <CardHeader className="text-center">
                <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>I'm a Vendor</CardTitle>
                <CardDescription>
                  Offer services like catering, cleaning, transportation, and equipment rental
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => onLogin('vendor')}>
                  Get Started as Vendor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HotelConnect?</h2>
            <p className="text-xl text-gray-600">Streamline your hotel operations with our comprehensive platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">All staffing companies and vendors are thoroughly vetted and verified for quality and reliability.</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Matching</h3>
              <p className="text-gray-600">Get instant matches for your requirements with AI-powered recommendations and real-time availability.</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Communication</h3>
              <p className="text-gray-600">Built-in messaging, contracts, and payment processing for seamless and secure transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, efficient, and transparent process</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold mb-2">Post Requirements</h3>
              <p className="text-gray-600">Hotels post their staffing and service needs with specific requirements and timelines.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">Our platform automatically matches requirements with qualified providers based on location, capacity, and expertise.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold mb-2">Connect & Negotiate</h3>
              <p className="text-gray-600">Direct communication between hotels and providers to discuss details, pricing, and finalize agreements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-lg font-semibold mb-2">Execute & Review</h3>
              <p className="text-gray-600">Service delivery with built-in tracking, quality assurance, and review system for continuous improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">HotelConnect</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 HotelConnect. Connecting hotels with trusted service providers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}