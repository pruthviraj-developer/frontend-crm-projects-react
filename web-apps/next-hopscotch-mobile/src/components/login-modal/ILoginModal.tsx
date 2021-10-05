export interface ILoginModalProps {
  closeLoginPopup: () => void;
}

export interface IHeaderProps {
  closeLoginPopup: () => void;
  active: boolean;
  back: () => void;
}

export interface ISubHeaderProps {
  title: string;
}

export interface IFooterProps {
  footerDescription: string;
  footerLink: string;
  footerLinkText: string;
  signInOrJoin: () => void;
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
}

export interface IVerifiedDataProps {
  loginId?: string;
  otpReason?: string;
  type?: string;
}
