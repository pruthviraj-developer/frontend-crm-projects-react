import { IErrorProps } from './common';

export interface ILoginModalProps {
  closeLoginPopup: (status?: boolean) => void;
}

export interface IHeaderProps {
  closeLoginPopup: () => void;
  active: boolean;
  back: () => void;
}

export interface ISubHeaderProps {
  title: string;
}

export interface IMobileProps {
  updateForm: (args: IVerifiedDataProps) => void;
  switchScreen: (error: IErrorProps) => void;
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
}

export interface IVerifiedDataProps {
  loginId?: string;
  otpReason?: string;
  type?: string;
  back?: (status?: boolean) => void;
}
