import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface NotificationState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = toast.duration ?? 3000; // Default 3 seconds
    const newToast: Toast = {
      ...toast,
      id,
      duration,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },
}));

// Helper functions for common toast types
export const toast = {
  success: (title: string, description?: string) => {
    useNotificationStore.getState().addToast({
      type: 'success',
      title,
      description,
    });
  },

  error: (title: string, description?: string) => {
    useNotificationStore.getState().addToast({
      type: 'error',
      title,
      description,
      duration: 5000, // Errors stay longer
    });
  },

  warning: (title: string, description?: string) => {
    useNotificationStore.getState().addToast({
      type: 'warning',
      title,
      description,
    });
  },

  info: (title: string, description?: string) => {
    useNotificationStore.getState().addToast({
      type: 'info',
      title,
      description,
    });
  },
};