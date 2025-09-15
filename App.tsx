import { useState, useEffect } from 'react'
import { LandingPage } from './components/LandingPage'
import { HotelDashboard } from './components/HotelDashboard'
import { VendorDashboard } from './components/VendorDashboard'
import { api } from './utils/api'

export type UserType = 'hotel' | 'staffing' | 'vendor' | null

export default function App() {
  const [userType, setUserType] = useState<UserType>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Test API connection on app load
    const testConnection = async () => {
      try {
        console.log('Testing API health...')
        const healthResponse = await api.healthCheck()
        if (healthResponse.data) {
          console.log('API health check successful:', healthResponse.data)
          
          // Test database connection
          console.log('Testing database connection...')
          const dbResponse = await api.testConnection()
          if (dbResponse.data) {
            console.log('Database connection successful:', dbResponse.data)
          } else {
            console.error('Database connection failed:', dbResponse.error)
          }
        } else {
          console.error('API health check failed:', healthResponse.error)
        }
      } catch (error) {
        console.error('API connection test failed:', error)
      }
    }
    testConnection()
  }, [])

  const handleLogin = (type: UserType) => {
    setUserType(type)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUserType(null)
    setIsLoggedIn(false)
  }

  if (!isLoggedIn || !userType) {
    return <LandingPage onLogin={handleLogin} />
  }

  if (userType === 'hotel') {
    return <HotelDashboard onLogout={handleLogout} />
  }

  // Both staffing and vendor use similar interface for now
  return <VendorDashboard userType={userType} onLogout={handleLogout} />
}