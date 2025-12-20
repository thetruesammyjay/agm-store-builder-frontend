import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import type { ProductFormData, ProductFilterData } from '@/lib/validators';

// Define the response structure from the backend
interface ProductResponse {
  success: boolean;
  data: any[]; 
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasMore: boolean;
  };
}

export function useProducts(username: string, filters?: ProductFilterData) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, username, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, String(value));
          }
        });
      }
      // Backend Doc: GET /stores/:username/products
      // Returns { success: true, data: [...], pagination: {...} }
      return await get<ProductResponse>(`/stores/${username}/products?${params.toString()}`);
    },
  });
}

export function useProduct(username: string, productId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, username, productId],
    queryFn: async () => {
      // Backend Doc: GET /stores/:username/products/:productId
      const response = await get<{ success: boolean; data: any }>(
        `/stores/${username}/products/${productId}`
      );
      return response.data;
    },
    enabled: !!productId,
  });
}

export function useCreateProduct(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      // Backend Doc: POST /products
      // Payload must include store_id and use snake_case
      const payload = {
        store_id: storeId,
        name: data.name,
        description: data.description,
        price: data.price,
        compare_price: data.compareAtPrice, // Map to snake_case
        images: data.images,
        stock_quantity: data.stockQuantity, // Map to snake_case
        is_active: data.isActive, // Map to snake_case
        // Add other fields if supported by your form/schema (variants, category, etc.)
        variants: data.variations
      };

      return await post('/products', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
}

export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<ProductFormData>) => {
      // Backend Doc: PUT /products/:productId
      // Map partial updates to snake_case
      const payload: any = { ...data };
      
      if (data.compareAtPrice !== undefined) payload.compare_price = data.compareAtPrice;
      if (data.stockQuantity !== undefined) payload.stock_quantity = data.stockQuantity;
      if (data.isActive !== undefined) payload.is_active = data.isActive;
      if (data.variations !== undefined) payload.variants = data.variations;
      
      // Cleanup frontend specific keys that were mapped
      delete payload.compareAtPrice;
      delete payload.stockQuantity;
      delete payload.isActive;
      delete payload.variations;

      return await put(`/products/${productId}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, productId] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      // Backend Doc: DELETE /products/:productId
      return await del(`/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
}