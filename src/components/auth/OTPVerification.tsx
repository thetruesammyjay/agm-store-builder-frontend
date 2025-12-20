"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OTPFormData } from "@/lib/validators";
import { useVerifyOTP } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "@/store/notificationStore";
import { useSearchParams } from "next/navigation";

export function OTPVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const { mutate: verifyOTP, isPending } = useVerifyOTP();

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: email,
      code: "",
      type: "email",
    },
  });

  function onSubmit(values: OTPFormData) {
    verifyOTP(values, {
      onSuccess: () => {
        toast.success("Verified!", "You can now log in to your account.");
      },
      onError: (error) => {
        toast.error("Verification Failed", error.message);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="123456"
                  className="h-12 text-center text-xl tracking-widest"
                  maxLength={6}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-gray-500 mt-2">
                We sent a 6-digit code to {email || "your email"}.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white h-11"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Email
        </Button>
      </form>
    </Form>
  );
}