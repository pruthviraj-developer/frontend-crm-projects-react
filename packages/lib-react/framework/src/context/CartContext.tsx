import React, { createContext, FC, useState } from 'react';
import { ICartContext } from './ICartContext';

export const CartItemQtyContext = createContext<ICartContext>(
  {} as ICartContext
);

export const CartItemQtyProvider: FC<unknown> = ({ children }) => {
  const [cartItemQty, setCartItemQuantity] = useState(0);
  const updateCartItemQty = (qty: number) => {
    setCartItemQuantity(qty);
  };
  return (
    <CartItemQtyContext.Provider value={{ cartItemQty, updateCartItemQty }}>
      {children}
    </CartItemQtyContext.Provider>
  );
};
