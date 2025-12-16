"use client";

import { useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet, ShoppingCart, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useDashboardAnalytics } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format";
import type { RealTimeAnalytics } from "@/types";

export default function DashboardPage() {
  const [period, setPeriod] = useState("week");
  const { data, isLoading, error } = useDashboardAnalytics(period);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  // Use the API response directly if available, otherwise default
  // The 'data' from useDashboardAnalytics matches the DashboardData interface
  const stats = data || {
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    revenueByDay: [],
    topProducts: [],
    // We map realTimeAnalytics.recentOrders to what the component expects if needed,
    // but the hook defined in prompt returns DashboardData which doesn't seem to have recentOrders directly
    // based on the interface provided. However, typically dashboard endpoints include it.
    // If your backend endpoint includes it, add it to the interface. 
    // For now, we will pass an empty array if not present to avoid crashes.
    recentOrders: [], 
  };

  // Convert `recentOrders` from analytics if available, or fetch separate if needed.
  // Assuming the backend dashboard endpoint MIGHT include it, or we use a separate hook.
  // For this page, typically one call gathers all overview data.
  // If 'recentOrders' is missing from the DashboardData interface provided in hooks/useAnalytics.ts,
  // we should check if we need to call useOrders separately or update the interface.
  // Based on your previous prompt, DashboardData only had revenueByDay and topProducts.
  // I will use `useOrders` for recent orders to be safe or pass empty [] if utilizing just the analytic hook.
  
  // Actually, to make it robust, let's assume we want to show NO orders if the analytics endpoint doesn't return them
  // rather than making a second blocking call. 
  const recentOrders = (stats as any).recentOrders || [];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Overview of your store&apos;s performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/products/new">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Revenue" 
          value={formatCurrency(stats.totalRevenue)} 
          description="Total earnings"
          icon={Wallet}
          trend="up" 
          trendValue="--" 
        />
        <StatsCard 
          title="Orders" 
          value={stats.totalOrders.toString()} 
          description="Total orders placed"
          icon={ShoppingCart}
          trend="up"
          trendValue="--"
        />
        <StatsCard 
          title="Customers" 
          value={stats.totalCustomers.toString()} 
          description="Unique customers"
          icon={Users}
          trend="neutral"
          trendValue="--"
        />
        <StatsCard 
          title="Avg. Order Value" 
          value={formatCurrency(stats.averageOrderValue)} 
          description="Per transaction"
          icon={TrendingUp}
          trend="neutral"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        
        {/* Chart Section */}
        <div className="col-span-1 lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Revenue Overview</h3>
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-sm border border-gray-200 rounded-md text-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">This Year</option>
            </select>
          </div>
          
          <div className="w-full h-[300px]">
            <RevenueChart data={stats.revenueByDay} />
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="col-span-1 lg:col-span-3">
          <RecentOrders orders={recentOrders} /> 
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[400px] rounded-xl" />
        <Skeleton className="col-span-3 h-[400px] rounded-xl" />
      </div>
    </div>
  );
}