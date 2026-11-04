// Example of how to use the Events API
// Replace the placeholder {{url}} in src/pages/Events.tsx with your actual API base URL



// Fetch events from the API
const fetchEvents = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Expected API response format:
interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  edition?: string;
  pricing?: {
    isFree: boolean;
    currency: string;
    regular: { price: number };
  };
}

// Example API response:
/*
const exampleResponse: EventData[] = [
  {
    id: 1,
    title: "Impact Business Breakfast 14th Edition",
    description: "Join us for the 14th edition of our flagship business breakfast event...",
    date: "2025-01-15",
    time: "07:00 AM - 10:00 AM",
    location: "Dar es Salaam, Tanzania",
    image: "https://example.com/event-image.jpg",
    category: "Business Leadership",
    edition: "14th Edition",
    pricing: {
      isFree: false,
      currency: "USD",
      regular: { price: 50 }
    }
  }
];
*/

export { fetchEvents };
export type { EventData };
