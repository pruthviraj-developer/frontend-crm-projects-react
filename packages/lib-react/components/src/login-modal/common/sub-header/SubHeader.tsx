import React, { FC } from 'react';
import { ISubHeaderProps } from './ISubHeader';
import { SubHeaderWrapper } from './StyledSubHeader';
export const SubHeader: FC<ISubHeaderProps> = ({ title }: ISubHeaderProps) => {
  return <SubHeaderWrapper>{title}</SubHeaderWrapper>;
};
