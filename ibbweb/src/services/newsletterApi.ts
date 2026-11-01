export interface NewsletterSubscriptionPayload {
  email: string;
}

export interface NewsletterSubscriptionResponse {
  success: boolean;
  error?: string;
  code?: string;
  statusCode?: number;
  timestamp?: string;
  details?: {
    field?: string;
    value?: string;
    currentStatus?: string;
    suggestion?: string;
  };
  message?: string;
  data?: any;
}

class NewsletterApi {
  private baseUrl: string;

  constructor() {
    // Use environment variable or fallback to a default base URL
    this.baseUrl = import.meta.env.VITE_BASE_API_URL;
  }

  async subscribeToNewsletter(payload: NewsletterSubscriptionPayload): Promise<NewsletterSubscriptionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to subscribe to newsletter',
          code: data.code,
          statusCode: data.statusCode,
          timestamp: data.timestamp,
          details: data.details,
          message: data.error || data.message || 'Failed to subscribe to newsletter',
          data: data
        };
      }

      return {
        success: true,
        message: data.message || 'Successfully subscribed to newsletter',
        data: data
      };
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      return {
        success: false,
        message: error.message || 'Network error occurred while subscribing to newsletter',
        data: null
      };
    }
  }
}

export const newsletterApi = new NewsletterApi();
