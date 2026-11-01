# Gallery API Integration Guide

## Overview
The gallery page now uses **axios** to fetch images from the backend API with pagination, search, and filtering capabilities.

---

## API Endpoint

```
GET {{base_url}}/media
```

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `search` - Search term for filtering
- `type` - Media type (default: 'image')
- `isPublic` - Show only public media (default: true)
- `eventId` - Filter by specific event ID

### Example Request
```
GET http://localhost:3000/media?page=1&limit=20&search=Conference&type=image&isPublic=true&eventId=7a6b32d0-3332-4e1c-88cc-8ee73569d633
```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# API Configuration
VITE_BASE_API_URL=http://localhost:3000
VITE_IMG_URL=http://localhost:3000
VITE_API_TOKEN=your_api_token_here

# Example for production:
# VITE_BASE_API_URL=https://api.impactadvisory.co.tz
# VITE_IMG_URL=https://api.impactadvisory.co.tz
# VITE_API_TOKEN=your_production_token_here
```

**Important:** 
- `VITE_BASE_API_URL` - Base URL of your API server
- `VITE_IMG_URL` - URL for serving images (usually same as base URL)
- `VITE_API_TOKEN` - Bearer token for API authentication (optional)

---

## API Response Structure

### Success Response
```json
{
  "success": true,
  "data": {
    "media": [
      {
        "id": "38ad5a8e-773d-4907-9540-47b9e4b6d336",
        "title": "New Event (8)",
        "type": "image",
        "isPublic": true,
        "url": "/uploads/events/7a6b32d0-3332-4e1c-88cc-8ee73569d633/1531f76b-56cb-433d-93ab-f635dd06df9c.webp",
        "eventId": "7a6b32d0-3332-4e1c-88cc-8ee73569d633",
        "userId": "d720cc0d-0d31-41fc-a09e-5121ea52e913",
        "createdAt": "2025-10-11T22:53:43.094Z",
        "updatedAt": "2025-10-11T22:53:43.094Z",
        "event": {
          "id": "7a6b32d0-3332-4e1c-88cc-8ee73569d633",
          "title": "Annual Business Conference 2025",
          "category": "Conference"
        },
        "user": {
          "id": "d720cc0d-0d31-41fc-a09e-5121ea52e913",
          "fname": "John",
          "lname": "Doe",
          "email": "john.doe@example.com"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 416,
      "pages": 21
    }
  }
}
```

---

## Implementation Details

### Files Modified

1. **`src/services/galleryApi.ts`**
   - Added axios import
   - Created interfaces for API response types
   - Implemented `fetchGalleryMedia()` with axios
   - Added transformation function to map API response to client format
   - Updated `getMediaUrl()` to handle relative and absolute URLs
   - Updated mock data structure

### Key Features

✅ **Axios Integration** - Clean HTTP requests with proper error handling  
✅ **Type Safety** - Full TypeScript interfaces for API and client data  
✅ **Data Transformation** - Automatic mapping from API to UI format  
✅ **URL Handling** - Smart URL resolution for images  
✅ **Error Handling** - Detailed axios error logging  
✅ **Pagination Support** - Full pagination with page numbers and metadata  
✅ **Search & Filter** - Category and text search functionality  
✅ **Fallback Data** - Mock data when API is unavailable  

---

## Data Transformation

The API response is automatically transformed to match the UI requirements:

### API Format → Client Format

```typescript
// API Response
{
  id: "uuid-string",
  title: "Event Title",
  url: "/uploads/events/.../image.webp",
  event: {
    title: "Event Name",
    category: "Conference"
  },
  createdAt: "2025-10-11T22:53:43.094Z"
}

// Transformed to:
{
  id: "uuid-string",
  src: "/uploads/events/.../image.webp",
  url: "/uploads/events/.../image.webp",
  title: "Event Title",
  description: "Event: Event Name",
  category: "Conference",
  date: "2025-10-11T22:53:43.094Z",
  alt: "Event Title",
  eventTitle: "Event Name",
  eventId: "event-uuid"
}
```

---

## Usage Example

### Basic Implementation

```tsx
import { fetchGalleryMedia, getMediaUrl } from '@/services/galleryApi';

const MyGallery = () => {
  const [media, setMedia] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetchGalleryMedia({
          page: 1,
          limit: 20,
          search: 'Conference',
          type: 'image',
          isPublic: true
        });
        
        setMedia(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      }
    };

    loadGallery();
  }, []);

  return (
    <div>
      {media.map(item => (
        <img 
          key={item.id}
          src={getMediaUrl(item)}
          alt={item.alt}
        />
      ))}
    </div>
  );
};
```

### With Pagination

```tsx
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  fetchGalleryMedia({
    page: currentPage,
    limit: 20
  }).then(response => {
    setMedia(response.data);
    setPagination(response.pagination);
  });
}, [currentPage]);

// Navigate pages
<button onClick={() => setCurrentPage(prev => prev + 1)}>
  Next Page
</button>
```

### With Search

```tsx
const [searchTerm, setSearchTerm] = useState('');

// Debounced search
useEffect(() => {
  const timeoutId = setTimeout(() => {
    fetchGalleryMedia({
      search: searchTerm,
      page: 1
    }).then(response => {
      setMedia(response.data);
    });
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

---

## Testing

### 1. Test with Mock Data (No API)
If the API is not available, the gallery will automatically fall back to mock data.

### 2. Test with Real API
1. Set environment variables in `.env`
2. Start your API server
3. Run the dev server: `npm run dev`
4. Navigate to the Gallery page

### 3. Test API Endpoint Directly

```bash
# Test the API endpoint
curl "http://localhost:3000/media?page=1&limit=20&type=image&isPublic=true"
```

---

## Troubleshooting

### Images Not Loading
- Check `VITE_BASE_API_URL` and `VITE_IMG_URL` in `.env`
- Verify image URLs in the API response
- Check browser console for CORS errors
- Ensure API server is running

### API Not Responding
- Verify API endpoint URL
- Check API token if authentication is required
- Check network tab in browser DevTools
- Review axios error logs in console

### Wrong Data Structure
- Verify API response matches expected format
- Check data transformation in `transformMediaItem()`
- Review `MediaItem` and `APIMediaItem` interfaces

---

## Advanced Configuration

### Custom Event Filter

```tsx
// Filter by specific event
fetchGalleryMedia({
  eventId: '7a6b32d0-3332-4e1c-88cc-8ee73569d633',
  page: 1,
  limit: 20
});
```

### Custom Headers

Edit `src/services/galleryApi.ts`:

```typescript
const response = await axios.get(`${baseUrl}/media`, {
  params,
  headers: {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
    'X-Custom-Header': 'custom-value', // Add custom headers
  },
});
```

### Retry Logic

```typescript
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});
```

---

## Performance Optimization

### 1. Image Lazy Loading
Images are automatically lazy-loaded in the gallery component.

### 2. Pagination
Use appropriate `limit` values (10-20 recommended).

### 3. Caching
Consider implementing React Query or SWR for automatic caching:

```bash
npm install @tanstack/react-query
```

---

## Security Notes

⚠️ **Never commit `.env` files to version control**  
✅ Add `.env` to `.gitignore`  
✅ Use separate tokens for development and production  
✅ Rotate API tokens regularly  
✅ Use HTTPS in production  

---

## Support

For issues or questions:
- Check the browser console for errors
- Review the API response structure
- Verify environment variables
- Check network requests in DevTools

---

**Last Updated:** October 11, 2025  
**Version:** 1.0  
**Status:** ✅ Production Ready

