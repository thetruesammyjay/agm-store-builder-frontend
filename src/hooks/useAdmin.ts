import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, put, post } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/store/notificationStore";

// --- Types ---
export interface AdminStats {
  totalRevenue: number;
  totalStores: number;
  activeStores: number;
  totalUsers: number;
  pendingPayouts: number;
  pendingPayoutAmount: number;
}

export interface AdminStoreList {
  id: string;
  name: string;
  username: string;
  ownerEmail: string;
  status: 'active' | 'suspended';
  revenue: number;
  createdAt: string;
}

export interface PayoutRequest {
  id: string;
  user: { name: string; email: string };
  amount: number;
  bank: { name: string; account: string };
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

// --- Hooks ---

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      // Assumes GET /admin/stats exists
      const response = await get<{ data: AdminStats }>('/admin/stats');
      return response.data;
    },
    refetchInterval: 60000,
  });
}

export function useAdminStores() {
  return useQuery({
    queryKey: ['admin', 'stores'],
    queryFn: async () => {
      const response = await get<{ data: AdminStoreList[] }>('/admin/stores');
      return response.data;
    },
  });
}

export function useAdminPayouts() {
  return useQuery({
    queryKey: ['admin', 'payouts'],
    queryFn: async () => {
      const response = await get<{ data: PayoutRequest[] }>('/admin/payouts?status=pending');
      return response.data;
    },
  });
}

export function useStoreAction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ storeId, action }: { storeId: string; action: 'suspend' | 'activate' }) => {
      return await put(`/admin/stores/${storeId}/status`, { status: action === 'suspend' ? 'suspended' : 'active' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'stores'] });
      toast.success("Store status updated");
    },
    onError: (err: any) => {
      toast.error("Action failed", err.message);
    }
  });
}

export function usePayoutAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payoutId, action }: { payoutId: string; action: 'approve' | 'reject' }) => {
      return await post(`/admin/payouts/${payoutId}/${action}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'payouts'] });
      toast.success("Payout processed");
    },
    onError: (err: any) => {
      toast.error("Action failed", err.message);
    }
  });
}