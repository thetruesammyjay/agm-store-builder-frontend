import { z } from 'zod';
import { RESERVED_USERNAMES, USERNAME_RULES, PASSWORD_RULES, PHONE_RULES } from './constants';

/**
 * Authentication Schemas
 */

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(PHONE_RULES.PATTERN, PHONE_RULES.ERROR_MESSAGE),
  password: z
    .string()
    .min(PASSWORD_RULES.MIN_LENGTH, PASSWORD_RULES.ERROR_MESSAGES.TOO_SHORT)
    .regex(/[A-Z]/, PASSWORD_RULES.ERROR_MESSAGES.MISSING_UPPERCASE)
    .regex(/[0-9]/, PASSWORD_RULES.ERROR_MESSAGES.MISSING_NUMBER),
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// OTP verification schema
export const otpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'OTP must be 6 digits'),
  type: z.enum(['email', 'phone']),
});

export type OTPFormData = z.infer<typeof otpSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z
    .string()
    .min(PASSWORD_RULES.MIN_LENGTH, PASSWORD_RULES.ERROR_MESSAGES.TOO_SHORT)
    .regex(/[A-Z]/, PASSWORD_RULES.ERROR_MESSAGES.MISSING_UPPERCASE)
    .regex(/[0-9]/, PASSWORD_RULES.ERROR_MESSAGES.MISSING_NUMBER),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Store Schemas
 */

// Username validation
export const usernameSchema = z
  .string()
  .min(USERNAME_RULES.MIN_LENGTH, USERNAME_RULES.ERROR_MESSAGES.TOO_SHORT)
  .max(USERNAME_RULES.MAX_LENGTH, USERNAME_RULES.ERROR_MESSAGES.TOO_LONG)
  .regex(USERNAME_RULES.PATTERN, USERNAME_RULES.ERROR_MESSAGES.INVALID_FORMAT)
  .refine(
    (username) => !RESERVED_USERNAMES.includes(username as any),
    USERNAME_RULES.ERROR_MESSAGES.RESERVED
  );

// Store creation schema
export const storeSchema = z.object({
  username: usernameSchema,
  displayName: z.string().min(3, 'Display name must be at least 3 characters'),
  description: z.string().optional(),
  templateId: z.enum(['products', 'bookings', 'portfolio']),
  customColors: z
    .object({
      primary: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
      secondary: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
      accent: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
    })
    .optional(),
  customFonts: z
    .object({
      heading: z.string(),
      body: z.string(),
    })
    .optional(),
});

export type StoreFormData = z.infer<typeof storeSchema>;

// Store update schema (all fields optional)
export const storeUpdateSchema = z.object({
  displayName: z.string().min(3).optional(),
  description: z.string().optional(),
  logoUrl: z.string().url().optional(),
  customColors: z
    .object({
      primary: z.string().regex(/^#[0-9A-F]{6}$/i),
      secondary: z.string().regex(/^#[0-9A-F]{6}$/i),
      accent: z.string().regex(/^#[0-9A-F]{6}$/i),
    })
    .optional(),
  customFonts: z
    .object({
      heading: z.string(),
      body: z.string(),
    })
    .optional(),
  isActive: z.boolean().optional(),
});

export type StoreUpdateFormData = z.infer<typeof storeUpdateSchema>;

/**
 * Product Schemas
 */

// Product variation schema
export const productVariationSchema = z.object({
  name: z.string().min(1, 'Variation name is required'),
  options: z.array(z.string()).min(1, 'At least one option is required'),
});

// Product creation schema
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().optional(),
  price: z.number().min(1, 'Price must be greater than 0'),
  compareAtPrice: z.number().optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  variations: z.array(productVariationSchema).optional(),
  stockQuantity: z.number().min(0, 'Stock cannot be negative'),
  isActive: z.boolean().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

// Product update schema (all fields optional)
export const productUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  price: z.number().min(1).optional(),
  compareAtPrice: z.number().optional(),
  images: z.array(z.string().url()).optional(),
  variations: z.array(productVariationSchema).optional(),
  stockQuantity: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
});

export type ProductUpdateFormData = z.infer<typeof productUpdateSchema>;

/**
 * Order Schemas
 */

// Order item schema
export const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  selectedVariations: z.record(z.string(), z.string()).optional(),
});

// Customer address schema
export const addressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().optional(),
});

// Checkout/Order creation schema
export const checkoutSchema = z.object({
  customerName: z.string().min(3, 'Name is required'),
  customerPhone: z.string().regex(PHONE_RULES.PATTERN, PHONE_RULES.ERROR_MESSAGE),
  customerEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  customerAddress: addressSchema.optional(),
  items: z.array(orderItemSchema).min(1, 'Cart cannot be empty'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Order status update schema
export const orderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'fulfilled', 'cancelled']),
});

export type OrderStatusFormData = z.infer<typeof orderStatusSchema>;

/**
 * Payment Schemas
 */

// Bank account schema
export const bankAccountSchema = z.object({
  accountNumber: z
    .string()
    .length(10, 'Account number must be 10 digits')
    .regex(/^[0-9]+$/, 'Account number must contain only digits'),
  bankCode: z.string().min(3, 'Bank code is required'),
});

export type BankAccountFormData = z.infer<typeof bankAccountSchema>;

/**
 * Settings Schemas
 */

// Profile update schema
export const profileUpdateSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().regex(PHONE_RULES.PATTERN, PHONE_RULES.ERROR_MESSAGE).optional(),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

// Password change schema
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(PASSWORD_RULES.MIN_LENGTH, PASSWORD_RULES.ERROR_MESSAGES.TOO_SHORT)
      .regex(/[A-Z]/, PASSWORD_RULES.ERROR_MESSAGES.MISSING_UPPERCASE)
      .regex(/[0-9]/, PASSWORD_RULES.ERROR_MESSAGES.MISSING_NUMBER),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

/**
 * Search & Filter Schemas
 */

// Product filter schema
export const productFilterSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(['price', 'name', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type ProductFilterData = z.infer<typeof productFilterSchema>;

// Order filter schema - UPDATED WITH SEARCH
export const orderFilterSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(), // Added search field
  status: z.enum(['pending', 'confirmed', 'fulfilled', 'cancelled']).optional(),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type OrderFilterData = z.infer<typeof orderFilterSchema>;

/**
 * File Upload Schema
 */

export const imageUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP images are allowed'
    ),
  type: z.enum(['logo', 'product', 'banner']).optional(),
});

export type ImageUploadData = z.infer<typeof imageUploadSchema>;

/**
 * Contact Form Schema
 */

export const contactFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;