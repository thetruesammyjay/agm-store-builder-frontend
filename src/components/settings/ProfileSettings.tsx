"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type ProfileUpdateFormData } from "@/lib/validators";
import { useAuthStore } from "@/store/authStore";
import { useCurrentUser } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, Phone, Mail } from "lucide-react";
import { toast } from "@/store/notificationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants";

export function ProfileSettings() {
  const { user: storeUser, updateUser: updateStoreUser } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch fresh user data to ensure we have fields like 'phone' which might not be in the initial token payload
  const { data: apiResponse, isLoading: isLoadingUser } = useCurrentUser();
  const userData = apiResponse?.data || storeUser;

  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  // Update form values when user data is fetched
  useEffect(() => {
    if (userData) {
      form.reset({
        fullName: userData.fullName || "",
        email: userData.email || "",
        // @ts-ignore - Phone might be missing from partial User type but present in API response
        phone: userData.phone || "",
      });
    }
  }, [userData, form]);

  // Mutation for updating profile
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data: ProfileUpdateFormData) => {
      // Assuming endpoint /auth/profile based on standard REST patterns for this project
      const response = await put<{ success: boolean; data: any }>('/auth/profile', data);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      // 1. Update global store
      updateStoreUser(updatedUser);
      
      // 2. Invalidate query to ensure fresh data elsewhere
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      
      toast.success("Profile updated", "Your personal information has been saved successfully.");
    },
    onError: (error: any) => {
      toast.error("Update failed", error.response?.data?.error?.message || "Failed to update profile. Please try again.");
    },
  });

  const onSubmit = (data: ProfileUpdateFormData) => {
    updateProfile(data);
  };

  if (isLoadingUser && !storeUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Loading your profile...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
            <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details. This information is private.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled className="bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
                    </FormControl>
                    <FormDescription>Contact support to change email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+234..." disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" disabled={isPending || !form.formState.isDirty} className="bg-primary-600 hover:bg-primary-700 text-white min-w-[140px]">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}