import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { AxisIcon } from '@hs/icons';

export interface TestButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  displayText?: string;
}
export const TestButtonStyled = styled.button`
  background: red;
  width: 40px;
  height: 20px;
`;

export const TestButton: FC<TestButtonProps> = (props: TestButtonProps) => (
  <TestButtonStyled {...props}>
    {props.displayText}
    <AxisIcon></AxisIcon>
  </TestButtonStyled>
);
