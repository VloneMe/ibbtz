import axios, { AxiosError } from 'axios';
import ibb1 from '@/assets/photos/audience.jpg';
import ibb2 from '@/assets/photos/networking-1.jpg';
import ibb3 from '@/assets/photos/presentation.jpg';
import ibb4 from '@/assets/photos/networking-2.jpg';
import ibb5 from '@/assets/photos/networking-3.jpg';
import ibb6 from '@/assets/photos/group.jpg';
import ibb7 from '@/assets/photos/speaker.jpg';
import ibb14 from '@/assets/ibb14.jpeg';
import ibbV1 from '@/assets/ibbV1.jpeg';

// API Response interfaces
interface APIMediaItem {
  id: string;
  title: string;
  type: string;
  isPublic: boolean;
  url: string;
  eventId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  event: {
    id: string;
    title: string;
    category: string;
  };
  user: {
    id: string;
    fname: string;
    lname: string;
    email: string;
  };
}

interface APIResponse {
  success: boolean;
  data: {
    media: APIMediaItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

// Client-side interfaces (transformed from API)
export interface MediaItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  alt?: string;
  url?: string;
  eventTitle?: string;
  eventId?: string;
}

export interface GalleryResponse {
  data: MediaItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface GalleryFilters {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  type?: string;
  isPublic?: boolean;
  eventId?: string;
}

// Transform API media item to client media item
const transformMediaItem = (apiItem: APIMediaItem): MediaItem => {
  return {
    id: apiItem.id,
    src: apiItem.url,
    url: apiItem.url,
    title: apiItem.title,
    description: `Event: ${apiItem.event?.title || 'Unknown Event'}`,
    category: apiItem.event?.category || 'Uncategorized',
    date: apiItem.createdAt,
    alt: apiItem.title,
    eventTitle: apiItem.event?.title,
    eventId: apiItem.eventId,
  };
};

// Fetch media from API with pagination and filtering using Axios
export const fetchGalleryMedia = async (filters: GalleryFilters = {}): Promise<GalleryResponse> => {
  try {
    // Use relative URL in development to leverage Vite proxy
    // This avoids CORS issues by routing through the same origin
    const baseUrl = import.meta.env.VITE_BASE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    // console.log('Gallery API - Base URL:', baseUrl);
    // console.log('Gallery API - API Token:', apiToken);
    
    // Build query parameters
    const params: Record<string, string | number | boolean> = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      type: filters.type || 'image',
      isPublic: filters.isPublic !== undefined ? filters.isPublic : true,
    };
    
    if (filters.search) {
      params.search = filters.search;
    }
    
    if (filters.category && filters.category !== 'all') {
      params.search = filters.category; // API uses search for category filtering
    }
    
    if (filters.eventId) {
      params.eventId = filters.eventId;
    }
    
    // Make API request with axios
    const response = await axios.get<APIResponse>(`${baseUrl}/media`, {
      params,
      headers: {
        'Authorization': apiToken ? `Bearer ${apiToken}` : undefined,
        'Content-Type': 'application/json',
      },
    });
    
    // Check if response is successful
    if (response.data.success && response.data.data) {
      const { media, pagination } = response.data.data;
      
      // Transform API media items to client format
      const transformedMedia = media.map(transformMediaItem);
      
      return {
        data: transformedMedia,
        pagination: {
          currentPage: pagination.page,
          totalPages: pagination.pages,
          totalItems: pagination.total,
          itemsPerPage: pagination.limit,
          hasNextPage: pagination.page < pagination.pages,
          hasPreviousPage: pagination.page > 1,
        },
      };
    }
    
    // Fallback: return empty response
    return {
      data: [],
      pagination: {
        currentPage: filters.page || 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: filters.limit || 20,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  } catch (error) {
    console.error('Error fetching gallery media:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios error details:', {
        message: axiosError.message,
        response: axiosError.response?.data,
        status: axiosError.response?.status,
      });
    }
    
    throw error;
  }
};

// Get media URL helper
export const getMediaUrl = (mediaItem: MediaItem): string => {
  // In development, use relative URLs to leverage Vite proxy and avoid CORS
  const isDevelopment = import.meta.env.DEV;
  const imgUrl = isDevelopment ? '' : (import.meta.env.VITE_IMG_URL || import.meta.env.VITE_BASE_API_URL);
  
  // If the item has a url property, use it with the base URL
  if (mediaItem.url) {
    // If URL is already a full HTTP/HTTPS URL
    if (mediaItem.url.startsWith('http://') || mediaItem.url.startsWith('https://')) {
      // In development, if it's pointing to localhost:5500, convert to proxy path
      if (isDevelopment && mediaItem.url.includes('localhost:5500')) {
        const urlPath = new URL(mediaItem.url).pathname;
        return urlPath;
      }
      return mediaItem.url;
    }
    
    // If URL is a Vite import (starts with /@fs/ or /src/ or has been processed by Vite)
    // These are already processed by Vite's import system, return as-is
    if (mediaItem.url.startsWith('/@') || mediaItem.url.includes('/assets/')) {
      return mediaItem.url;
    }
    
    // If URL starts with /, prepend the base URL (or return relative in dev)
    if (mediaItem.url.startsWith('/')) {
      return isDevelopment ? mediaItem.url : `${imgUrl}${mediaItem.url}`;
    }
    
    // Otherwise, append the URL to the base URL
    return isDevelopment ? `/${mediaItem.url}` : `${imgUrl}/${mediaItem.url}`;
  }
  
  // Fallback to src property
  if (mediaItem.src) {
    // If src is already a full HTTP/HTTPS URL
    if (mediaItem.src.startsWith('http://') || mediaItem.src.startsWith('https://')) {
      // In development, if it's pointing to localhost:5500, convert to proxy path
      if (isDevelopment && mediaItem.src.includes('localhost:5500')) {
        const urlPath = new URL(mediaItem.src).pathname;
        return urlPath;
      }
      return mediaItem.src;
    }
    
    // If src is a Vite import (starts with /@fs/ or /src/ or has been processed by Vite)
    if (mediaItem.src.startsWith('/@') || mediaItem.src.includes('/assets/')) {
      return mediaItem.src;
    }
    
    // If src starts with /, prepend the base URL (or return relative in dev)
    if (mediaItem.src.startsWith('/')) {
      return isDevelopment ? mediaItem.src : `${imgUrl}${mediaItem.src}`;
    }
    
    return isDevelopment ? `/${mediaItem.src}` : `${imgUrl}/${mediaItem.src}`;
  }
  
  // Final fallback - return a placeholder
  return '/placeholder-image.jpg';
};

// Download media helper
export const downloadMedia = (mediaItem: MediaItem): void => {
  const link = document.createElement('a');
  link.href = getMediaUrl(mediaItem);
  link.download = `${mediaItem.title || 'media-download'}.jpg`;
  link.click();
};

// Get unique categories from media items
export const getCategories = (mediaItems: MediaItem[]): string[] => {
  const categories = new Set(mediaItems.map(item => item.category).filter(Boolean) as string[]);
  return ['all', ...Array.from(categories)];
};

// Mock data for development/fallback
const mockMediaData: MediaItem[] = [
  {
    id: '1',
    src: ibb1,
    url: ibb1,
    title: "Impact Business Breakfast 2023",
    description: "Keynote speakers and networking sessions",
    category: "Conference",
    date: "2023-12-01",
    alt: "Impact Business Breakfast 2023"
  },
  {
    id: '2',
    src: ibb2,
    url: ibb2,
    title: "Industry Leaders Panel",
    description: "Discussion on economic development strategies",
    category: "Conference",
    date: "2023-12-01",
    alt: "Industry Leaders Panel"
  },
  {
    id: '3',
    src: ibb3,
    url: ibb3,
    title: "Networking Reception",
    description: "Building connections and partnerships",
    category: "Networking",
    date: "2023-12-01",
    alt: "Networking Reception"
  },
  {
    id: '4',
    src: ibb4,
    url: ibb4,
    title: "Awards Ceremony",
    description: "Recognizing outstanding contributions",
    category: "Awards",
    date: "2023-12-01",
    alt: "Awards Ceremony"
  },
  {
    id: '5',
    src: ibb5,
    url: ibb5,
    title: "Business Leaders Summit",
    description: "Strategic discussions and keynote presentations",
    category: "Conference",
    date: "2023-11-15",
    alt: "Business Leaders Summit"
  },
  {
    id: '6',
    src: ibb6,
    url: ibb6,
    title: "Networking Gala",
    description: "Evening of connections and partnerships",
    category: "Networking",
    date: "2023-11-20",
    alt: "Networking Gala"
  },
  {
    id: '7',
    src: ibb7,
    url: ibb7,
    title: "Innovation Forum",
    description: "Technology and business innovation showcase",
    category: "Conference",
    date: "2023-10-10",
    alt: "Innovation Forum"
  },
  {
    id: '8',
    src: ibb14,
    url: ibb14,
    title: "Workshop Sessions",
    description: "Interactive learning and skill development",
    category: "Workshop",
    date: "2023-12-01",
    alt: "Workshop Sessions"
  },
  {
    id: '9',
    src: ibbV1,
    url: ibbV1,
    title: "Impact Advisory Panel",
    description: "Expert insights on economic development",
    category: "Conference",
    date: "2023-09-15",
    alt: "Impact Advisory Panel"
  },
  {
    id: '10',
    src: ibb1,
    url: ibb1,
    title: "Young Entrepreneurs Forum",
    description: "Supporting the next generation of business leaders",
    category: "Workshop",
    date: "2023-08-25",
    alt: "Young Entrepreneurs Forum"
  },
  {
    id: '11',
    src: ibb2,
    url: ibb2,
    title: "Economic Development Summit",
    description: "Policy makers and business leaders collaboration",
    category: "Conference",
    date: "2023-07-18",
    alt: "Economic Development Summit"
  },
  {
    id: '12',
    src: ibb3,
    url: ibb3,
    title: "Corporate Networking Event",
    description: "Building strategic business relationships",
    category: "Networking",
    date: "2023-06-30",
    alt: "Corporate Networking Event"
  }
];

// Fallback function for when API is not available
export const getMockGalleryData = (filters: GalleryFilters = {}): GalleryResponse => {
  let filteredData = [...mockMediaData];
  
  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.title?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    filteredData = filteredData.filter(item => 
      item.category?.toLowerCase() === filters.category!.toLowerCase()
    );
  }
  
  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredData.length / limit),
      totalItems: filteredData.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < filteredData.length,
      hasPreviousPage: page > 1
    }
  };
};