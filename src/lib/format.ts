import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

/**
 * Format currency in Naira
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format currency without symbol
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-NG').format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    
    return format(dateObj, formatStr);
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format date and time
 */
export function formatDateTime(
  date: string | Date,
  formatStr: string = 'MMM dd, yyyy hh:mm a'
): string {
  return formatDate(date, formatStr);
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove +234 prefix and format as (XXX) XXX-XXXX
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('234')) {
    const withoutPrefix = cleaned.slice(3);
    if (withoutPrefix.length === 10) {
      return `(${withoutPrefix.slice(0, 3)}) ${withoutPrefix.slice(3, 6)}-${withoutPrefix.slice(6)}`;
    }
  }
  
  return phone;
}

/**
 * Format Nigerian phone number to international format
 */
export function formatPhoneToInternational(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 234
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `+234${cleaned.slice(1)}`;
  }
  
  // If starts with 234, add +
  if (cleaned.startsWith('234') && cleaned.length === 13) {
    return `+${cleaned}`;
  }
  
  return phone;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format file size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format order number
 */
export function formatOrderNumber(orderNumber: string): string {
  // AGM-2025-001234 format
  return orderNumber.toUpperCase();
}

/**
 * Format duration in milliseconds to human readable
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Format account number (mask middle digits)
 */
export function formatAccountNumber(accountNumber: string): string {
  if (accountNumber.length !== 10) return accountNumber;
  
  return `${accountNumber.slice(0, 3)}****${accountNumber.slice(-3)}`;
}

/**
 * Format card number (mask middle digits)
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (cleaned.length !== 16) return cardNumber;
  
  return `${cleaned.slice(0, 4)} **** **** ${cleaned.slice(-4)}`;
}

/**
 * Format discount percentage
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

/**
 * Format time remaining until expiry
 */
export function formatTimeRemaining(expiryDate: string | Date): string {
  try {
    const expiry = typeof expiryDate === 'string' ? parseISO(expiryDate) : expiryDate;
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
    }
    
    return `${seconds}s remaining`;
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format ISO date to local date string
 */
export function formatToLocalDate(isoDate: string): string {
  try {
    const date = parseISO(isoDate);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format ISO date to local time string
 */
export function formatToLocalTime(isoDate: string): string {
  try {
    const date = parseISO(isoDate);
    return date.toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Invalid time';
  }
}

/**
 * Get initials from name
 */
export function getInitialsFromName(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Pluralize word based on count
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}

/**
 * Format list with commas and "and"
 */
export function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  
  const last = items[items.length - 1];
  const rest = items.slice(0, -1);
  return `${rest.join(', ')}, and ${last}`;
}