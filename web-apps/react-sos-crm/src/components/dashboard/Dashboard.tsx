import React, { FC } from 'react';
import styled from '@emotion/styled';
const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;

const DashBoard: FC = () => {
  return (
    <DashBoardWrapper>
      <h1>DashBoard</h1>
    </DashBoardWrapper>
  );
};

export default DashBoard;
