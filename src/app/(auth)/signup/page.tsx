import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-sm text-gray-500">
          Start building your online store today
        </p>
      </div>

      <SignupForm />

      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
          Log in
        </Link>
      </div>
    </div>
  );
}