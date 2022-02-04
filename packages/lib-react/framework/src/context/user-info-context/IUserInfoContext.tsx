import { IUserInfoProps } from 'product/types';
import { IUtmParam } from './../../types';
export interface UserInfoProps {
  userInfo?: IUserInfoProps;
  showAccountNotification: boolean;
  updateUtmParams: (data: IUtmParam) => void;
  updateUserInfo: (data: IUserInfoProps) => void;
}

export interface INotificationProps {
  action: string;
  count: number;
}
