import React, { FC } from 'react';
import { IButtonProps } from './IButton';
import { ButtonWrapper, StyledButton } from './StyledButton';

export const Button: FC<IButtonProps> = ({ name }: IButtonProps) => {
  return (
    <ButtonWrapper>
      <StyledButton type="submit">{name}</StyledButton>
    </ButtonWrapper>
  );
};
