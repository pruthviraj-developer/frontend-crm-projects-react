import { ILoginErrorMessageBar } from './../ILoginModal';

export interface IJoinUsProps {
  updateUserStatus: (status: string, type?: string, error?: ILoginErrorMessageBar) => void;
}
export interface IUserProps {
  name: string;
  email: string;
  phoneNo: string;
  otpReason: string;
}
