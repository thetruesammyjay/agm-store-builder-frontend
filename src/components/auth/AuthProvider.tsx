"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCurrentUser } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Zustand persist middleware automatically hydrates the state from localStorage
  // However, we can perform an optional validity check or hydration wait here
  const { token, isAuthenticated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Optional: Fetch current user to validate token if it exists
  const { isLoading, error } = useCurrentUser();

  useEffect(() => {
    // This ensures we don't render until Zustand has attempted hydration
    // In strict mode/SSR, this prevents hydration mismatch
    setIsHydrated(true);
  }, []);

  // Handle token expiration/invalidity
  useEffect(() => {
    if (error) {
      // api interceptors usually handle logout, but we can do extra cleanup here
      console.warn("Auth token invalid or expired");
    }
  }, [error]);

  if (!isHydrated) {
    // Initial hydration loading state
    return null; // Or a global loading spinner
  }

  // If we have a token but are still fetching user details, we might want to wait
  // This depends on if you want to block the UI or show optimistic UI
  // For now, we render children to allow the app to load fast, 
  // relying on ProtectedRoute to block specific pages.
  
  return <>{children}</>;
}