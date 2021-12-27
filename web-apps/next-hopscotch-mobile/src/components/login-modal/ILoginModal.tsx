import { IErrorProps } from './common';

export interface ILoginModalProps {
  closeLoginPopup: (status?: string | boolean) => void;
}

export interface IHeaderProps {
  closeLoginPopup: () => void;
  active: boolean;
  back: (status?: string) => void;
  loginType: string;
}

export interface ISubHeaderProps {
  title: string;
}

export interface IUserProps {
  updateForm: (args: IVerifiedDataProps) => void;
  switchScreen: (error: IErrorProps) => void;
  loginBy?: string;
}

export interface ILoginErrorResponse {
  action: string;
  messageBar: ILoginErrorMessageBar;
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

export interface IVerifiedDataProps {
  type?: string;
  from?: string;
  name?: string;
  email?: string;
  loginId?: string;
  phoneNo?: string;
  message?: string;
  otpReason?: string;
  back?: (status?: boolean | string) => void;
}
