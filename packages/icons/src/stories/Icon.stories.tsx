import React, { FC } from 'react';
import {
  ArchiveIcon,
  BackIcon,
  CreateIcon,
  SvgIcon,
  DashBoardIcon,
  UploadIcon,
  SelectedCircle,
  DeSelectedCircle,
  SelectedRectAngle,
  DeSelectedRectAngle,
} from '../../dist/';
import styled from '@emotion/styled';

export default {
  title: 'Icons',
  component: SvgIcon,
};
const StyledDisplay = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  align-items: center;
`;
const IconArr = [
  ArchiveIcon,
  BackIcon,
  CreateIcon,
  DashBoardIcon,
  UploadIcon,
  SelectedCircle,
  DeSelectedCircle,
  SelectedRectAngle,
  DeSelectedRectAngle,
];
export const HsCRMIcons: FC = () => (
  <StyledDisplay>
    {IconArr.map((icon, idx) => (
      <SvgIcon key={'icon' + idx} icon={icon} height={30} width="30"></SvgIcon>
    ))}
  </StyledDisplay>
);
// console.log(IconArr);
