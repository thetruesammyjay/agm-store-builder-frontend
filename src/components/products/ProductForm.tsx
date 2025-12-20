"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ProductFormBasic } from "./ProductFormBasic";
import { ProductFormPricing } from "./ProductFormPricing";
import { ProductFormInventory } from "./ProductFormInventory";
import { ProductFormImages } from "./ProductFormImages";
import { toast } from "@/store/notificationStore";

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      stockQuantity: 0,
      images: [],
      isActive: true,
    },
  });

  const handleSubmit = async (values: ProductFormData) => {
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error("Error", "Failed to save product. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Link 
            href="/dashboard/products" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Discard
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" /> Save Product
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ProductFormBasic />
            <ProductFormInventory />
            <ProductFormPricing />
          </div>
          
          <div className="space-y-8">
            <ProductFormImages />
            {/* Future: ProductOrganization / Category */}
          </div>
        </div>
      </form>
    </Form>
  );
}