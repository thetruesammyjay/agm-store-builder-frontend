"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validators";
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
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "@/store/notificationStore";
import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/api";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false);

  // Defining mutation locally as it wasn't in global hooks
  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      return await post("/auth/forgot-password", data);
    },
    onSuccess: () => {
      setIsSent(true);
      toast.success("Link Sent", "Check your email for instructions");
    },
    onError: (error: any) => {
      toast.error("Error", error.response?.data?.error?.message || "Failed to send link");
    },
  });

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordFormData) {
    sendResetLink(values);
  }

  if (isSent) {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <ArrowRight className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Check your inbox</h3>
          <p className="text-gray-500 mt-2 text-sm">
            We sent a password reset link to <span className="font-semibold text-gray-900">{form.getValues("email")}</span>
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSent(false)}
          className="w-full"
        >
          Try another email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  type="email"
                  disabled={isPending}
                  {...field}
                  className="h-11"
                />
              </FormControl>
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
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}