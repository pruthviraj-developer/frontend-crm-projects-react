import React, { FC, useContext } from 'react';
import { LoginContext } from '@hs/framework';
import { BackIcon, IconClose } from '@hs/icons';
import { IHeaderProps } from './ILoginModal';
import { HeaderWrapper, HeaderTitle, LoginModalHeaderIcon } from './StyledLoginModal';
export const Header: FC<IHeaderProps> = ({ active, back, closeLoginPopup }: IHeaderProps) => {
  const { updateLoginPopup } = useContext(LoginContext);
  const updateForm = () => {
    if (active) {
      back();
    } else {
      closeLoginPopup();
      updateLoginPopup(false);
    }
  };
  return (
    <HeaderWrapper active={active}>
      <LoginModalHeaderIcon icon={active ? BackIcon : IconClose} onClick={updateForm} />
      {active && <HeaderTitle>Verify mobile</HeaderTitle>}
    </HeaderWrapper>
  );
};
