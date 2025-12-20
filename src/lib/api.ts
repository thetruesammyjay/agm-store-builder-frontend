import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// API client configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
  withCredentials: false,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ error?: { message?: string; code?: string } }>) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-storage');
        
        // Redirect to login if not already there
        if (!window.location.pathname.startsWith('/login')) {
          window.location.href = '/login';
        }
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config?.url);
    }
    
    // Handle 429 Rate Limit
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
    }
    
    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('Server error. Please try again later.');
    }
    
    // Network error (no response)
    if (!error.response) {
      console.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for common API operations

/**
 * GET request
 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.get<T>(url, config);
  return response.data;
}

/**
 * POST request
 */
export async function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.post<T>(url, data, config);
  return response.data;
}

/**
 * PUT request
 */
export async function put<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.put<T>(url, data, config);
  return response.data;
}

/**
 * PATCH request
 */
export async function patch<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.patch<T>(url, data, config);
  return response.data;
}

/**
 * DELETE request
 */
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.delete<T>(url, config);
  return response.data;
}

/**
 * Upload file with multipart/form-data
 */
export async function upload<T>(
  url: string,
  formData: FormData,
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> {
  const response = await api.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
}

/**
 * Get error message from API error
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    );
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Check if error is a specific status code
 */
export function isErrorStatus(error: unknown, status: number): boolean {
  return axios.isAxiosError(error) && error.response?.status === status;
}

export default api;