import { ILoginErrorMessageBar } from './../ILoginModal';

export interface IJoinUsProps {
  updateUserStatus: (
    status: string,
    type?: string,
    error?: ILoginErrorMessageBar
  ) => void;
}
export interface IUserProps {
  name: string;
  email: string;
  phoneNo: string;
  otpReason: string;
}

export interface ISignUpSuccessResponseProps {
  action: string;
  messageBar: ILoginErrorMessageBar;
  loginId: string;
  timer: number;
  textMessage: string;
  phoneNumber: string;
  email: string;
  otpReason: string;
  otpLength: number;
}
