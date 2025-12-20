/**
 * Product Types
 * Product-related type definitions
 */

/**
 * Product entity
 */
export interface Product {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variations?: ProductVariation[];
  stockQuantity: number;
  sku?: string;
  category?: string;
  tags?: string[];
  isActive: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product variation (e.g., Size, Color)
 */
export interface ProductVariation {
  name: string;
  options: string[];
}

/**
 * Product creation data
 */
export interface ProductCreate {
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variations?: ProductVariation[];
  stockQuantity: number;
  sku?: string;
  category?: string;
  tags?: string[];
  isActive?: boolean;
}

/**
 * Product update data
 */
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  compareAtPrice?: number;
  images?: string[];
  variations?: ProductVariation[];
  stockQuantity?: number;
  sku?: string;
  category?: string;
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

/**
 * Product with store information
 */
export interface ProductWithStore extends Product {
  store: {
    id: string;
    username: string;
    displayName: string;
    logoUrl?: string;
  };
}

/**
 * Product list filters
 */
export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: 'price' | 'name' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Product card (minimal info for lists)
 */
export interface ProductCard {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  stockQuantity: number;
  isActive: boolean;
  discountPercentage?: number;
}

/**
 * Product variant (specific combination of variations)
 */
export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  stockQuantity: number;
  selectedVariations: Record<string, string>;
  image?: string;
}

/**
 * Product inventory
 */
export interface ProductInventory {
  id: string;
  productId: string;
  stockQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
  lastRestocked?: string;
}

/**
 * Product pricing
 */
export interface ProductPricing {
  basePrice: number;
  salePrice?: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  cost?: number;
  profitMargin?: number;
}

/**
 * Product image
 */
export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
  order: number;
}

/**
 * Product category
 */
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}

/**
 * Product review (for future use)
 */
export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  verified: boolean;
  createdAt: string;
}

/**
 * Product statistics
 */
export interface ProductStats {
  totalViews: number;
  totalSales: number;
  totalRevenue: number;
  averageRating?: number;
  totalReviews?: number;
  conversionRate: number;
}

/**
 * Bulk product operation
 */
export interface BulkProductOperation {
  productIds: string[];
  action: 'activate' | 'deactivate' | 'delete' | 'updatePrice' | 'updateStock';
  data?: {
    price?: number;
    stockQuantity?: number;
  };
}

/**
 * Product import data
 */
export interface ProductImport {
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  stockQuantity: number;
  sku?: string;
  category?: string;
  tags?: string[];
}

/**
 * Product export format
 */
export interface ProductExport {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number;
  stockQuantity: number;
  sku: string;
  category: string;
  tags: string;
  isActive: boolean;
  createdAt: string;
  totalSales: number;
  totalRevenue: number;
}

/**
 * Product availability
 */
export type ProductAvailability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';

/**
 * Product status
 */
export type ProductStatus = 'active' | 'inactive' | 'draft' | 'archived';