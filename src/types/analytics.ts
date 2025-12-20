/**
 * Analytics Types
 * Analytics and reporting type definitions
 */

/**
 * Dashboard analytics
 */
export interface DashboardAnalytics {
  overview: AnalyticsOverview;
  revenue: RevenueAnalytics;
  orders: OrderAnalytics;
  products: ProductAnalytics;
  customers: CustomerAnalytics;
  traffic: TrafficAnalytics;
}

/**
 * Analytics overview
 */
export interface AnalyticsOverview {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  averageOrderValue: number;
  aovGrowth: number;
}

/**
 * Revenue analytics
 */
export interface RevenueAnalytics {
  current: number;
  previous: number;
  growth: number;
  growthPercentage: number;
  byDay: TimeSeriesData[];
  byMonth: TimeSeriesData[];
  byProduct: ProductRevenueData[];
  byCategory?: CategoryRevenueData[];
}

/**
 * Time series data point
 */
export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

/**
 * Product revenue data
 */
export interface ProductRevenueData {
  productId: string;
  productName: string;
  productImage: string;
  revenue: number;
  units: number;
  percentage: number;
}

/**
 * Category revenue data
 */
export interface CategoryRevenueData {
  category: string;
  revenue: number;
  orders: number;
  percentage: number;
}

/**
 * Order analytics
 */
export interface OrderAnalytics {
  total: number;
  pending: number;
  confirmed: number;
  fulfilled: number;
  cancelled: number;
  byStatus: StatusDistribution[];
  byDay: TimeSeriesData[];
  averageValue: number;
  completionRate: number;
  cancellationRate: number;
}

/**
 * Status distribution
 */
export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
  color?: string;
}

/**
 * Product analytics
 */
export interface ProductAnalytics {
  totalProducts: number;
  activeProducts: number;
  inStockProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  topSelling: TopSellingProduct[];
  lowPerforming: LowPerformingProduct[];
  byCategory?: ProductsByCategory[];
}

/**
 * Top selling product
 */
export interface TopSellingProduct {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
  views: number;
  conversionRate: number;
}

/**
 * Low performing product
 */
export interface LowPerformingProduct {
  id: string;
  name: string;
  image: string;
  views: number;
  sales: number;
  conversionRate: number;
}

/**
 * Products by category
 */
export interface ProductsByCategory {
  category: string;
  count: number;
  percentage: number;
}

/**
 * Customer analytics
 */
export interface CustomerAnalytics {
  total: number;
  new: number;
  returning: number;
  repeatRate: number;
  averageOrderValue: number;
  lifetimeValue: number;
  byLocation: CustomerByLocation[];
  topCustomers: TopCustomer[];
}

/**
 * Customer by location
 */
export interface CustomerByLocation {
  state: string;
  customers: number;
  orders: number;
  revenue: number;
}

/**
 * Top customer
 */
export interface TopCustomer {
  name: string;
  phone: string;
  orders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: string;
}

/**
 * Traffic analytics
 */
export interface TrafficAnalytics {
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageSessionDuration: number;
  byDay: TimeSeriesData[];
  bySource: TrafficSource[];
  topPages: TopPage[];
  deviceBreakdown: DeviceBreakdown;
}

/**
 * Traffic source
 */
export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

/**
 * Top page
 */
export interface TopPage {
  path: string;
  title: string;
  views: number;
  uniqueViews: number;
  averageTime: number;
}

/**
 * Device breakdown
 */
export interface DeviceBreakdown {
  mobile: number;
  desktop: number;
  tablet: number;
}

/**
 * Sales report
 */
export interface SalesReport {
  period: DateRange;
  summary: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    growth: number;
  };
  byDay: DailySales[];
  byProduct: ProductSales[];
  byCustomer: CustomerSales[];
  topPerformers: TopPerformer[];
}

/**
 * Date range
 */
export interface DateRange {
  startDate: string;
  endDate: string;
  label?: string;
}

/**
 * Daily sales
 */
export interface DailySales {
  date: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
}

/**
 * Product sales
 */
export interface ProductSales {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
  averagePrice: number;
}

/**
 * Customer sales
 */
export interface CustomerSales {
  customerId?: string;
  customerName: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
}

/**
 * Top performer
 */
export interface TopPerformer {
  id: string;
  name: string;
  type: 'product' | 'category' | 'customer';
  metric: number;
  growth: number;
}

/**
 * Conversion funnel
 */
export interface ConversionFunnel {
  steps: FunnelStep[];
  conversionRate: number;
  dropOffPoints: DropOffPoint[];
}

/**
 * Funnel step
 */
export interface FunnelStep {
  name: string;
  visitors: number;
  percentage: number;
  dropOff: number;
}

/**
 * Drop-off point
 */
export interface DropOffPoint {
  step: string;
  dropOffRate: number;
  reasons?: string[];
}

/**
 * Cohort analysis
 */
export interface CohortAnalysis {
  cohorts: Cohort[];
  retentionRates: number[][];
  averageRetention: number;
}

/**
 * Cohort
 */
export interface Cohort {
  period: string;
  size: number;
  revenue: number;
  retentionRate: number;
}

/**
 * Growth metrics
 */
export interface GrowthMetrics {
  mrr: number; // Monthly Recurring Revenue
  mrrGrowth: number;
  arr: number; // Annual Recurring Revenue
  churnRate: number;
  customerAcquisitionCost: number;
  lifetimeValue: number;
  ltvCacRatio: number;
}

/**
 * Real-time analytics
 */
export interface RealTimeAnalytics {
  activeUsers: number;
  activeOrders: number;
  recentOrders: RecentOrder[];
  liveRevenue: number;
  conversionRate: number;
  topProducts: string[];
}

/**
 * Recent order (for real-time display)
 */
export interface RecentOrder {
  orderNumber: string;
  customerName: string;
  amount: number;
  timestamp: string;
}

/**
 * Analytics comparison
 */
export interface AnalyticsComparison {
  current: AnalyticsPeriod;
  previous: AnalyticsPeriod;
  change: {
    absolute: number;
    percentage: number;
  };
}

/**
 * Analytics period
 */
export interface AnalyticsPeriod {
  startDate: string;
  endDate: string;
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
}

/**
 * Export data request
 */
export interface AnalyticsExportRequest {
  type: 'orders' | 'products' | 'customers' | 'revenue';
  format: 'csv' | 'xlsx' | 'pdf';
  period: DateRange;
  filters?: Record<string, any>;
}