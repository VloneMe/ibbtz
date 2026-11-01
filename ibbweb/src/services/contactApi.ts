import { z } from 'zod';
import axios from 'axios';

// Zod schema for contact form validation
export const contactFormSchema = z.object({
  fname: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lname: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  
  company: z.string()
    .min(1, 'Company is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  
  country: z.string()
    .min(1, 'Country is required')
    .min(2, 'Country must be at least 2 characters')
    .max(50, 'Country must be less than 50 characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  subject: z.string()
    .min(1, 'Subject is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject must be less than 100 characters'),
  
  message: z.string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  sentFrom: z.string().min(1, 'Sent from is required')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// API Response types
export interface ContactApiResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    createdAt: string;
  };
}

// API configuration
// In development, use relative URL to go through Vite proxy
// In production, use absolute URL from environment variable
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment ? '/api' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5500/api/v1');

export const contactApi = {
  async submitContact(data: ContactFormData): Promise<ContactApiResponse> {
    try {
      // Validate data with Zod
      const validatedData = contactFormSchema.parse(data);
      
      const url = `${API_BASE_URL}/contacts`;
      console.log('Contact API - Submitting to:', url);
      console.log('Contact API - Data:', validatedData);
      
      const response = await axios.post<ContactApiResponse>(url, validatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      // Check if the API response indicates success
      if (!response.data.success) {
        throw new Error(response.data.message || 'Contact submission failed');
      }
      
      console.log('Contact API - Success response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Contact API - Error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          console.error('Contact API - Server error response:', error.response.data);
          const errorMessage = error.response.data?.message || error.response.statusText;
          throw new Error(`Server error: ${errorMessage}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Contact API - Network error - no response received');
          throw new Error('Network error: Unable to connect to server');
        }
      }
      
      // Re-throw Zod validation errors or other errors
      throw error;
    }
  }
};
