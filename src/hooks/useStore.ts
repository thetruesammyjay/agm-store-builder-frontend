import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import type { StoreFormData, StoreUpdateFormData } from '@/lib/validators';

interface Store {
  id: string;
  username: string;
  displayName: string;
  description?: string;
  logoUrl?: string;
  templateId: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  customFonts?: {
    heading: string;
    body: string;
  };
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get store by username (public)
 */
export function useStore(username: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.STORE, username],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: Store }>(
        `/stores/${username}`
      );
      return response.data;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get user's own stores (authenticated)
 */
export function useMyStores() {
  return useQuery({
    queryKey: [QUERY_KEYS.STORES, 'mine'],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: Store[] }>('/stores/my-stores');
      return response.data;
    },
  });
}

/**
 * Create new store
 */
export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StoreFormData) => {
      const response = await post<{ success: boolean; data: Store }>('/stores', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORES] });
    },
  });
}

/**
 * Update store
 */
export function useUpdateStore(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StoreUpdateFormData) => {
      const response = await put<{ success: boolean; data: Store }>(
        `/stores/${storeId}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORE, data.username] });
    },
  });
}

/**
 * Check username availability
 */
export function useCheckUsername(username: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.USERNAME_AVAILABILITY, username],
    queryFn: async () => {
      const response = await get<{ success: boolean; available: boolean }>(
        `/stores/check-username/${username}`
      );
      return response.available;
    },
    enabled: username.length >= 3,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Get store analytics
 */
export function useStoreAnalytics(storeId: string, period: '7d' | '30d' | '90d' = '30d') {
  return useQuery({
    queryKey: [QUERY_KEYS.ANALYTICS, storeId, period],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          views: number;
          orders: number;
          revenue: number;
          conversionRate: number;
          topProducts: Array<{ id: string; name: string; sales: number }>;
        };
      }>(`/stores/${storeId}/analytics?period=${period}`);
      return response.data;
    },
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Toggle store active status
 */
export function useToggleStoreStatus(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isActive: boolean) => {
      const response = await put<{ success: boolean; data: Store }>(
        `/stores/${storeId}/status`,
        { isActive }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STORE, storeId] });
    },
  });
}