import React, { FC, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
export interface TestButtonCoreProps extends HTMLAttributes<HTMLDivElement> {
  displayText: string;
}

const TestButtonCore: FC<TestButtonCoreProps> = (
  props: TestButtonCoreProps
) => {
  return <div className={props.className}>{props.displayText}</div>;
};

export const StyledTestButtonCore = styled(TestButtonCore)`
  background-color: pink;
  border: 5px outset black;
  width: 60px;
  height: 20px;
`;
