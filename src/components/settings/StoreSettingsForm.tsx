"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeUpdateSchema, type StoreUpdateFormData } from "@/lib/validators";
import { useStore, useUpdateStore } from "@/hooks/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/store/notificationStore";

interface StoreSettingsFormProps {
  storeUsername: string;
}

export function StoreSettingsForm({ storeUsername }: StoreSettingsFormProps) {
  const { data: store, isLoading } = useStore(storeUsername);
  const { mutate: updateStore, isPending } = useUpdateStore(store?.id || "");

  const form = useForm<StoreUpdateFormData>({
    resolver: zodResolver(storeUpdateSchema),
    defaultValues: {
      displayName: "",
      description: "",
    },
  });

  // Sync form with data
  useEffect(() => {
    if (store) {
      form.reset({
        displayName: store.displayName,
        description: store.description || "",
      });
    }
  }, [store, form]);

  const onSubmit = (data: StoreUpdateFormData) => {
    updateStore(data, {
      onSuccess: () => {
        toast.success("Store updated", "Your store details have been saved.");
      },
      onError: (error: any) => {
        toast.error("Update failed", error.message || "Could not update store.");
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Loading store details...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
          <div className="h-24 w-full bg-gray-100 animate-pulse rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Manage your store's basic information and SEO details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Store" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name displayed to your customers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your store..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Used for SEO and social sharing. Keep it between 100-160 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending || !form.formState.isDirty}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}