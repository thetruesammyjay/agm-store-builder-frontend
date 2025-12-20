/**
 * Analytics tracking utilities for AGM Store Builder
 * Supports Google Analytics 4, Meta Pixel, and custom events
 */

// Event types
export type AnalyticsEvent =
  // Auth events
  | 'signup'
  | 'login'
  | 'logout'
  | 'verify_email'
  | 'verify_phone'
  
  // Store events
  | 'store_created'
  | 'store_updated'
  | 'store_published'
  | 'store_deactivated'
  
  // Product events
  | 'product_created'
  | 'product_updated'
  | 'product_deleted'
  | 'product_viewed'
  
  // Order events
  | 'checkout_started'
  | 'order_placed'
  | 'order_confirmed'
  | 'order_fulfilled'
  | 'order_cancelled'
  
  // Payment events
  | 'payment_initiated'
  | 'payment_completed'
  | 'payment_failed'
  
  // Engagement events
  | 'page_view'
  | 'link_clicked'
  | 'search_performed'
  | 'share_clicked'
  | 'contact_submitted'
  
  // Error tracking
  | 'error';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  category?: string;
  brand?: string;
  quantity?: number;
}

interface OrderData {
  orderId: string;
  total: number;
  currency?: string;
  items?: ProductData[];
}

/**
 * Initialize analytics
 * Call this once in your app initialization
 */
export function initAnalytics() {
  // Google Analytics
  if (window.gtag) {
    console.log('Google Analytics initialized');
  }

  // Meta Pixel
  if (window.fbq) {
    console.log('Meta Pixel initialized');
  }

  // Track initial page view
  trackPageView(window.location.pathname);
}

/**
 * Track custom event
 * 
 * @example
 * ```tsx
 * trackEvent('product_created', {
 *   productId: '123',
 *   category: 'electronics',
 *   price: 5000,
 * });
 * ```
 */
export function trackEvent(eventName: AnalyticsEvent, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('trackCustom', eventName, properties);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties);
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string): void {
  trackEvent('page_view', {
    page_path: url,
    page_title: title || document.title,
  });
}

/**
 * Track signup
 */
export function trackSignup(method: 'email' | 'google' | 'facebook' = 'email'): void {
  trackEvent('signup', { method });
  
  // Meta Pixel standard event
  if (window.fbq) {
    window.fbq('track', 'CompleteRegistration');
  }
}

/**
 * Track login
 */
export function trackLogin(method: 'email' | 'google' | 'facebook' = 'email'): void {
  trackEvent('login', { method });
}

/**
 * Track store creation
 */
export function trackStoreCreated(storeData: {
  storeId: string;
  username: string;
  template: string;
}): void {
  trackEvent('store_created', {
    store_id: storeData.storeId,
    username: storeData.username,
    template: storeData.template,
  });
}

/**
 * Track product view
 */
export function trackProductView(product: ProductData): void {
  trackEvent('product_viewed', {
    product_id: product.id,
    product_name: product.name,
    product_price: product.price,
    product_category: product.category,
  });

  // Google Analytics 4 - Enhanced Ecommerce
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'NGN',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category,
        },
      ],
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'NGN',
    });
  }
}

/**
 * Track add to cart
 */
export function trackAddToCart(product: ProductData): void {
  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'NGN',
      value: product.price * (product.quantity || 1),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
        },
      ],
    });
  }

  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      value: product.price,
      currency: 'NGN',
    });
  }
}

/**
 * Track checkout started
 */
export function trackCheckoutStarted(order: OrderData): void {
  trackEvent('checkout_started', {
    order_id: order.orderId,
    total: order.total,
  });

  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: order.currency || 'NGN',
      value: order.total,
      items: order.items?.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    });
  }

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: order.total,
      currency: order.currency || 'NGN',
      num_items: order.items?.length || 0,
    });
  }
}

/**
 * Track purchase/order completion
 */
export function trackPurchase(order: OrderData): void {
  trackEvent('order_placed', {
    order_id: order.orderId,
    total: order.total,
    currency: order.currency || 'NGN',
  });

  // Google Analytics 4 - Purchase
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: order.orderId,
      value: order.total,
      currency: order.currency || 'NGN',
      items: order.items?.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    });
  }

  // Meta Pixel - Purchase
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: order.total,
      currency: order.currency || 'NGN',
      content_ids: order.items?.map((item) => item.id),
      content_type: 'product',
      num_items: order.items?.length || 0,
    });
  }
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string, results?: number): void {
  trackEvent('search_performed', {
    search_term: searchTerm,
    results: results,
  });

  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }

  if (window.fbq) {
    window.fbq('track', 'Search', {
      search_string: searchTerm,
    });
  }
}

/**
 * Identify user for analytics
 */
export function identifyUser(userId: string, traits?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  // Google Analytics - Set user ID
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      user_id: userId,
    });
  }

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('👤 User identified:', userId, traits);
  }
}

/**
 * Track error
 */
export function trackError(error: Error, context?: Record<string, any>): void {
  trackEvent('error', {
    error_message: error.message,
    error_stack: error.stack,
    ...context,
  });
}

/**
 * Track timing (performance metrics)
 */
export function trackTiming(category: string, variable: string, time: number): void {
  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value: time,
      event_category: category,
    });
  }
}

// TypeScript declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

// Export for use in components
export default {
  init: initAnalytics,
  track: trackEvent,
  page: trackPageView,
  identify: identifyUser,
  signup: trackSignup,
  login: trackLogin,
  productView: trackProductView,
  addToCart: trackAddToCart,
  checkoutStarted: trackCheckoutStarted,
  purchase: trackPurchase,
  search: trackSearch,
  error: trackError,
  timing: trackTiming,
};