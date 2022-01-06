import React, { FC, useContext } from 'react';
import { LoginContext } from '@hs/framework';
import { BackIcon, IconClose } from '@hs/icons';
import { IHeaderProps } from '../ILoginModal';
import {
  HeaderWrapper,
  HeaderTitle,
  LoginModalHeaderIcon,
} from './StyledLoginModal';
import { EMAILSIGNIN, MOBILESIGNIN, SIGNIN, VERIFY } from '../constants';
export const Header: FC<IHeaderProps> = ({
  active,
  loginType,
  currentState,
  back,
  closeLoginPopup,
}: IHeaderProps) => {
  const backStatus = loginType === EMAILSIGNIN ? true : false;
  const { updateLoginPopup } = useContext(LoginContext);
  const updateForm = () => {
    if (active) {
      if (backStatus && currentState != VERIFY) {
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
    <HeaderWrapper active={active} hideShadow={currentState === SIGNIN}>
      <LoginModalHeaderIcon
        icon={active ? BackIcon : IconClose}
        onClick={updateForm}
      />
      {active && currentState != SIGNIN && (
        <HeaderTitle>
          Verify {loginType === MOBILESIGNIN ? 'mobile' : 'email'}{' '}
        </HeaderTitle>
      )}
    </HeaderWrapper>
  );
};
