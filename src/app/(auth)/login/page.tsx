import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your store
        </p>
      </div>

      <LoginForm />

      <div className="flex items-center justify-between text-sm mt-4">
        <Link 
          href="/forgot-password" 
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          Forgot password?
        </Link>
        <div className="text-gray-500">
          New here?{" "}
          <Link href="/signup" className="text-primary-600 hover:text-primary-500 font-medium">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}