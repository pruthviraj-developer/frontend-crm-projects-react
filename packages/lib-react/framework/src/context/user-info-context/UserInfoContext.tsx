import React, { createContext, FC } from 'react';
import { userInfo } from '../../user-info';
import { UserInfoProps } from './IUserInfoContext';

export const UserInfoContext = createContext<UserInfoProps>(
  {} as UserInfoProps
);

export const UserInfoProvider: FC<unknown> = ({ children }) => {
  return (
    <UserInfoContext.Provider value={{ ...userInfo() }}>
      {children}
    </UserInfoContext.Provider>
  );
};
