import { OTPVerification } from "@/components/auth/OTPVerification";

export default function VerifyPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Verify your Account</h1>
        <p className="text-sm text-gray-500">
          Please enter the code sent to your email
        </p>
      </div>

      <OTPVerification />
    </div>
  );
}