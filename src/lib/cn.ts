import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 * 
 * This utility combines clsx for conditional classes and tailwind-merge
 * to properly handle Tailwind class conflicts.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 * 
 * // Conditional classes
 * cn('px-4', isActive && 'bg-blue-500', !isActive && 'bg-gray-500')
 * 
 * // Override with proper precedence
 * cn('px-4 py-2 bg-blue-500', 'bg-red-500')
 * // => 'px-4 py-2 bg-red-500' (bg-red-500 overrides bg-blue-500)
 * 
 * // With arrays and objects
 * cn(['px-4', 'py-2'], { 'bg-blue-500': isActive })
 * ```
 * 
 * @param inputs - Class names, arrays, objects, or conditional expressions
 * @returns Merged class string with proper Tailwind precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Alternative export for backwards compatibility
 */
export default cn;