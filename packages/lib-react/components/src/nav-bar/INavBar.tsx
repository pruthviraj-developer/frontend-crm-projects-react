export interface INavBarProps {
  showSearchPopup: () => void;
}

export interface IUserInfoProps {
  action: string;
  actionURI: string;
  cartItemQty: number;
  isRegister: boolean;
  isLoggedIn: boolean;
  hasGuestData: boolean;
  actionText: string;
}
