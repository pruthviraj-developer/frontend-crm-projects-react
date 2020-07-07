import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';

export interface ITestButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  displayText?: string;
}
export const TestButtonStyled = styled.button`
  background: pink;
  width: 40px;
  height: 20px;
`;

export const TestButton: FC<ITestButton> = (props: ITestButton) => (
  <TestButtonStyled {...props}>{props.displayText}</TestButtonStyled>
);
