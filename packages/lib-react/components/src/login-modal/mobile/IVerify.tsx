export interface IResendOtpSuccess {
  action: string;
  messageBar: IResendOtpSuccessMessageBar;
  loginId: string;
  timer: number;
  textMessage: string;
  otpReason: string;
  otpLength: number;
}

export interface IResendOtpSuccessMessageBar {
  messageType: string;
  message: string;
  messageUIType: string;
  messageDisplayTime: string;
}

export interface ILoginErrorResponse {
  action: string;
  messageBar: ILoginErrorMessageBar;
  textMessage?: string;
}

export interface ILoginErrorMessageBar {
  messageType?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  messageUIType?: string;
  messageDisplayTime?: string;
  code?: string;
  redirectLink?: string;
  id?: string;
}
