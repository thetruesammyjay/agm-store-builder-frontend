"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, ShieldCheck, Lock } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { toast } from "@/store/notificationStore";

const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type AdminLoginData = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: AdminLoginData) => {
    login(values, {
      onSuccess: (data: any) => {
        // Strict Role Check
        const role = data.user.role;
        if (role !== 'admin' && role !== 'super_admin') {
          toast.error("Access Denied", "This account does not have admin privileges.");
          return;
        }

        toast.success("Welcome Admin", "Access granted to platform controls.");
        router.push("/admin"); // Redirect to Admin Dashboard
      },
      onError: (error: any) => {
        toast.error("Login Failed", "Invalid credentials or server error.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Admin Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Access</h1>
          <p className="text-slate-400">Restricted area for AGM Platform Controllers</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Admin Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500" 
                        placeholder="admin@shopwithagm.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input 
                          type="password" 
                          {...field} 
                          className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
                          placeholder="••••••••••••"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Enter Dashboard"}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-xs text-slate-600">
          Unauthorized access attempts are monitored and logged.
          <br />
          System ID: {new Date().getTime().toString(36).toUpperCase()}
        </p>
      </div>
    </div>
  );
}