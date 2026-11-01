/**
 * Example usage of the RegistrationModal with API integration
 * 
 * This file demonstrates how to use the updated RegistrationModal component
 * with the new API endpoints for registration.
 */

import { registrationApi, type RegistrationPayload, type UpdateRegistrationPayload } from '@/services/registrationApi';

// Example: Creating a new registration
export const createRegistrationExample = async () => {
  const registrationData: RegistrationPayload = {
    email: "john.doe@example.com",
    name: "John Doe",
    personalPhoneNumber: "+255748111183",
    officePhoneNumber: "+255222123456",
    personalEmail: "john.personal@gmail.com",
    companyName: "Tech Solutions Ltd",
    role: "Software Engineer",
    registrationType: "Individual",
    sponsorPartner: "No",
    expectations: "Looking forward to learning about new technologies and networking with industry professionals.",
    paymentTerms: "Pay Now",
    eventId: "7a6b32d0-3332-4e1c-88cc-8ee73569d633"
  };

  try {
    const response = await registrationApi.createRegistration(registrationData);
    
    if (response.success) {
      console.log('Registration successful:', response.data);
      // Handle success - show success message, redirect, etc.
    } else {
      console.error('Registration failed:', response.message);
      // Handle error - show error message to user
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    // Handle unexpected errors
  }
};

// Example: Updating an existing registration
export const updateRegistrationExample = async () => {
  const updateData: UpdateRegistrationPayload = {
    id: "registration-id-here", // You might need to store this after creation
    email: "john.doe@example.com",
    name: "John Doe",
    personalPhoneNumber: "+255748111184", // Updated phone number
    companyName: "Tech Solutions Ltd",
    role: "Senior Software Engineer", // Updated role
    expectations: "Updated expectations for the event.",
    paymentTerms: "Pay Later" // Changed payment terms
  };

  try {
    const response = await registrationApi.updateRegistration(updateData);
    
    if (response.success) {
      console.log('Registration updated successfully:', response.data);
      // Handle success
    } else {
      console.error('Update failed:', response.message);
      // Handle error
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    // Handle unexpected errors
  }
};

// Example: Using the RegistrationModal component
export const RegistrationModalUsageExample = () => {
  // This is how you would use the RegistrationModal in a React component
  const eventData = {
    id: "7a6b32d0-3332-4e1c-88cc-8ee73569d633", // Default event ID
    title: "Tech Innovation Summit 2025",
    date: "November 20, 2025",
    location: "Dar es Salaam, Tanzania",
    isFree: false,
    requirements: [
      "Valid ID required",
      "Business card for networking",
      "Laptop for workshops"
    ]
  };

  return {
    // The modal props with eventId
    modalPropsWithEventId: {
      isOpen: true, // This would come from your state management
      onClose: () => {}, // Your close handler
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventLocation: eventData.location,
      isFree: eventData.isFree,
      requirements: eventData.requirements,
      eventId: eventData.id // Specific event ID
    },
    
    // The modal props without eventId (will use default)
    modalPropsWithoutEventId: {
      isOpen: true,
      onClose: () => {},
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventLocation: eventData.location,
      isFree: eventData.isFree,
      requirements: eventData.requirements
      // eventId is optional - will use default: "7a6b32d0-3332-4e1c-88cc-8ee73569d633"
    }
  };
};

// Environment configuration example
export const environmentConfig = {
  // Set these in your .env file:
  // VITE_API_BASE_URL=https://your-api-base-url.com
  
  // Or you can set them programmatically:
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://your-api-base-url.com',
  
  // The API endpoints are:
  // POST: {{base_url}}/registrations/ibb
  // PUT: {{base_url}}/registrations/ibb/update
};

export default {
  createRegistrationExample,
  updateRegistrationExample,
  RegistrationModalUsageExample,
  environmentConfig
};
