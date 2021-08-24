import { useQuery } from 'react-query';
import { productDetailsService, timeService } from '@hs/services';
import { UserInfo } from './IUserInfo';

// const PERSISTENT_TICKET_COOKIE_NAME = 'hs_persistent_ticket';
const CUSTOMER_INFO_COOKIE_NAME = 'hs_customer_info';
// const CUSTOMER_SEGMENT_INFO = 'WEBSITE_customersegment';
const GUEST_CUSTOMER_INFO = 'hs_guest_customer_info';
// const CART_ITEM_QTY_COOKIE_NAME = 'cart_item_quantity';

// setCartItemQty(qty) {
//   if (this._customerInfo) {
//     this._customerInfo.cartItemQty = qty;
//   } else {
//     this._GUCartCount = qty;
//   }
//   this._$cookies.put(CART_ITEM_QTY_COOKIE_NAME, qty, { path: '/' });
// }

export const userInfo = () => {
  const {
    data: userData,
    isSuccess: isSuccess,
    isLoading: isLoading,
  } = useQuery<UserInfo>('userInfo', productDetailsService.getUserInfo, {
    staleTime: Infinity,
    retry: false,
  });

  if (isSuccess && userData) {
    if (userData.isLoggedIn) {
      // Store data in cookie and update service/cartQty
      const expireProp = {
        // Expire 30 days in the future
        expires: new Date(
          timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000
        ),
        path: '/',
      };
      this._customerInfo = userData.data;
      this._GUCartCount = null;
      this._$cookies.putObject(
        CUSTOMER_INFO_COOKIE_NAME,
        this._customerInfo,
        expireProp
      );
    } else {
      this._guestCustomer = userData.data;
      this._$cookies.putObject(
        GUEST_CUSTOMER_INFO,
        this._guestCustomer,
        expireProp
      );
    }
    if (userData.cartItemQty !== undefined) {
      // this.setCartItemQty(userData.cartItemQty);
    }
  }
  return {
    userInfo,
    isLoading,
  };
};
