"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { useCreateProduct } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/store/notificationStore";
import { Container } from "@/components/shared/Container";

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const storeId = user?.id || ""; // Replace with actual store ID logic

  const { mutate: createProduct, isPending } = useCreateProduct(storeId);

  const handleSubmit = async (data: any) => {
    createProduct(data, {
      onSuccess: () => {
        toast.success("Product Created", "Your new product is live.");
        router.push("/dashboard/products");
      },
      onError: (error: any) => {
        toast.error("Error", error.response?.data?.message || "Failed to create product");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Product</h1>
      </div>
      
      <div className="max-w-5xl">
        <ProductForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}