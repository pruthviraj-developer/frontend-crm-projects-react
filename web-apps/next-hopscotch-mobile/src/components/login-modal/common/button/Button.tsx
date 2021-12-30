import React, { FC } from 'react';
import { IButtonProps } from './IButton';
import { ButtonWrapper, StyledButton } from './StyledButton';

export const Button: FC<IButtonProps> = ({ name, disabled }: IButtonProps) => {
  return (
    <ButtonWrapper>
      <StyledButton disabled={disabled} type="submit">
        {name}
      </StyledButton>
    </ButtonWrapper>
  );
};
