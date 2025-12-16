"use client";

import { useState } from "react";
import { RevenueCard } from "@/components/analytics/RevenueCard";
import { OrdersCard } from "@/components/analytics/OrdersCard";
import { CustomersCard } from "@/components/analytics/CustomersCard";
import { ConversionCard } from "@/components/analytics/ConversionCard";
import { SalesChart } from "@/components/analytics/SalesChart";
import { TopProductsChart } from "@/components/analytics/TopProductsChart";
import { TrafficSources } from "@/components/analytics/TrafficSources";
import { CustomerGrowth } from "@/components/analytics/CustomerGrowth";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { ExportReport } from "@/components/analytics/ExportReport";
import { useDashboardAnalytics } from "@/hooks/useAnalytics";
import type { DateRange } from "react-day-picker";

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange | undefined>();
  // Pass date range to hook if backend supports it, otherwise default to 'month'
  const { data, isLoading } = useDashboardAnalytics("month");

  if (isLoading) {
    return <div className="p-10 text-center">Loading analytics...</div>;
  }

  // Mock extended data if not fully available in basic dashboard hook
  const chartData = data?.revenueByDay.map(d => ({ date: d.date, sales: d.revenue })) || [];
  const topProducts = data?.topProducts.map(p => ({ name: p.productName, revenue: p.totalSales })) || [];
  
  // Mocks for visual completeness if API doesn't provide these specific datasets yet
  const trafficData = [
    { name: "Direct", value: 400 },
    { name: "Social (IG)", value: 300 },
    { name: "Social (WhatsApp)", value: 300 },
    { name: "Search", value: 200 },
  ];
  const growthData = [
    { month: "Jan", newCustomers: 40, returningCustomers: 24 },
    { month: "Feb", newCustomers: 30, returningCustomers: 13 },
    { month: "Mar", newCustomers: 20, returningCustomers: 58 },
    { month: "Apr", newCustomers: 27, returningCustomers: 39 },
    { month: "May", newCustomers: 18, returningCustomers: 48 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">Deep dive into your store performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker date={date} setDate={setDate} />
          <ExportReport />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RevenueCard amount={data?.totalRevenue || 0} percentageChange={12} />
        <OrdersCard count={data?.totalOrders || 0} percentageChange={5} />
        <CustomersCard count={data?.totalCustomers || 0} percentageChange={-2} />
        <ConversionCard rate={2.4} percentageChange={0.5} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart data={chartData} />
        <TopProductsChart data={topProducts} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <TrafficSources data={trafficData} />
        <CustomerGrowth data={growthData} />
      </div>
    </div>
  );
}