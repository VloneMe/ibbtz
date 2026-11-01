import axios from 'axios';

// Base URL for the API - you can move this to environment variables
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

// Debug logging to help troubleshoot
// console.log('API_BASE_URL:', API_BASE_URL);
// console.log('VITE_BASE_API_URL env var:', import.meta.env.VITE_BASE_API_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Registration payload interface
export interface RegistrationPayload {
  email: string;
  name: string;
  personalPhoneNumber: string;
  officePhoneNumber?: string;
  personalEmail: string;
  companyName: string;
  role: string;
  registrationType: 'Individual' | 'Corporate';
  sponsorPartner: 'Yes' | 'No';
  expectations: string;
  paymentTerms: 'Pay Now' | 'Pay Later';
  eventId: string;
}

// Update payload interface
export interface UpdateRegistrationPayload extends Partial<RegistrationPayload> {
  id?: string; // Add ID for updates if needed
}

// Registration response interface
export interface RegistrationResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  statusCode?: number;
  data?: any;
}

// API functions
export const registrationApi = {
  // Create new registration
  createRegistration: async (payload: RegistrationPayload): Promise<RegistrationResponse> => {
    try {
      console.log('Making POST request to:', `${API_BASE_URL}/registrations/ibb`);
      console.log('Payload:', payload);
      const response = await api.post('/registrations/ibb', payload);
      return {
        success: true,
        message: 'Registration successful',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      
      // Return the full error response structure
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.error || 'Registration failed. Please try again.',
        error: error.response?.data?.error,
        code: error.response?.data?.code,
        statusCode: error.response?.data?.statusCode,
        data: error.response?.data?.data
      };
    }
  },

  // Update existing registration
  updateRegistration: async (payload: UpdateRegistrationPayload): Promise<RegistrationResponse> => {
    try {
      console.log('Making PUT request to:', `${API_BASE_URL}/registrations/ibb/update`);
      console.log('Payload:', payload);
      const response = await api.put('/registrations/ibb/update', payload);
      return {
        success: true,
        message: 'Registration updated successfully',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Update registration error:', error);
      console.error('Error response:', error.response?.data);
      
      // Return the full error response structure
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.error || 'Update failed. Please try again.',
        error: error.response?.data?.error,
        code: error.response?.data?.code,
        statusCode: error.response?.data?.statusCode,
        data: error.response?.data?.data
      };
    }
  },
};

export default registrationApi;
