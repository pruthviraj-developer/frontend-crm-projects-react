import { cookiesService, timeService } from '@hs/services';
import React, { createContext, FC, useState } from 'react';
import { COOKIE_DATA } from '../../storage';
import { ICartContext } from './ICartContext';

export const CartItemQtyContext = createContext<ICartContext>(
  {} as ICartContext
);

export const CartItemQtyProvider: FC<unknown> = ({ children }) => {
  const [cartItemQty, setCartItemQuantity] = useState(
    cookiesService.getCookies(COOKIE_DATA.CART_ITEM_QTY) || 0
  );
  const updateCartItemQty = (qty: number) => {
    setCartItemQuantity(qty);
    const expireProp = {
      expires: new Date(
        timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000
      ),
    };
    cookiesService.setCookies({
      key: COOKIE_DATA.CART_ITEM_QTY,
      value: qty,
      options: expireProp,
    });
  };
  return (
    <CartItemQtyContext.Provider value={{ cartItemQty, updateCartItemQty }}>
      {children}
    </CartItemQtyContext.Provider>
  );
};
