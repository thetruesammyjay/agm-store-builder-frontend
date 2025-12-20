import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import type { BankAccount, NigerianBank, Payout } from '@/types';

/**
 * Get Nigerian banks list
 */
export function useNigerianBanks() {
  return useQuery({
    queryKey: [QUERY_KEYS.BANKS],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: NigerianBank[] }>('/banks');
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - banks rarely change
  });
}

/**
 * Verify bank account
 */
export function useVerifyBankAccount() {
  return useMutation({
    mutationFn: async (data: { accountNumber: string; bankCode: string }) => {
      const response = await post<{
        success: boolean;
        data: {
          accountNumber: string;
          accountName: string;
          bankCode: string;
        };
      }>('/bank-accounts/verify', data);
      return response.data;
    },
  });
}

/**
 * Get user's bank accounts
 */
export function useBankAccounts() {
  return useQuery({
    queryKey: [QUERY_KEYS.BANK_ACCOUNTS],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: BankAccount[] }>(
        '/bank-accounts'
      );
      return response.data;
    },
  });
}

/**
 * Add new bank account
 */
export function useAddBankAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      accountNumber: string;
      accountName: string;
      bankCode: string;
      bankName: string;
    }) => {
      const response = await post<{ success: boolean; data: BankAccount }>(
        '/bank-accounts',
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BANK_ACCOUNTS] });
    },
  });
}

/**
 * Update bank account (set as primary)
 */
export function useUpdateBankAccount(accountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { isPrimary?: boolean }) => {
      const response = await put<{ success: boolean; data: BankAccount }>(
        `/bank-accounts/${accountId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BANK_ACCOUNTS] });
    },
  });
}

/**
 * Delete bank account
 */
export function useDeleteBankAccount(accountId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await del(`/bank-accounts/${accountId}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BANK_ACCOUNTS] });
    },
  });
}

/**
 * Get user's balance
 */
export function useBalance() {
  return useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          available: number;
          pending: number;
          total: number;
          currency: string;
          lastUpdated: string;
        };
      }>('/balance');
      return response.data;
    },
    refetchInterval: 60000, // Refetch every minute
  });
}

/**
 * Get payout history
 */
export function usePayouts() {
  return useQuery({
    queryKey: ['payouts'],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: Payout[] }>('/payouts');
      return response.data;
    },
  });
}

/**
 * Request payout (withdrawal)
 */
export function useRequestPayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { amount: number; bankAccountId: string; description?: string }) => {
      const response = await post<{ success: boolean; data: Payout }>(
        '/payouts',
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}

/**
 * Get single payout details
 */
export function usePayout(payoutId: string) {
  return useQuery({
    queryKey: ['payout', payoutId],
    queryFn: async () => {
      const response = await get<{ success: boolean; data: Payout }>(
        `/payouts/${payoutId}`
      );
      return response.data;
    },
    enabled: !!payoutId,
  });
}

/**
 * Cancel pending payout
 */
export function useCancelPayout(payoutId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await post(`/payouts/${payoutId}/cancel`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
      queryClient.invalidateQueries({ queryKey: ['payout', payoutId] });
    },
  });
}

/**
 * Get transaction history
 */
export function useTransactions(params?: { page?: number; limit?: number; type?: 'credit' | 'debit' }) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));
      if (params?.type) queryParams.append('type', params.type);

      const response = await get<{
        success: boolean;
        data: {
          transactions: Array<{
            id: string;
            type: 'credit' | 'debit';
            amount: number;
            balance: number;
            description: string;
            reference: string;
            status: 'pending' | 'completed' | 'failed';
            createdAt: string;
          }>;
          pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
          };
        };
      }>(`/transactions?${queryParams.toString()}`);
      return response.data;
    },
  });
}

/**
 * Get payment analytics
 */
export function usePaymentAnalytics(period: '7d' | '30d' | '90d' = '30d') {
  return useQuery({
    queryKey: ['payment-analytics', period],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          totalTransactions: number;
          successfulTransactions: number;
          failedTransactions: number;
          totalAmount: number;
          successRate: number;
          averageTransactionValue: number;
          byMethod: Array<{
            method: string;
            count: number;
            amount: number;
            percentage: number;
          }>;
          byDay: Array<{
            date: string;
            transactions: number;
            amount: number;
          }>;
        };
      }>(`/payments/analytics?period=${period}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Resend bank account verification
 */
export function useResendBankVerification(accountId: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await post(`/bank-accounts/${accountId}/resend-verification`);
      return response;
    },
  });
}

/**
 * Get payout fees estimate
 */
export function usePayoutFees() {
  return useQuery({
    queryKey: ['payout-fees'],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          minimumAmount: number;
          maximumAmount: number;
          feePercentage: number;
          fixedFee: number;
        };
      }>('/payouts/fees');
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

/**
 * Calculate payout amount after fees
 */
export function useCalculatePayoutFees(amount: number) {
  return useQuery({
    queryKey: ['payout-fees-calculation', amount],
    queryFn: async () => {
      const response = await get<{
        success: boolean;
        data: {
          amount: number;
          fee: number;
          netAmount: number;
        };
      }>(`/payouts/calculate-fees?amount=${amount}`);
      return response.data;
    },
    enabled: amount > 0,
  });
}