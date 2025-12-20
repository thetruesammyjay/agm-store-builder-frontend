import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { post, get } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { QUERY_KEYS, ROUTES } from '@/lib/constants';
import { setAuthToken, removeAuthToken } from '@/lib/auth';
import type { LoginFormData, RegisterFormData, OTPFormData } from '@/lib/validators';

// --- Type Definitions based on src/controller/authController.ts ---

interface BackendUser {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  email_verified: boolean;
  phone_verified?: boolean;
  role?: 'user' | 'admin' | 'super_admin'; 
  created_at: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    user: BackendUser;
    accessToken: string;  // Changed: Directly in data
    refreshToken: string; // Changed: Directly in data
    expiresIn: number;
  };
}

interface SignupResponse {
  success: boolean;
  data: BackendUser; // Changed: Returns user object directly
  message: string;
}

// ------------------------------------------------------------------

export function useLogin() {
  const router = useRouter();
  const { login: setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      // Backend: POST /api/v1/auth/login
      const response = await post<LoginResponse>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Transform snake_case to camelCase for frontend
      const user = {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.full_name,
        phoneVerified: data.user.phone_verified || false,
        emailVerified: data.user.email_verified,
        role: data.user.role || 'user', 
      };

      // Token is at data.accessToken
      const token = data.accessToken;

      setAuth(user, token);
      setAuthToken(token);
      
      // Role-based redirect
      if (user.role === 'admin' || user.role === 'super_admin') {
        router.push('/admin');
      } else {
        router.push(ROUTES.DASHBOARD);
      }
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      // Backend: POST /api/v1/auth/signup
      const payload = {
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        phone: data.phone,
      };

      const response = await post<SignupResponse>('/auth/signup', payload);
      return response;
    },
    onSuccess: (response) => {
      // User data is in response.data
      const email = response.data.email;
      router.push(`${ROUTES.VERIFY}?email=${encodeURIComponent(email)}`);
    },
  });
}

export function useVerifyOTP() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: OTPFormData) => {
      // Backend: POST /api/v1/auth/verify-otp
      return await post('/auth/verify-otp', {
        email: data.email,
        code: data.code,
        type: data.type || 'email', // Backend requires 'type' ('email' or 'phone')
      });
    },
    onSuccess: () => {
      router.push(ROUTES.LOGIN);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { logout: clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    // Backend: POST /api/v1/auth/logout
    post('/auth/logout').catch(console.error);

    clearAuth();
    removeAuthToken();
    queryClient.clear();
    router.push(ROUTES.HOME);
  };
}

export function useCurrentUser() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: async () => {
      // Backend: GET /api/v1/auth/me (Found in authController)
      const response = await get<{ success: boolean; data: BackendUser }>('/auth/me');
      const backendUser = response.data;

      // Transform for Frontend
      return {
        id: backendUser.id,
        email: backendUser.email,
        fullName: backendUser.full_name,
        phoneVerified: backendUser.phone_verified || false,
        emailVerified: backendUser.email_verified,
        role: backendUser.role || 'user',
        phone: backendUser.phone,
      };
    },
    enabled: !!token,
  });
}