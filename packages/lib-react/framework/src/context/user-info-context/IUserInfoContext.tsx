import { IUserInfoProps } from 'product/types';
export interface UserInfoProps {
  userInfo?: IUserInfoProps;
  updateUserInfo: (data: IUserInfoProps) => void;
}
