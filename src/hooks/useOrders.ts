import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { QUERY_KEYS, PAGINATION } from '@/lib/constants';
import type { OrderFilterData, OrderStatusFormData } from '@/lib/validators';

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    selectedVariations?: Record<string, string>;
    subtotal: number; // Added this property to fix the type error
  }>;
  subtotal: number;
  agmFee: number;
  total: number;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

// Updated to match the Backend API response structure
interface BackendOrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * Get orders for a store (with pagination and filters)
 */
export function useOrders(storeId: string, filters?: OrderFilterData) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, storeId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      // Add store_id to query params
      params.append('store_id', storeId);
      
      params.append('page', String(filters?.page ?? PAGINATION.DEFAULT_PAGE));
      params.append('limit', String(filters?.limit ?? PAGINATION.DEFAULT_LIMIT));

      if (filters?.status) params.append('status', filters.status);
      // Map paymentStatus (frontend) to payment_status (backend)
      if (filters?.paymentStatus) params.append('payment_status', filters.paymentStatus);
      if (filters?.startDate) params.append('date_from', filters.startDate); // Map to date_from
      if (filters?.endDate) params.append('date_to', filters.endDate); // Map to date_to
      if (filters?.search) params.append('search', filters.search);

      const response = await get<BackendOrdersResponse>(
        `/orders?${params.toString()}`
      );

      // Transform backend response to match what the UI expects
      return {
        orders: response.data,
        pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.pages
        }
      };
    },
    enabled: !!storeId,
  });
}

/**
 * Get infinite orders (for infinite scroll)
 */
export function useInfiniteOrders(storeId: string, filters?: Omit<OrderFilterData, 'page'>) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ORDERS, 'infinite', storeId, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append('store_id', storeId);
      params.append('page', String(pageParam));
      params.append('limit', String(filters?.limit ?? PAGINATION.DEFAULT_LIMIT));

      if (filters?.status) params.append('status', filters.status);
      if (filters?.paymentStatus) params.append('payment_status', filters.paymentStatus);
      if (filters?.startDate) params.append('date_from', filters.startDate);
      if (filters?.endDate) params.append('date_to', filters.endDate);

      const response = await get<BackendOrdersResponse>(
        `/orders?${params.toString()}`
      );
      
      return {
        orders: response.data,
        pagination: {
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.pages
        }
      };
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!storeId,
  });
}

/**
 * Get single order
 */
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: Order }>(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
}

/**
 * Update order status
 */
export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderStatusFormData) => {
      const response = await put<{ success: boolean; data: Order }>(
        `/orders/${orderId}/status`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER, orderId] });
    },
  });
}

/**
 * Get order statistics
 */
export function useOrderStats(storeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, 'stats', storeId],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          total: number;
          pending: number;
          confirmed: number;
          fulfilled: number;
          cancelled: number;
          revenue: number;
          averageOrderValue: number;
          totalCustomers: number;
        };
      }>(`/analytics/orders?store_id=${storeId}`); // Updated to use analytics endpoint
      return response.data;
    },
    enabled: !!storeId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Export orders to CSV
 */
export function useExportOrders(storeId: string) {
  return useMutation({
    mutationFn: async (filters?: OrderFilterData) => {
      const params = new URLSearchParams();
      params.append('store_id', storeId);
      
      if (filters?.status) params.append('status', filters.status);
      if (filters?.paymentStatus) params.append('payment_status', filters.paymentStatus);
      if (filters?.startDate) params.append('date_from', filters.startDate);
      if (filters?.endDate) params.append('date_to', filters.endDate);

      // Assuming there is an export endpoint at /orders/export or using params to trigger CSV response
      // Based on typical REST patterns. 
      const response = await get<Blob>(
        `/orders/export?${params.toString()}`,
        {
          responseType: 'blob',
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `orders-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}

/**
 * Cancel order
 */
export function useCancelOrder(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reason?: string) => {
      const response = await del<{ success: boolean; message: string }>(
        `/orders/${orderId}`
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER, orderId] });
    },
  });
}