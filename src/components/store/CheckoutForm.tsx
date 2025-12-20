"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validators";
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
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { Loader2, Lock } from "lucide-react";
import { toast } from "@/store/notificationStore";

interface CheckoutFormProps {
  storeId: string;
}

export function CheckoutForm({ storeId }: CheckoutFormProps) {
  const { items } = useCart();
  const { mutate: createOrder, isPending } = useCheckout(storeId);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    // Ensure cart isn't empty (though validation handles this)
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Refresh items from current cart state just in case
    data.items = items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    createOrder(data, {
      onError: (error) => {
        toast.error("Checkout Failed", error.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+234..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Lock className="mr-2 h-5 w-5" />
          )}
          Pay Securely
        </Button>
        
        <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
          <span>Secured by</span>
          <span className="font-bold text-gray-700">Monnify</span>
        </div>
      </form>
    </Form>
  );
}