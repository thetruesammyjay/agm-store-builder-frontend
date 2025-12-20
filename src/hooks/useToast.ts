import { useNotificationStore, toast as toastHelpers } from '@/store/notificationStore';
import type { ToastType } from '@/store/notificationStore';

/**
 * Hook for displaying toast notifications
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast } = useToast();
 *   
 *   const handleSuccess = () => {
 *     toast.success('Product created!', 'Your product is now live.');
 *   };
 *   
 *   const handleError = () => {
 *     toast.error('Failed to save', 'Please try again.');
 *   };
 * }
 * ```
 */
export function useToast() {
  const { toasts, addToast, removeToast, clearAll } = useNotificationStore();

  return {
    /**
     * All active toasts
     */
    toasts,

    /**
     * Toast helper functions
     */
    toast: {
      /**
       * Show success toast
       */
      success: (title: string, description?: string, duration?: number) => {
        addToast({
          type: 'success',
          title,
          description,
          duration,
        });
      },

      /**
       * Show error toast
       */
      error: (title: string, description?: string, duration?: number) => {
        addToast({
          type: 'error',
          title,
          description,
          duration: duration ?? 5000, // Errors stay longer by default
        });
      },

      /**
       * Show warning toast
       */
      warning: (title: string, description?: string, duration?: number) => {
        addToast({
          type: 'warning',
          title,
          description,
          duration,
        });
      },

      /**
       * Show info toast
       */
      info: (title: string, description?: string, duration?: number) => {
        addToast({
          type: 'info',
          title,
          description,
          duration,
        });
      },

      /**
       * Show custom toast
       */
      custom: (type: ToastType, title: string, description?: string, duration?: number) => {
        addToast({
          type,
          title,
          description,
          duration,
        });
      },
    },

    /**
     * Dismiss specific toast
     */
    dismiss: removeToast,

    /**
     * Clear all toasts
     */
    dismissAll: clearAll,
  };
}

/**
 * Promise-based toast for async operations
 * 
 * @example
 * ```tsx
 * const { promise } = useToast();
 * 
 * await promise(
 *   saveProduct(),
 *   {
 *     loading: 'Saving product...',
 *     success: 'Product saved!',
 *     error: 'Failed to save product',
 *   }
 * );
 * ```
 */
export function useToastPromise() {
  const { toast } = useToast();

  const promise = async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    // Show loading toast
    toast.info(messages.loading);

    try {
      const result = await promise;
      
      // Show success toast
      const successMessage =
        typeof messages.success === 'function'
          ? messages.success(result)
          : messages.success;
      
      toast.success(successMessage);
      
      return result;
    } catch (error) {
      // Show error toast
      const errorMessage =
        typeof messages.error === 'function' ? messages.error(error) : messages.error;
      
      toast.error(errorMessage);
      
      throw error;
    }
  };

  return { promise };
}

/**
 * Re-export the standalone toast helpers for use outside components
 */
export const toast = toastHelpers;