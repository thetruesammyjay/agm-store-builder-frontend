"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { useAdminStats } from "@/hooks/useAdmin";
import { Wallet, Store, Users, AlertTriangle, TrendingUp, Activity, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  // Fallback data structure for safety
  const safeStats = stats || {
    totalRevenue: 0,
    totalStores: 0,
    activeStores: 0,
    totalUsers: 0,
    pendingPayouts: 0,
    pendingPayoutAmount: 0
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
          <p className="text-gray-500">Monitor system health, revenue, and regulation tasks.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="bg-white">
             <Activity className="mr-2 h-4 w-4 text-green-500" /> System Healthy
           </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Platform Revenue (GMV)" 
          value={formatCurrency(safeStats.totalRevenue)} 
          description="Total value processed"
          icon={Wallet}
          trend="up"
          trendValue="12%"
        />
        <StatsCard 
          title="Active Stores" 
          value={`${safeStats.activeStores} / ${safeStats.totalStores}`} 
          description="Operational vs Total"
          icon={Store}
          trend="neutral"
        />
        <StatsCard 
          title="Registered Users" 
          value={safeStats.totalUsers.toLocaleString()} 
          description="Total sellers on platform"
          icon={Users}
          trend="up"
          trendValue="5%"
        />
        <StatsCard 
          title="Pending Payouts" 
          value={formatCurrency(safeStats.pendingPayoutAmount)} 
          description={`${safeStats.pendingPayouts} requests awaiting approval`}
          icon={AlertTriangle}
          trend={safeStats.pendingPayouts > 0 ? "down" : "neutral"} // Red indicator if work needed
        />
      </div>

      {/* Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Regulation Tasks */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Regulation Tasks</CardTitle>
            <CardDescription>Items requiring immediate admin attention</CardDescription>
          </CardHeader>
          <CardContent>
            {safeStats.pendingPayouts > 0 ? (
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                    <Wallet className="h-6 w-6 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-900">{safeStats.pendingPayouts} Payout Requests</h4>
                    <p className="text-sm text-yellow-700">Totaling {formatCurrency(safeStats.pendingPayoutAmount)}</p>
                  </div>
                </div>
                <Link href="/admin/payouts">
                  <Button className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white border-none">
                    Review Payouts
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                 <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                 </div>
                 <h4 className="font-medium text-slate-900">All Caught Up</h4>
                 <p className="text-sm text-slate-500">No pending payouts or flags requiring attention.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/admin/stores">
              <Button variant="outline" className="w-full justify-start h-12 text-slate-600">
                <Store className="mr-3 h-5 w-5 text-indigo-500" /> Manage Stores
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start h-12 text-slate-600">
                <Users className="mr-3 h-5 w-5 text-blue-500" /> Manage Users
              </Button>
            </Link>
            <Link href="/admin/audit">
              <Button variant="outline" className="w-full justify-start h-12 text-slate-600">
                <ShieldAlert className="mr-3 h-5 w-5 text-red-500" /> Audit Logs
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <Skeleton className="lg:col-span-2 h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}