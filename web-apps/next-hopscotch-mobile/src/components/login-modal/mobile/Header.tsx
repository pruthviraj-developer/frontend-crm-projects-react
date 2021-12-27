import React, { FC, useContext } from 'react';
import { LoginContext } from '@hs/framework';
import { BackIcon, IconClose } from '@hs/icons';
import { IHeaderProps } from '../ILoginModal';
import { HeaderWrapper, HeaderTitle, LoginModalHeaderIcon } from './StyledLoginModal';
import { EMAILSIGNIN, MOBILESIGNIN, SIGNIN } from '../constants';
export const Header: FC<IHeaderProps> = ({ active, loginType, back, closeLoginPopup }: IHeaderProps) => {
  const hideShadow = loginType === EMAILSIGNIN ? true : false;
  const { updateLoginPopup } = useContext(LoginContext);
  const updateForm = () => {
    if (active) {
      if (hideShadow) {
        back(MOBILESIGNIN);
      } else {
        back(SIGNIN);
      }
    } else {
      closeLoginPopup();
      updateLoginPopup(false);
    }
  };
  return (
    <HeaderWrapper active={active} hideShadow={hideShadow}>
      <LoginModalHeaderIcon icon={active ? BackIcon : IconClose} onClick={updateForm} />
      {active && loginType != EMAILSIGNIN && (
        <HeaderTitle>Verify {loginType === MOBILESIGNIN ? 'mobile' : 'email'} </HeaderTitle>
      )}
    </HeaderWrapper>
  );
};
