"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Added Button import
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/products/ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react"; // Added for loading state

// Schema definition
const quickProductSchema = z.object({
  name: z.string().min(3, "Name is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  description: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

export type QuickProductFormData = z.infer<typeof quickProductSchema>;

interface QuickProductFormProps {
  onSubmit: (data: QuickProductFormData) => void;
  defaultValues?: Partial<QuickProductFormData>;
  isPending?: boolean; // Added isPending prop for button state
}

export function QuickProductForm({ onSubmit, defaultValues, isPending }: QuickProductFormProps) {
  const form = useForm<QuickProductFormData>({
    // Cast resolver to any to fix type incompatibility between react-hook-form versions
    resolver: zodResolver(quickProductSchema) as any,
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      images: [],
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form 
        id="quick-product-form" 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    // Force array type for the value prop
                    value={(field.value as string[]) || []}
                    onChange={(urls) => field.onChange(urls)}
                    onRemove={(url) =>
                      field.onChange((field.value || []).filter((val) => val !== url))
                    }
                    maxFiles={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Vintage Denim Jacket" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₦)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    {...field}
                    // Prevent NaN warning by falling back to empty string for display if needed
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Short description of your product..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button inside form for accessibility/enter key support */}
        <Button 
          type="submit" 
          className="w-full bg-primary-600 hover:bg-primary-700 md:hidden" // Show on mobile inside form
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </form>
    </Form>
  );
}