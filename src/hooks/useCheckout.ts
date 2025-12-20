import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { post, get } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import type { CheckoutFormData } from '@/lib/validators';

interface CheckoutResponse {
  success: boolean;
  data: {
    order: {
      id: string;
      orderNumber: string;
      total: number;
    };
    payment: {
      reference: string;
      expiresAt: string;
      accountNumber: string;
      accountName: string;
      bankName: string;
      amount: number;
    };
  };
}

interface PaymentVerificationResponse {
  success: boolean;
  data: {
    status: 'pending' | 'paid' | 'failed';
    order: {
      id: string;
      orderNumber: string;
    };
  };
}

/**
 * Create order and initiate checkout
 */
export function useCheckout(storeId: string) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const response = await post<CheckoutResponse>(
        `/stores/${storeId}/checkout`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Clear cart after successful checkout
      clearCart();

      // Redirect to payment page
      router.push(`/payment/${data.payment.reference}`);
    },
  });
}

/**
 * Verify payment status
 */
export function useVerifyPayment(reference: string) {
  return useQuery({
    queryKey: ['payment', 'verify', reference],
    queryFn: async () => {
      const response = await get<PaymentVerificationResponse>(
        `/payments/verify/${reference}`
      );
      return response.data;
    },
    enabled: !!reference,
    refetchInterval: (query) => {
      // Stop polling if payment is completed or failed
      const status = query.state.data?.status;
      return status === 'pending' ? 3000 : false; // Poll every 3 seconds
    },
    staleTime: 0, // Always refetch
  });
}

/**
 * Get payment details
 */
export function usePaymentDetails(reference: string) {
  return useQuery({
    queryKey: ['payment', 'details', reference],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          reference: string;
          status: 'pending' | 'paid' | 'failed' | 'expired';
          expiresAt: string;
          accountNumber: string;
          accountName: string;
          bankName: string;
          amount: number;
          order: {
            id: string;
            orderNumber: string;
            total: number;
          };
        };
      }>(`/payments/${reference}`);
      return response.data;
    },
    enabled: !!reference,
  });
}

/**
 * Calculate checkout totals
 */
export function useCheckoutTotals(storeId: string, items: any[]) {
  return useQuery({
    queryKey: ['checkout', 'totals', storeId, items],
    queryFn: async () => {
      const response = await post<{
        success: boolean;
        data: {
          subtotal: number;
          agmFee: number;
          total: number;
        };
      }>(`/stores/${storeId}/checkout/calculate`, { items });
      return response.data;
    },
    enabled: items.length > 0,
  });
}

/**
 * Validate checkout data
 */
export function useValidateCheckout(storeId: string) {
  return useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const response = await post<{
        success: boolean;
        valid: boolean;
        errors?: Record<string, string>;
      }>(`/stores/${storeId}/checkout/validate`, data);
      return response;
    },
  });
}

/**
 * Apply promo code
 */
export function useApplyPromoCode(storeId: string) {
  return useMutation({
    mutationFn: async (promoCode: string) => {
      const response = await post<{
        success: boolean;
        data: {
          code: string;
          discountType: 'percentage' | 'fixed';
          discountValue: number;
          discountAmount: number;
        };
      }>(`/stores/${storeId}/promo-codes/apply`, { code: promoCode });
      return response.data;
    },
  });
}

/**
 * Get delivery fee (if applicable)
 */
export function useDeliveryFee(storeId: string, state: string) {
  return useQuery({
    queryKey: ['delivery', 'fee', storeId, state],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          fee: number;
          estimatedDays: number;
        };
      }>(`/stores/${storeId}/delivery/fee?state=${state}`);
      return response.data;
    },
    enabled: !!state,
  });
}

/**
 * Resend payment notification
 */
export function useResendPaymentNotification(reference: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await post(`/payments/${reference}/resend-notification`);
      return response;
    },
  });
}

/**
 * Cancel payment (before completion)
 */
export function useCancelPayment(reference: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await post(`/payments/${reference}/cancel`);
      return response;
    },
    onSuccess: () => {
      router.push('/cart');
    },
  });
}