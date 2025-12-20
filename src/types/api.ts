/**
 * API Response Types
 * Standard response structures for all API calls
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

/**
 * API error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string | string[]>;
  stack?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: PaginationMeta;
  };
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Query parameters for paginated requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Date range filter
 */
export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
}

/**
 * API request configuration
 */
export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

/**
 * File upload response
 */
export interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    publicId?: string;
    format?: string;
    size?: number;
  };
}

/**
 * Bulk operation response
 */
export interface BulkOperationResponse {
  success: boolean;
  data: {
    total: number;
    successful: number;
    failed: number;
    errors?: Array<{
      id: string;
      error: string;
    }>;
  };
}

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * API version info
 */
export interface ApiVersion {
  version: string;
  deprecated?: boolean;
  supportedUntil?: string;
}