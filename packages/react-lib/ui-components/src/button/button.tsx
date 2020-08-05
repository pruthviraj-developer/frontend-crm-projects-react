import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  fontSize?: string;
  className: 'primary' | 'secondary' | 'tertiary';
  disabled?: false;
  onClick: (event: React.MouseEvent) => void;
}

const defaultButton = `
  color:#ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  border: 4px solid #ed54a4;
  border-radius: 4px;
  width: auto;
  outline: none;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
  text-align: center;
  text-transform: uppercase;
  padding: 6px;
  position: relative;
`;

const getClasses = {
  primary: {
    'background-color': '#ed54a4',
  },
  secondary: {
    'background-color': '#eff1f4',
  },
  tertiary: {
    'background-color': '#eff1f4',
    border: '4px solid #ed54a4',
  },
  disabled: {
    opacity: '36%',
  },
};
function getButtonStyle(props: ButtonProps) {
  return styled.button(defaultButton, () => ({
    ...getClasses[props.className],
    fontSize: props.fontSize,
  }));
}
export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const ButtonStyled = getButtonStyle(props);
  return (
    <ButtonStyled disabled={props.disabled} onClick={props.onClick}>
      {props.value}
    </ButtonStyled>
  );
};
