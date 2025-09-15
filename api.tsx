import { projectId, publicAnonKey } from './supabase/info'

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ad57157a`

interface ApiResponse<T> {
  data?: T
  error?: string
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error ${response.status}:`, errorText)
        return { error: `API Error: ${response.status} ${errorText}` }
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      console.error('API Request failed:', error)
      return { error: `Network error: ${error}` }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Requirements
  async getRequirements() {
    return this.get('/requirements')
  }

  async createRequirement(requirement: any) {
    return this.post('/requirements', requirement)
  }

  // Service Providers
  async getProviders() {
    return this.get('/providers')
  }

  async createProvider(provider: any) {
    return this.post('/providers', provider)
  }

  // Proposals
  async getProposals() {
    return this.get('/proposals')
  }

  async createProposal(proposal: any) {
    return this.post('/proposals', proposal)
  }

  // Messages
  async getMessages(userId: string) {
    return this.get(`/messages/${userId}`)
  }

  async sendMessage(message: any) {
    return this.post('/messages', message)
  }

  // Profile
  async getProfile(userId: string) {
    return this.get(`/profile/${userId}`)
  }

  async updateProfile(profile: any) {
    return this.post('/profile', profile)
  }

  // Health check
  async healthCheck() {
    return this.get('/health')
  }

  // Test database connection
  async testConnection() {
    return this.get('/test')
  }
}

export const api = new ApiClient()