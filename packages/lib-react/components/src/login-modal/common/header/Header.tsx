import React, { FC } from 'react';
import { BackIcon } from '@hs/icons';
import { IHeaderProps } from './IHeader';
import {
  HeaderWrapper,
  HeaderTitle,
  LoginModalHeaderIcon,
} from './StyledHeader';
export const Header: FC<IHeaderProps> = ({
  active,
  back,
  backStatus,
}: IHeaderProps) => {
  const updateForm = () => {
    back(backStatus);
  };
  return (
    <HeaderWrapper active={active}>
      <LoginModalHeaderIcon
        icon={active ? BackIcon : BackIcon}
        onClick={updateForm}
      />
      {active && <HeaderTitle>Verify mobile</HeaderTitle>}
    </HeaderWrapper>
  );
};
