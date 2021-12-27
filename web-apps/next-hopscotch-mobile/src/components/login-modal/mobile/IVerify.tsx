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
