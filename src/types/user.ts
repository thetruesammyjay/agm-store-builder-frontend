/**
 * User Types
 * User-related type definitions
 */

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User profile (excludes sensitive data)
 */
export interface UserProfile {
  id: string;
  fullName: string;
  avatar?: string;
  bio?: string;
}

/**
 * User settings
 */
export interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    orderUpdates: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
  };
}

/**
 * User authentication state
 */
export interface AuthUser {
  user: User;
  token: string;
  refreshToken?: string;
  expiresAt?: number;
}

/**
 * User registration data
 */
export interface UserRegistration {
  email: string;
  phone: string;
  password: string;
  fullName: string;
  acceptedTerms?: boolean;
}

/**
 * User login credentials
 */
export interface UserLogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * OTP verification data
 */
export interface OtpVerification {
  email?: string;
  phone?: string;
  code: string;
  type: 'email' | 'phone';
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Password change data
 */
export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * User profile update
 */
export interface UserProfileUpdate {
  fullName?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
}

/**
 * User statistics
 */
export interface UserStats {
  totalStores: number;
  activeStores: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  joinedDate: string;
}

/**
 * User activity log
 */
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

/**
 * User notification
 */
export interface UserNotification {
  id: string;
  userId: string;
  type: 'order' | 'payment' | 'system' | 'marketing';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

/**
 * User role (for future admin features)
 */
export type UserRole = 'user' | 'admin' | 'moderator';

/**
 * User status
 */
export type UserStatus = 'active' | 'suspended' | 'banned' | 'deleted';