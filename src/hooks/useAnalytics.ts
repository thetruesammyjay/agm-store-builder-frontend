import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  totalSales: number;
  unitsSold: number;
}

export interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  revenueByDay: RevenueData[];
  topProducts: TopProduct[];
}

export function useDashboardAnalytics(period: string = 'week', storeId?: string) {
  return useQuery({
    queryKey: ['analytics', period, storeId],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('period', period);
      if (storeId) params.append('store_id', storeId);

      // Fetch data in parallel
      // We use allSettled to prevent one failure from breaking the entire dashboard
      const [dashboardRes, revenueRes, topProductsRes] = await Promise.allSettled([
        api.get(`/analytics/dashboard?${params.toString()}`),
        api.get(`/analytics/revenue?${params.toString()}`),
        api.get(`/analytics/products/top?limit=5${storeId ? `&storeId=${storeId}` : ''}`)
      ]);

      // --- 1. Process Dashboard Overview ---
      let dashboardRaw: any = {};
      if (dashboardRes.status === 'fulfilled') {
        dashboardRaw = dashboardRes.value.data?.data || {};
      }

      // Backend returns flat structure: { totalRevenue, totalOrders, ... }
      // We safely access these, defaulting to 0
      const totalRevenue = Number(dashboardRaw.totalRevenue || 0);
      const totalOrders = Number(dashboardRaw.totalOrders || 0);
      // 'new_customers' might be in a different endpoint, defaulting to 0 if missing
      const totalCustomers = Number(dashboardRaw.new_customers || 0);
      
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;


      // --- 2. Process Revenue/Chart Data ---
      let revenueRaw: any = {};
      if (revenueRes.status === 'fulfilled') {
        revenueRaw = revenueRes.value.data?.data || {};
      }

      // Backend 'getRevenueStats' returns { growth, totalRevenue, ... } but NOT chart data currently.
      // We will safeguard against missing 'chartData'.
      // If backend doesn't provide chart history yet, we return an empty array to prevent crashes.
      const revenueByDay: RevenueData[] = Array.isArray(revenueRaw.chartData) 
        ? revenueRaw.chartData.map((item: any) => ({
            date: item.period || item.date || "N/A", 
            revenue: Number(item.revenue || 0),
            orders: Number(item.orders || 0)
          }))
        : []; 


      // --- 3. Process Top Products ---
      let topProductsRaw: any[] = [];
      if (topProductsRes.status === 'fulfilled') {
        // Backend returns array directly in data
        topProductsRaw = Array.isArray(topProductsRes.value.data?.data) 
          ? topProductsRes.value.data.data 
          : [];
      }

      const topProducts: TopProduct[] = topProductsRaw.map((p: any) => ({
        productId: p.product_id || p.id,
        productName: p.product_name || p.name || "Unknown Product",
        totalSales: Number(p.revenue || 0),
        unitsSold: Number(p.totalSold || p.sales_count || 0)
      }));


      // --- Final Assembly ---
      const transformedData: DashboardData = {
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        revenueGrowth: Number(revenueRaw.growth || 0),
        ordersGrowth: 0, // Placeholder if backend doesn't provide this yet
        revenueByDay,
        topProducts
      };

      return transformedData;
    },
    refetchInterval: 60000, 
    retry: 1,
  });
}