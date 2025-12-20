import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;

  // Modal state
  activeModal: string | null;
  modalData: any;
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;

  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;

  // Filters
  filtersOpen: boolean;
  toggleFilters: () => void;

  // Notifications panel
  notificationsPanelOpen: boolean;
  toggleNotificationsPanel: () => void;

  // Page title
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarOpen: true,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Modal
      activeModal: null,
      modalData: null,
      openModal: (modalId, data) => set({ activeModal: modalId, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      // Loading
      globalLoading: false,
      setGlobalLoading: (loading) => set({ globalLoading: loading }),

      // Theme
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
            root.classList.add(systemTheme);
          } else {
            root.classList.add(theme);
          }
        }
      },

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: '' }),

      // Mobile menu
      mobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // Filters
      filtersOpen: false,
      toggleFilters: () => set((state) => ({ filtersOpen: !state.filtersOpen })),

      // Notifications panel
      notificationsPanelOpen: false,
      toggleNotificationsPanel: () =>
        set((state) => ({ notificationsPanelOpen: !state.notificationsPanelOpen })),

      // Page title
      pageTitle: '',
      setPageTitle: (title) => set({ pageTitle: title }),
    }),
    {
      name: 'ui-storage',
      // Only persist certain fields
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);