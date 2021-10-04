import React, { FC } from 'react';
import { BackIcon, IconClose } from '@hs/icons';
import { IHeaderProps } from './ILoginModal';
import { HeaderWrapper, HeaderTitle, LoginModalHeaderIcon } from './StyledLoginModal';
export const Header: FC<IHeaderProps> = ({ active, back }: IHeaderProps) => {
  return (
    <HeaderWrapper active={active}>
      <LoginModalHeaderIcon icon={active ? BackIcon : IconClose} onClick={back} />
      {active && <HeaderTitle>Verify mobile</HeaderTitle>}
    </HeaderWrapper>
  );
};
