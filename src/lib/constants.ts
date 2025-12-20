/**
 * Application-wide constants
 */

// API Configuration - Updated to match Backend Port 5000
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Application URLs
export const APP_CONFIG = {
  NAME: 'AGM Store Builder',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  DOMAIN: 'shopwithagm.com',
  SUPPORT_EMAIL: 'support@shopwithagm.com',
  SUPPORT_PHONE: '+234 800 123 4567',
} as const;

// Reserved usernames that cannot be used for stores
export const RESERVED_USERNAMES = [
  'www',
  'api',
  'admin',
  'support',
  'help',
  'dashboard',
  'app',
  'blog',
  'mail',
  'ftp',
  'ssh',
  'cdn',
  'assets',
  'static',
  'media',
  'about',
  'contact',
  'privacy',
  'terms',
  'pricing',
  'features',
  'demo',
  'test',
  'dev',
  'staging',
  'production',
  'login',
  'signup',
  'register',
  'auth',
  'oauth',
  'settings',
  'account',
  'profile',
  'store',
  'shop',
  'cart',
  'checkout',
  'payment',
  'order',
  'orders',
  'product',
  'products',
  'agm',
  'shopwithagm',
] as const;

// Username validation rules
export const USERNAME_RULES = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  PATTERN: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  ERROR_MESSAGES: {
    TOO_SHORT: 'Username must be at least 3 characters',
    TOO_LONG: 'Username must be less than 30 characters',
    INVALID_FORMAT: 'Username can only contain lowercase letters, numbers, and hyphens',
    RESERVED: 'This username is reserved',
    TAKEN: 'This username is already taken',
  },
} as const;

// Password validation rules
export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_NUMBER: true,
  PATTERN: /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
  ERROR_MESSAGES: {
    TOO_SHORT: 'Password must be at least 8 characters',
    MISSING_UPPERCASE: 'Password must contain at least one uppercase letter',
    MISSING_NUMBER: 'Password must contain at least one number',
  },
} as const;

// Nigerian phone number format
export const PHONE_RULES = {
  PATTERN: /^\+234[0-9]{10}$/,
  FORMAT_EXAMPLE: '+234XXXXXXXXXX',
  ERROR_MESSAGE: 'Phone must be in format: +234XXXXXXXXXX',
} as const;

// File upload limits
export const UPLOAD_LIMITS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  },
  LOGO: {
    MAX_SIZE: 2 * 1024 * 1024, // 2MB
    ACCEPTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'],
    ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.svg'],
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ACCEPTED_FORMATS: ['application/pdf', 'application/msword'],
    ACCEPTED_EXTENSIONS: ['.pdf', '.doc', '.docx'],
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Order status options
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  FULFILLED: 'fulfilled',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

// Payment status options
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

// Store template options
export const STORE_TEMPLATES = {
  PRODUCTS: 'products',
  BOOKINGS: 'bookings',
  PORTFOLIO: 'portfolio',
} as const;

export type StoreTemplate = (typeof STORE_TEMPLATES)[keyof typeof STORE_TEMPLATES];

// AGM fee percentage
export const AGM_FEE_PERCENTAGE = 0.01; // 1%

// Payment expiry time (30 minutes)
export const PAYMENT_EXPIRY_MINUTES = 30;

// OTP expiry time (10 minutes)
export const OTP_EXPIRY_MINUTES = 10;

// Session timeout (7 days)
export const SESSION_TIMEOUT_DAYS = 7;

// Nigerian banks (common ones for quick reference)
export const NIGERIAN_BANKS = [
  { name: 'Access Bank', code: '044' },
  { name: 'Citibank', code: '023' },
  { name: 'Ecobank', code: '050' },
  { name: 'Fidelity Bank', code: '070' },
  { name: 'First Bank', code: '011' },
  { name: 'First City Monument Bank (FCMB)', code: '214' },
  { name: 'Guaranty Trust Bank (GTBank)', code: '058' },
  { name: 'Heritage Bank', code: '030' },
  { name: 'Keystone Bank', code: '082' },
  { name: 'Polaris Bank', code: '076' },
  { name: 'Providus Bank', code: '101' },
  { name: 'Stanbic IBTC Bank', code: '221' },
  { name: 'Standard Chartered Bank', code: '068' },
  { name: 'Sterling Bank', code: '232' },
  { name: 'Union Bank', code: '032' },
  { name: 'United Bank for Africa (UBA)', code: '033' },
  { name: 'Unity Bank', code: '215' },
  { name: 'Wema Bank', code: '035' },
  { name: 'Zenith Bank', code: '057' },
] as const;

// Nigerian states
export const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
] as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  AUTH_STORAGE: 'auth-storage',
  CART_STORAGE: 'cart-storage',
  THEME: 'theme',
  RECENT_SEARCHES: 'recent-searches',
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  USER: 'user',
  STORE: 'store',
  STORES: 'stores',
  PRODUCT: 'product',
  PRODUCTS: 'products',
  ORDER: 'order',
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  ANALYTICS: 'analytics',
  BANK_ACCOUNTS: 'bank-accounts',
  BANKS: 'banks',
  USERNAME_AVAILABILITY: 'username-availability',
} as const;

// Toast duration (milliseconds)
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY: '/verify',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  ORDERS: '/dashboard/orders',
  CUSTOMERS: '/dashboard/customers',
  ANALYTICS: '/dashboard/analytics',
  SETTINGS: '/dashboard/settings',
  ONBOARDING: '/onboarding',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/agmstorebuilder',
  TWITTER: 'https://twitter.com/agmstorebuilder',
  INSTAGRAM: 'https://instagram.com/agmstorebuilder',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  GENERIC: 'An unexpected error occurred. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Logged in successfully!',
  SIGNUP: 'Account created successfully!',
  LOGOUT: 'Logged out successfully!',
  PRODUCT_CREATED: 'Product created successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  PRODUCT_DELETED: 'Product deleted successfully!',
  ORDER_UPDATED: 'Order updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  IMAGE_UPLOADED: 'Image uploaded successfully!',
} as const;