import React, { FC } from 'react';
import { BackIcon, IconClose } from '@hs/icons';
import { IHeaderProps } from './ILoginModal';
import { HeaderWrapper, HeaderTitle, LoginModalHeaderIcon } from './StyledLoginModal';
export const Header: FC<IHeaderProps> = ({ active, back, closeLoginPopup }: IHeaderProps) => {
  const updateForm = () => {
    if (active) {
      back();
    } else {
      closeLoginPopup();
    }
  };
  return (
    <HeaderWrapper active={active}>
      <LoginModalHeaderIcon icon={active ? BackIcon : IconClose} onClick={updateForm} />
      {active && <HeaderTitle>Verify mobile</HeaderTitle>}
    </HeaderWrapper>
  );
};
