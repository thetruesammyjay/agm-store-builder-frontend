/**
 * Authentication utility functions
 */

import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Store auth token in localStorage
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token);
  }
}

/**
 * Get auth token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
}

/**
 * Remove auth token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-storage'); // Clear Zustand persisted state
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  
  if (!token) {
    return false;
  }
  
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    return decoded.exp > currentTime;
  } catch (error) {
    // Invalid token
    return false;
  }
}

/**
 * Decode JWT token
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Get user ID from token
 */
export function getUserIdFromToken(): string | null {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }
  
  const decoded = decodeToken(token);
  return decoded?.userId || null;
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp <= currentTime;
  } catch (error) {
    return true;
  }
}

/**
 * Get token expiration time in seconds
 */
export function getTokenExpiration(token: string): number | null {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.exp;
  } catch (error) {
    return null;
  }
}

/**
 * Logout user - Clear all auth data
 */
export function logout(): void {
  removeAuthToken();
  
  // Redirect to home page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

/**
 * Redirect to login page
 */
export function redirectToLogin(): void {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const returnUrl = currentPath !== '/login' ? `?returnUrl=${encodeURIComponent(currentPath)}` : '';
    window.location.href = `/login${returnUrl}`;
  }
}

/**
 * Get return URL from query params
 */
export function getReturnUrl(): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('returnUrl') || '/dashboard';
  }
  return '/dashboard';
}