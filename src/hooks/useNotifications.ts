import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "system" | "alert";
  unread: boolean;
  createdAt: string;
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      // Assumes GET /notifications endpoint exists on backend
      const response = await api.get("/notifications");
      return response.data.data as Notification[];
    },
    // Poll every 30 seconds for new notifications
    refetchInterval: 30000, 
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id?: string) => {
      // If ID provided, mark one. If not, mark all.
      const endpoint = id ? `/notifications/${id}/read` : "/notifications/read-all";
      await api.patch(endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}