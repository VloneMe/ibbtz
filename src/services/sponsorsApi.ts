// Sponsors API service
export interface Sponsor {
  id?: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  contactPerson: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSponsorRequest {
  name: string;
  description: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  contactPerson: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class SponsorsApiService {
  private baseUrl: string;
  private apiToken: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_API_URL;
    this.apiToken = import.meta.env.VITE_API_TOKEN;
  }

  

  /**
   * Create a new sponsor
   */
  async createSponsor(sponsorData: CreateSponsorRequest): Promise<ApiResponse<Sponsor>> {
    try {
      const response = await fetch(`${this.baseUrl}/sponsors`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'Sponsor created successfully'
      };
    } catch (error) {
      console.error('Error creating sponsor:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create sponsor'
      };
    }
  }

  /**
   * Get all sponsors
   */
  async getSponsors(): Promise<ApiResponse<Sponsor[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/sponsors`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'Sponsors retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch sponsors'
      };
    }
  }

  /**
   * Get a specific sponsor by ID
   */
  async getSponsorById(id: string): Promise<ApiResponse<Sponsor>> {
    try {
      const response = await fetch(`${this.baseUrl}/sponsors/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'Sponsor retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching sponsor:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch sponsor'
      };
    }
  }

  /**
   * Update a sponsor
   */
  async updateSponsor(id: string, sponsorData: Partial<CreateSponsorRequest>): Promise<ApiResponse<Sponsor>> {
    try {
      const response = await fetch(`${this.baseUrl}/sponsors/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        message: 'Sponsor updated successfully'
      };
    } catch (error) {
      console.error('Error updating sponsor:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update sponsor'
      };
    }
  }

  /**
   * Delete a sponsor
   */
  async deleteSponsor(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/sponsors/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: 'Sponsor deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete sponsor'
      };
    }
  }
}

// Export a singleton instance
export const sponsorsApi = new SponsorsApiService();
export default sponsorsApi;
