/**
 * Order Types
 * Order-related type definitions
 */

/**
 * Order entity
 */
export interface Order {
  id: string;
  storeId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: OrderAddress;
  items: OrderItem[];
  subtotal: number;
  agmFee: number;
  shippingFee?: number;
  discount?: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Order status
 */
export type OrderStatus = 'pending' | 'confirmed' | 'fulfilled' | 'cancelled';

/**
 * Payment status
 */
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

/**
 * Order item
 */
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  selectedVariations?: Record<string, string>;
  subtotal: number;
}

/**
 * Order address
 */
export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  landmark?: string;
}

/**
 * Checkout data
 */
export interface CheckoutData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: OrderAddress;
  items: CheckoutItem[];
  promoCode?: string;
  notes?: string;
}

/**
 * Checkout item
 */
export interface CheckoutItem {
  productId: string;
  quantity: number;
  selectedVariations?: Record<string, string>;
}

/**
 * Checkout response
 */
export interface CheckoutResponse {
  order: {
    id: string;
    orderNumber: string;
    total: number;
  };
  payment: {
    reference: string;
    expiresAt: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    amount: number;
  };
}

/**
 * Order with store information
 */
export interface OrderWithStore extends Order {
  store: {
    id: string;
    username: string;
    displayName: string;
    logoUrl?: string;
  };
}

/**
 * Order filters
 */
export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Order status update
 */
export interface OrderStatusUpdate {
  status: OrderStatus;
  notes?: string;
}

/**
 * Order statistics
 */
export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  fulfilled: number;
  cancelled: number;
  revenue: number;
  averageOrderValue: number;
  totalCustomers: number;
}

/**
 * Order timeline event
 */
export interface OrderTimelineEvent {
  id: string;
  orderId: string;
  type: 'created' | 'paid' | 'confirmed' | 'fulfilled' | 'cancelled' | 'refunded';
  title: string;
  description: string;
  createdAt: string;
  createdBy?: string;
}

/**
 * Order summary (for lists)
 */
export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customerName: string;
  total: number;
  itemCount: number;
  createdAt: string;
}

/**
 * Order details (complete information)
 */
export interface OrderDetails extends Order {
  timeline: OrderTimelineEvent[];
  payment?: {
    reference: string;
    method: string;
    paidAt?: string;
  };
  store: {
    id: string;
    username: string;
    displayName: string;
    contactPhone: string;
    contactEmail: string;
  };
}

/**
 * Order invoice
 */
export interface OrderInvoice {
  orderNumber: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  store: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  customer: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  items: OrderItem[];
  subtotal: number;
  agmFee: number;
  shippingFee?: number;
  discount?: number;
  total: number;
  notes?: string;
}

/**
 * Order cancellation
 */
export interface OrderCancellation {
  reason: string;
  refundAmount?: number;
  notes?: string;
}

/**
 * Order fulfillment
 */
export interface OrderFulfillment {
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  notes?: string;
}

/**
 * Order export data
 */
export interface OrderExport {
  orderNumber: string;
  date: string;
  status: string;
  paymentStatus: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: string;
  subtotal: number;
  agmFee: number;
  total: number;
}

/**
 * Order notification
 */
export interface OrderNotification {
  orderId: string;
  type: 'new_order' | 'payment_received' | 'status_changed';
  recipient: {
    name: string;
    email?: string;
    phone: string;
  };
  message: string;
  sendEmail: boolean;
  sendSms: boolean;
}

/**
 * Order report
 */
export interface OrderReport {
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    completionRate: number;
  };
  byStatus: OrdersByStatus;
  byDay: Array<{
    date: string;
    orders: number;
    revenue: number;
  }>;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

/**
 * Orders by status
 */
export interface OrdersByStatus {
  pending: number;
  confirmed: number;
  fulfilled: number;
  cancelled: number;
}