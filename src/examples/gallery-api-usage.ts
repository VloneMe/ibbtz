// Example of how to use the Gallery API
// This file demonstrates how to integrate the gallery API service

import { 
  fetchGalleryMedia, 
  getMediaUrl, 
  downloadMedia, 
  getCategories,
  type MediaItem
} from '../services/galleryApi';

// Example: Fetch first page of gallery media
export const fetchFirstPage = async () => {
  try {
    const response = await fetchGalleryMedia({
      page: 1,
      limit: 12
    });
    
    console.log('Gallery data:', response.data);
    console.log('Pagination info:', response.pagination);
    
    return response;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

// Example: Search gallery media
export const searchGallery = async (searchTerm: string) => {
  try {
    const response = await fetchGalleryMedia({
      search: searchTerm,
      page: 1,
      limit: 12
    });
    
    return response;
  } catch (error) {
    console.error('Error searching gallery:', error);
    throw error;
  }
};

// Example: Filter by category
export const filterByCategory = async (category: string) => {
  try {
    const response = await fetchGalleryMedia({
      category: category,
      page: 1,
      limit: 12
    });
    
    return response;
  } catch (error) {
    console.error('Error filtering gallery:', error);
    throw error;
  }
};

// Example: Get media URL for display
export const getMediaDisplayUrl = (mediaItem: MediaItem): string => {
  return getMediaUrl(mediaItem);
};

// Example: Download media
export const downloadMediaFile = (mediaItem: MediaItem): void => {
  downloadMedia(mediaItem);
};

// Example: Get available categories
export const getAvailableCategories = (mediaItems: MediaItem[]): string[] => {
  return getCategories(mediaItems);
};

// Expected API response format:
/*
{
  "data": [
    {
      "id": 1,
      "src": "https://example.com/image1.jpg",
      "url": "images/image1.jpg",
      "title": "Event Photo 1",
      "description": "Description of the event photo",
      "category": "events",
      "date": "2023-12-01",
      "alt": "Event photo alt text"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 12,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
*/

// Example environment variables needed:
// VITE_BASE_API_URL=https://api.impactadvisoryafrica.com/api/v1
// VITE_API_TOKEN=your_api_token_here
// VITE_IMG_URL=https://api.impactadvisoryafrica.com/uploads

// Usage in Gallery.tsx:
// The Gallery component now automatically uses this API service
// No additional configuration needed - just set your environment variables
