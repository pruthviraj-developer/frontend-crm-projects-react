export interface ILoginModalProps {
  closeLoginPopup: () => void;
}

export interface IHeaderProps {
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

export interface IMobileProps {}
