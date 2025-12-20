/**
 * Payment Types
 * Payment-related type definitions
 */

/**
 * Payment entity
 */
export interface Payment {
  id: string;
  orderId: string;
  reference: string;
  monnifyReference?: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  expiresAt: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment status
 */
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired' | 'refunded';

/**
 * Payment method
 */
export type PaymentMethod = 'bank_transfer' | 'card' | 'ussd' | 'wallet';

/**
 * Payment verification response
 */
export interface PaymentVerification {
  status: PaymentStatus;
  order: {
    id: string;
    orderNumber: string;
  };
  payment?: {
    reference: string;
    amount: number;
    paidAt: string;
  };
}

/**
 * Payment details (for customer display)
 */
export interface PaymentDetails {
  reference: string;
  status: PaymentStatus;
  expiresAt: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  amount: number;
  order: {
    id: string;
    orderNumber: string;
    total: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
  timeRemaining?: string;
}

/**
 * Monnify webhook event
 */
export interface MonnifyWebhookEvent {
  eventType: 'SUCCESSFUL_TRANSACTION' | 'FAILED_TRANSACTION' | 'REVERSED_TRANSACTION';
  eventData: {
    transactionReference: string;
    paymentReference: string;
    amountPaid: string;
    totalPayable: string;
    settlementAmount?: string;
    paidOn: string;
    paymentStatus: 'PAID' | 'FAILED' | 'REVERSED';
    paymentDescription?: string;
    currency: string;
    paymentMethod: string;
    product?: {
      type: string;
      reference: string;
    };
    cardDetails?: {
      cardType: string;
      last4: string;
      bin: string;
    };
    accountDetails?: {
      accountName: string;
      accountNumber: string;
      bankCode: string;
      bankName: string;
    };
    customer?: {
      email: string;
      name: string;
    };
  };
}

/**
 * Payment link
 */
export interface PaymentLink {
  reference: string;
  url: string;
  amount: number;
  expiresAt: string;
}

/**
 * Payment analytics
 */
export interface PaymentAnalytics {
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalTransactions: number;
    successfulTransactions: number;
    failedTransactions: number;
    totalAmount: number;
    successRate: number;
    averageTransactionValue: number;
  };
  byMethod: {
    method: PaymentMethod;
    count: number;
    amount: number;
    percentage: number;
  }[];
  byDay: {
    date: string;
    transactions: number;
    amount: number;
  }[];
}

/**
 * Bank account (for payouts)
 */
export interface BankAccount {
  id: string;
  userId: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  isVerified: boolean;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Bank account verification
 */
export interface BankAccountVerification {
  accountNumber: string;
  bankCode: string;
  accountName?: string;
  isValid: boolean;
}

/**
 * Nigerian bank
 */
export interface NigerianBank {
  name: string;
  code: string;
  slug?: string;
  logo?: string;
}

/**
 * Payout (withdrawal)
 */
export interface Payout {
  id: string;
  userId: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: PayoutStatus;
  bankAccountId: string;
  reference: string;
  description?: string;
  processedAt?: string;
  createdAt: string;
}

/**
 * Payout status
 */
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

/**
 * Payout request
 */
export interface PayoutRequest {
  amount: number;
  bankAccountId: string;
  description?: string;
}

/**
 * Balance information
 */
export interface Balance {
  available: number;
  pending: number;
  total: number;
  currency: string;
  lastUpdated: string;
}

/**
 * Transaction (generic)
 */
export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
  createdAt: string;
}

/**
 * Refund
 */
export interface Refund {
  id: string;
  paymentId: string;
  orderId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  reference: string;
  processedAt?: string;
  createdAt: string;
}

/**
 * Refund request
 */
export interface RefundRequest {
  orderId: string;
  amount: number;
  reason: string;
  notes?: string;
}

/**
 * Payment summary
 */
export interface PaymentSummary {
  total: number;
  successful: number;
  failed: number;
  pending: number;
  totalAmount: number;
  successRate: number;
}

/**
 * Payment retry
 */
export interface PaymentRetry {
  orderId: string;
  paymentId: string;
  newReference: string;
  expiresAt: string;
}