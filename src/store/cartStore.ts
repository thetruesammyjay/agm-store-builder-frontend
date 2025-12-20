import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AGM_FEE_PERCENTAGE } from '@/lib/constants';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeUsername: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      subtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      
      total: () => {
        const subtotal = get().subtotal();
        const agmFee = subtotal * AGM_FEE_PERCENTAGE;
        return subtotal + agmFee;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);