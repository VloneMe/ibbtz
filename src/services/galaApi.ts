import { z } from 'zod';

// Same-origin in production (nginx proxies /api to the Node API). Override for dev if needed.
const API_BASE = import.meta.env.VITE_GALA_API_URL || '/api';
const TOKEN_KEY = 'ibbplus_admin_token';

export const REGISTRATION_TYPES = ['Individual', 'Corporate Table'] as const;
export const PAYMENT_METHODS = ['Bank transfer', 'Mobile Money'] as const;
export const AMOUNTS = ['Tsh 150,000', 'Tsh 2,000,000'] as const;

export const galaRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(200),
  email: z.string().trim().email('A valid email address is required').max(200),
  phone: z.string().trim().min(7, 'A valid phone number is required').max(40),
  organisation: z.string().trim().min(2, 'Organisation / company is required').max(200),
  jobTitle: z.string().trim().max(200).optional().or(z.literal('')),
  registrationType: z.enum(REGISTRATION_TYPES, { message: 'Please choose a registration type' }),
  paymentMethod: z.enum(PAYMENT_METHODS).optional().or(z.literal('')),
  amount: z.enum(AMOUNTS).optional().or(z.literal('')),
  interests: z.record(z.string(), z.array(z.string())).optional(),
  interestsOther: z.string().trim().max(200).optional().or(z.literal('')),
});
export type GalaRegistrationInput = z.infer<typeof galaRegistrationSchema>;

export interface GalaRegistration {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  organisation: string;
  job_title: string | null;
  registration_type: string;
  payment_method: string | null;
  amount: string | null;
  interests: string | null;
  created_at: string;
}

export interface GalaStats {
  total: number;
  byRegistrationType: Record<string, number>;
  byPaymentMethod: Record<string, number>;
  byAmount: Record<string, number>;
  expectedRevenueTsh: number;
  last7Days: number;
  byQuestion: Record<string, Record<string, number>>;
}

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;
  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(init.headers as Record<string, string>) };
  if (auth) {
    const token = adminAuth.getToken();
    if (!token) throw new ApiError('Not signed in', 401);
    headers.Authorization = `Bearer ${token}`;
  }
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  } catch {
    throw new ApiError('Could not reach the server. Please check your connection and try again.', 0);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (auth && res.status === 401) adminAuth.clear();
    throw new ApiError(body.message || `Request failed (${res.status})`, res.status, body.errors);
  }
  return body as T;
}

export const galaApi = {
  submit: (data: GalaRegistrationInput) =>
    request<{ success: true; message: string; data: { id: number } }>('/gala/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const adminAuth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  isSignedIn: () => !!localStorage.getItem(TOKEN_KEY),
  login: async (password: string) => {
    const res = await request<{ success: true; token: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    localStorage.setItem(TOKEN_KEY, res.token);
  },
};

export const adminApi = {
  list: () => request<{ success: true; stats: GalaStats; data: GalaRegistration[] }>('/admin/registrations', {}, true),
  remove: (id: number) => request<{ success: true }>(`/admin/registrations/${id}`, { method: 'DELETE' }, true),
  csvUrl: () => `${API_BASE}/admin/registrations.csv?token=${encodeURIComponent(adminAuth.getToken() || '')}`,
};
