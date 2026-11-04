import { z } from 'zod';
import axios from 'axios';

// Zod schema for feedback form validation
export const feedbackFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  type: z.string()
    .min(1, 'Feedback type is required'),
  
  message: z.string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  
  eventId: z.string()
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

// API Response types
export interface FeedbackApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    createdAt?: string;
  };
}

// API configuration
// Base URL for the API - uses VITE_BASE_API_URL environment variable
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const feedbackApi = {
  async submitFeedback(data: FeedbackFormData): Promise<FeedbackApiResponse> {
    try {
      // Validate data with Zod
      const validatedData = feedbackFormSchema.parse(data);
      
      // Ensure eventId is properly set (use provided value or empty string)
      const payload = {
        name: validatedData.name,
        email: validatedData.email,
        type: validatedData.type,
        message: validatedData.message,
        eventId: validatedData.eventId || ''
      };
      
      const url = `${API_BASE_URL}/feedbacks`;
      console.log('Feedback API - Submitting to:', url);
      console.log('Feedback API - Data:', JSON.stringify(payload, null, 2));
      
      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token is available
      if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`;
      }
      
      const response = await axios.post<FeedbackApiResponse>(url, payload, {
        headers,
      });
      
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      // Check if the API response indicates success
      if (!response.data.success) {
        throw new Error(response.data.message || 'Feedback submission failed');
      }
      
      console.log('Feedback API - Success response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Feedback API - Error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          console.error('Feedback API - Server error response:', error.response.data);
          console.error('Feedback API - Status:', error.response.status);
          console.error('Feedback API - Status text:', error.response.statusText);
          console.error('Feedback API - Headers:', error.response.headers);
          console.error('Feedback API - Response type:', error.response.headers['content-type']);
          
          // Try to extract error message from response
          let errorMessage = 'Feedback submission failed';
          const responseData = error.response.data;
          
          if (responseData) {
            // Handle plain text responses
            if (typeof responseData === 'string') {
              errorMessage = responseData || error.response.statusText || `Server error: ${error.response.status}`;
            }
            // Handle JSON responses
            else if (typeof responseData === 'object') {
              // Check for nested error object (ZodError format)
              if (responseData.error && typeof responseData.error === 'object') {
                const zodError = responseData.error;
                // Try to extract ZodError message
                if (zodError.message) {
                  try {
                    // Parse ZodError message which might be a JSON string
                    const parsed = typeof zodError.message === 'string' 
                      ? JSON.parse(zodError.message) 
                      : zodError.message;
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      // Extract the first error message
                      const firstError = parsed[0];
                      errorMessage = firstError.message || firstError.path?.join('.') + ' validation failed';
                    } else {
                      errorMessage = zodError.message;
                    }
                  } catch {
                    errorMessage = zodError.message || 'Validation error';
                  }
                } else {
                  errorMessage = 'Validation error: ' + JSON.stringify(zodError);
                }
              } else if (responseData.message) {
                errorMessage = responseData.message;
              } else if (responseData.error) {
                errorMessage = typeof responseData.error === 'string' 
                  ? responseData.error 
                  : JSON.stringify(responseData.error);
              } else if (responseData.errors) {
                // Handle validation errors array
                const errors = Array.isArray(responseData.errors) 
                  ? responseData.errors.map((e: any) => e.message || e).join(', ')
                  : JSON.stringify(responseData.errors);
                errorMessage = errors;
              } else {
                errorMessage = JSON.stringify(responseData);
              }
            }
          } else {
            errorMessage = error.response.statusText || `Server error: ${error.response.status}`;
          }
          
          console.error('Feedback API - Extracted error message:', errorMessage);
          throw new Error(errorMessage);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Feedback API - Network error - no response received');
          throw new Error('Network error: Unable to connect to server');
        }
      }
      
      // Re-throw Zod validation errors or other errors
      throw error;
    }
  }
};

