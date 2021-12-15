import React, { FC } from 'react';
import { ISubHeaderProps } from '../ILoginModal';
import { SubHeaderWrapper } from './StyledLoginModal';
export const SubHeader: FC<ISubHeaderProps> = ({ title }: ISubHeaderProps) => {
  return <SubHeaderWrapper>{title}</SubHeaderWrapper>;
};
