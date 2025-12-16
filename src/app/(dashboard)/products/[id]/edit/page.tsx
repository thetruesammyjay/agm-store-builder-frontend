"use client";

import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { ProductForm } from "@/components/products/ProductForm";
import { BackButton } from "@/components/shared/BackButton";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/store/notificationStore";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { user } = useAuthStore();
  // Typically you'd use a real store ID, here we fallback for safety
  const username = user?.email?.split('@')[0] || "store";

  const { data: response, isLoading: isLoadingProduct } = useProduct(username, id);
  const { mutate: updateProduct, isPending } = useUpdateProduct(id);

  const product = response?.data;

  const handleSubmit = async (data: any) => {
    updateProduct(data, {
      onSuccess: () => {
        toast.success("Product Updated", "Changes have been saved.");
        router.push("/dashboard/products");
      },
      onError: (error: any) => {
        toast.error("Error", error.message || "Failed to update product");
      }
    });
  };

  if (isLoadingProduct) {
    return <div className="p-8 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <BackButton label="Back to Products" href="/dashboard/products" className="mb-2" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Edit Product</h1>
        </div>
      </div>
      
      <div className="max-w-5xl">
        <ProductForm 
          initialData={product} 
          onSubmit={handleSubmit} 
          isLoading={isPending} 
        />
      </div>
    </div>
  );
}