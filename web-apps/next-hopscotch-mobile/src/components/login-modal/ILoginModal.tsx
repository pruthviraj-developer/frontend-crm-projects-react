export interface ILoginModalProps {
  closeLoginPopup: (args?: number) => void;
}

export interface IHeaderProps {
  closeLoginPopup: (args?: number) => void;
  active: boolean;
  back: () => void;
}

export interface ISubHeaderProps {
  title: string;
}

export interface IMobileProps {
  updateForm: (args: IVerifiedDataProps) => void;
}

export interface ILoginErrorResponse {
  action: string;
  messageBar: ILoginErrorMessageBar;
}

export interface ILoginErrorMessageBar {
  messageType: string;
  message: string;
  actionText: string;
  actionLink: string;
  messageUIType: string;
  messageDisplayTime: string;
  code?: string;
}

export interface IVerifiedDataProps {
  loginId: string;
  otpReason: string;
  type: string;
  back?: (args?: number) => void;
}

export interface IVerifyOtpResponeProps {
  action: string;
  messageBar: ILoginErrorMessageBar;
  cartItemQty: number;
  isRegister: boolean;
  resendOTPAuto: boolean;
  isLoggedIn: boolean;
}

export interface VerifyOtpMessageBar {
  messageType: string;
  code: string;
  message: string;
  messageUIType: string;
  messageDisplayTime: string;
}

export interface ILoaderProps {}
