import React, { createContext, FC, useState, useContext } from 'react';
import {
  ILoginContext,
  IVerifyUserDetails,
  IVerifyOtpResponeProps,
  ILoginErrorResponse,
} from './ILoginContext';
import {
  productDetailsService,
  timeService,
  cookiesService,
} from '@hs/services';
import { COOKIE_DATA } from '../../storage';
import { CartItemQtyContext } from '../cart-context/CartContext';

export const LoginContext = createContext<ILoginContext>({} as ILoginContext);

export const LoginProvider: FC<unknown> = ({ children }) => {
  const [showLoginPopup, setLoginPopupStatus] = useState<boolean>(false);
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const updateLoginPopup = (status: boolean) => {
    setLoginPopupStatus(status);
  };
  const verifyOtp = (userDetails: IVerifyUserDetails) => {
    return (async () => {
      try {
        const response: IVerifyOtpResponeProps =
          await productDetailsService.verifyOtp(userDetails);
        if (response.action === 'success' && response.isLoggedIn) {
          const setCookie = (key: string, value: any) => {
            const expireProp = {
              expires: new Date(
                timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000
              ),
            };
            cookiesService.setCookies({
              key,
              value,
              options: expireProp,
            });
          };
          setCookie(COOKIE_DATA.CUSTOMER_INFO, response);
          setCookie(COOKIE_DATA.PERSISTENT_TICKET, response.persistentTicket);
          cookiesService.deleteCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO);
          if (response.cartItemQty) {
            updateCartItemQty(response.cartItemQty);
          }
          updateLoginPopup(false);
        }
        return Promise.resolve(response);
      } catch (error) {
        const errorRespone = error as unknown as ILoginErrorResponse;
        return Promise.resolve(errorRespone);
      }
    })();
  };

  return (
    <LoginContext.Provider
      value={{
        showLoginPopup,
        updateLoginPopup,
        verifyOtp,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
