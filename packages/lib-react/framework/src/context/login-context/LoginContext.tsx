import React, { createContext, FC, useState } from 'react';
import { ILoginContext } from './ILoginContext';

export const LoginContext = createContext<ILoginContext>({} as ILoginContext);

export const LoginProvider: FC<unknown> = ({ children }) => {
  const [showLoginPopup, setLoginPopupStatus] = useState<boolean>(false);
  const updateLoginPopup = (status: boolean) => {
    setLoginPopupStatus(status);
  };
  return (
    <LoginContext.Provider
      value={{
        showLoginPopup,
        updateLoginPopup,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
