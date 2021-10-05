export interface ILoginModalProps {
  closeLoginPopup: () => void;
}

export interface IHeaderProps {
  closeLoginPopup: () => void;
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
