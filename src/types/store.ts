/**
 * Store Types
 * Store-related type definitions
 */

/**
 * Store entity
 */
export interface Store {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  templateId: StoreTemplate;
  customColors?: StoreColors;
  customFonts?: StoreFonts;
  socialLinks?: StoreSocialLinks;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Store template options
 */
export type StoreTemplate = 'products' | 'bookings' | 'portfolio';

/**
 * Store custom colors
 */
export interface StoreColors {
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  text?: string;
}

/**
 * Store custom fonts
 */
export interface StoreFonts {
  heading: string;
  body: string;
}

/**
 * Store social media links
 */
export interface StoreSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  website?: string;
}

/**
 * Store creation data
 */
export interface StoreCreate {
  username: string;
  displayName: string;
  description?: string;
  templateId: StoreTemplate;
  customColors?: StoreColors;
  customFonts?: StoreFonts;
}

/**
 * Store update data
 */
export interface StoreUpdate {
  displayName?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  customColors?: StoreColors;
  customFonts?: StoreFonts;
  socialLinks?: StoreSocialLinks;
  isActive?: boolean;
}

/**
 * Store public profile (visible to customers)
 */
export interface StorePublicProfile {
  id: string;
  username: string;
  displayName: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  customColors?: StoreColors;
  customFonts?: StoreFonts;
  socialLinks?: StoreSocialLinks;
  stats?: StorePublicStats;
}

/**
 * Public store statistics
 */
export interface StorePublicStats {
  totalProducts: number;
  totalReviews?: number;
  averageRating?: number;
  joinedDate: string;
}

/**
 * Store analytics data
 */
export interface StoreAnalytics {
  period: '7d' | '30d' | '90d' | 'all';
  views: number;
  uniqueVisitors: number;
  orders: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: TopProduct[];
  revenueByDay: RevenueByDay[];
  ordersByStatus: OrdersByStatus;
}

/**
 * Top selling product
 */
export interface TopProduct {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
}

/**
 * Revenue by day
 */
export interface RevenueByDay {
  date: string;
  revenue: number;
  orders: number;
}

/**
 * Orders grouped by status
 */
export interface OrdersByStatus {
  pending: number;
  confirmed: number;
  fulfilled: number;
  cancelled: number;
}

/**
 * Store settings
 */
export interface StoreSettings {
  general: {
    storeName: string;
    storeDescription: string;
    contactEmail: string;
    contactPhone: string;
  };
  shipping: {
    enabled: boolean;
    freeShippingThreshold?: number;
    estimatedDays: number;
    shippingFee: number;
  };
  payments: {
    acceptCash: boolean;
    acceptTransfer: boolean;
    bankAccount?: string;
  };
  notifications: {
    newOrderEmail: boolean;
    newOrderSms: boolean;
    lowStockAlert: boolean;
    lowStockThreshold: number;
  };
}

/**
 * Store verification status
 */
export interface StoreVerification {
  isVerified: boolean;
  verifiedAt?: string;
  badge?: 'verified' | 'premium' | 'featured';
  documents?: VerificationDocument[];
}

/**
 * Verification document
 */
export interface VerificationDocument {
  id: string;
  type: 'business_registration' | 'id_card' | 'proof_of_address';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  reviewedAt?: string;
}

/**
 * Store subscription plan (for future use)
 */
export interface StoreSubscription {
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  features: string[];
  limits: {
    products: number;
    orders: number;
    storage: number;
  };
}

/**
 * Store metrics
 */
export interface StoreMetrics {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  averageOrderValue: number;
  conversionRate: number;
}

/**
 * Store username availability check
 */
export interface UsernameAvailability {
  available: boolean;
  suggestions?: string[];
}