import React, { FC ,HTMLAttributes} from 'react'
import styled from '@emotion/styled';
export interface ITestButtonCore extends HTMLAttributes<HTMLDivElement> {
  displayText: String;
}


const TestButtonCore: FC<ITestButtonCore> = (props: ITestButtonCore) => {
  return (
    <div className={props.className}>{props.displayText}</div>
  );
};

export const StyledTestButtonCore = styled(TestButtonCore)`
background-color:pink;
border: 5px outset black;
width: 60px;
height: 20px;
`;
