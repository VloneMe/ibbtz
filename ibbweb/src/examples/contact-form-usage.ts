// Example usage of the updated ContactForm component with React Hook Form and Zod validation

import { contactApi, type ContactFormData } from '@/services/contactApi';

// Example 1: Using the form with built-in API integration (default behavior)
export const contactFormWithApiProps = {
  title: "Get in Touch",
  description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  useApi: true // This is the default, so you can omit this prop
};

// Example 2: Using the form with custom onSubmit handler
export const contactFormWithCustomHandlerProps = {
  title: "Contact Us",
  description: "Have a question? We're here to help.",
  useApi: false, // Disable built-in API call since we're using custom handler
  onSubmit: async (formData: ContactFormData) => {
    try {
      // Custom logic before API call
      console.log('Submitting contact form:', formData);
      
      // Call the API and get the response
      const response = await contactApi.submitContact(formData);
      
      // Custom logic after successful submission
      console.log('Contact form submitted successfully:', response);
      console.log('Submission ID:', response.data.id);
      console.log('Created at:', response.data.createdAt);
      
      // You could show a custom success message, redirect, etc.
      // The form will automatically display the API success message
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error; // Re-throw to let the form handle the error display
    }
  }
};

// Example 3: Using the form with additional validation
export const contactFormWithAdditionalValidationProps = {
  title: "Business Inquiry",
  description: "For business-related inquiries, please fill out the form below.",
  useApi: false,
  onSubmit: async (formData: ContactFormData) => {
    // Additional custom validation
    if (formData.company.toLowerCase().includes('spam')) {
      throw new Error('Invalid company name');
    }
    
    // Proceed with API call
    await contactApi.submitContact(formData);
  }
};

// Example 4: Accessing API response data
export const contactFormWithResponseHandlingProps = {
  title: "Get in Touch",
  description: "We'll respond within 24 hours.",
  useApi: false,
  onSubmit: async (formData: ContactFormData) => {
    try {
      const response = await contactApi.submitContact(formData);
      
      // Access the API response data
      console.log('Success:', response.success);
      console.log('Message:', response.message);
      console.log('Submission ID:', response.data.id);
      console.log('Created at:', new Date(response.data.createdAt));
      
      // You could store the submission ID in localStorage, send analytics, etc.
      localStorage.setItem('lastContactSubmissionId', response.data.id);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  }
};

// Example 5: Environment configuration
// Make sure to set VITE_API_BASE_URL in your .env file:
// VITE_API_BASE_URL=https://your-api-domain.com

// The contactApi will automatically use this URL, or fall back to '{{base_url}}' if not set
