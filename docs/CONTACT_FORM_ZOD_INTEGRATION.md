# Contact Form React Hook Form + Zod Integration

This document describes the integration of React Hook Form with Zod validation in the ContactForm component to work with the provided API endpoint.

## Overview

The ContactForm component has been updated to:
- Use React Hook Form for efficient form state management
- Use Zod for robust form validation with @hookform/resolvers/zod
- Match the API endpoint structure exactly
- Provide better error handling and user feedback
- Support both built-in API calls and custom submission handlers
- Optimize re-renders and improve performance

## API Endpoint

**POST** `{{base_url}}/contacts`

**Request Body:**
```json
{
  "fname": "John",
  "lname": "Doe", 
  "phone": "+1234567890",
  "company": "Acme Inc",
  "country": "USA",
  "email": "john.doe@example.com",
  "subject": "Test",
  "message": "Hello!",
  "sentFrom": "ibb - website"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you soon.",
  "data": {
    "id": "0cdf4123-a262-483a-8bb6-76dff2926999",
    "createdAt": "2025-10-13T02:34:53.387Z"
  }
}
```

## Form Fields

The form now includes all required fields:

1. **First Name** (`fname`) - Required, 2-50 characters
2. **Last Name** (`lname`) - Required, 2-50 characters  
3. **Email** (`email`) - Required, valid email format
4. **Phone** (`phone`) - Required, valid phone number format
5. **Company** (`company`) - Required, 2-100 characters
6. **Country** (`country`) - Required, 2-50 characters
7. **Subject** (`subject`) - Required, 3-100 characters
8. **Message** (`message`) - Required, 10-1000 characters
9. **Sent From** (`sentFrom`) - Auto-set to "website"

## Zod Validation Schema

The validation schema ensures:
- All required fields are present
- Email format is valid
- Phone number format is acceptable
- String lengths are within limits
- Proper error messages for each validation rule

## Usage Examples

### Basic Usage (with built-in API)
```tsx
<ContactForm 
  title="Get in Touch"
  description="We'd love to hear from you."
  useApi={true} // Default behavior
/>
```

### Custom Submission Handler
```tsx
<ContactForm 
  title="Contact Us"
  onSubmit={async (formData) => {
    // Custom logic here
    const response = await contactApi.submitContact(formData);
    console.log('Submission ID:', response.data.id);
    console.log('Message:', response.message);
  }}
  useApi={false}
/>
```

## Environment Configuration

Set the API base URL in your `.env` file:
```
VITE_API_BASE_URL=https://your-api-domain.com
```

If not set, it defaults to `{{base_url}}`.

## Error Handling

The form provides comprehensive error handling:
- Field-level validation errors (displayed under each field)
- API submission errors (displayed as banner messages)
- Network errors with user-friendly messages
- Zod validation errors with specific field feedback
- API response validation (checks for success field)

## Success Handling

The form automatically handles successful submissions:
- Displays the API success message to the user
- Shows the submission ID as a reference
- Resets the form after successful submission
- Provides visual feedback with animations

## Features

- **Real-time validation**: Errors clear as user types
- **Loading states**: Visual feedback during submission
- **Success states**: Confirmation message after successful submission
- **Responsive design**: Works on all screen sizes
- **Accessibility**: Proper labels and ARIA attributes
- **Type safety**: Full TypeScript support with Zod inference

## Dependencies

- `react-hook-form`: For form state management
- `@hookform/resolvers`: For Zod integration with React Hook Form
- `zod`: For schema validation
- `axios`: For API calls
- `framer-motion`: For animations
- `lucide-react`: For icons

## Files Modified/Created

1. **`src/services/contactApi.ts`** - New API service with Zod schema
2. **`src/components/common/ContactForm.tsx`** - Updated form component with React Hook Form
3. **`src/examples/contact-form-usage.ts`** - Usage examples
4. **`package.json`** - Added zod and @hookform/resolvers dependencies
