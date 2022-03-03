import { IErrorProps } from './common';

export interface ILoginModalProps {
  closeLoginPopup: (status?: string | boolean) => void;
  trackEvent: (
    evtName: string,
    additionalProperties: Record<string, string | number | boolean>
  ) => void;
}

export interface IHeaderProps {
  active: boolean;
  loginType?: string;
  currentState?: string;
  closeLoginPopup: () => void;
  back: (status?: string) => void;
}

export interface ISubHeaderProps {
  title: string;
}

export interface IUserProps {
  trackEvent: (
    evtName: string,
    additionalProperties: Record<string, string | number | boolean>
  ) => void;
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
