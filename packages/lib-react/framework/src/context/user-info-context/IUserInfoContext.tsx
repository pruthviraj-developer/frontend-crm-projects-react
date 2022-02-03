import { IUserInfoProps } from 'product/types';
export interface UserInfoProps {
  userInfo?: IUserInfoProps;
  showAccountNotification: boolean;
  updateUtmParams: () => void;
  updateUserInfo: (data: IUserInfoProps) => void;
}

export interface INotificationProps {
  action: string;
  count: number;
}
