export type ILoginContext = {
  showLoginPopup: boolean;
  updateLoginPopup: (status: boolean) => void;
  verifyOtp: any;
};

interface ILoginErrorMessageBar {
  messageType: string;
  message: string;
  actionText: string;
  actionLink: string;
  messageUIType: string;
  messageDisplayTime: string;
  code?: string;
}

export interface ILoginErrorResponse {
  action: string;
  messageBar: ILoginErrorMessageBar;
}

export interface IVerifyOtpResponeProps {
  action: string;
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  cartItemQty: number;
  persistentTicket: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  isRegister: boolean;
  uuid: string;
  loginId: string;
  mobileStatus: string;
  isLoggedIn: boolean;
  isCustomerCreatedOnPlaceOrder: boolean;
  messageBar: ILoginErrorMessageBar;
  resendOTPAuto: boolean;
}

export interface IVerifyUserDetails {
  loginId: string;
  otpReason: string;
  type: string;
}
