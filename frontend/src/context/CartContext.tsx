import { createContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  restaurant: string;
  category: string;
  item: string;
  details: {
    photo: string;
    desc: string;
    price: number;
  };
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (restaurant: string, category: string, item: string) => void;
  updateQuantity: (restaurant: string, category: string, item: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Load initial cart state from localStorage if available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.restaurant === newItem.restaurant &&
          item.category === newItem.category &&
          item.item === newItem.item
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (restaurant: string, category: string, item: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (i) => !(i.restaurant === restaurant && i.category === category && i.item === item)
      )
    );
  };

  const updateQuantity = (restaurant: string, category: string, item: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((i) => {
        if (i.restaurant === restaurant && i.category === category && i.item === item) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
