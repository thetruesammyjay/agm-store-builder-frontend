import { useCartStore } from '@/store/cartStore';

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    total,
  } = useCartStore();

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal: subtotal(),
    total: total(),
    itemCount: items.length,
    isEmpty: items.length === 0,
  };
}
