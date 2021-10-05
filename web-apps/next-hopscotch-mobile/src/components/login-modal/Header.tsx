import React, { FC } from 'react';
import { BackIcon, IconClose } from '@hs/icons';
import { IHeaderProps } from './ILoginModal';
import { HeaderWrapper, LoginModalHeaderIcon } from './StyledLoginModal';
export const Header: FC<IHeaderProps> = ({ closeLoginPopup }: IHeaderProps) => {
  return (
    <HeaderWrapper>
      <LoginModalHeaderIcon icon={IconClose} onClick={closeLoginPopup} />
    </HeaderWrapper>
  );
};
