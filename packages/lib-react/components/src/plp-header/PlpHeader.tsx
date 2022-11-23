import React, { FC } from 'react';
import { PlpHeaderWrapper, Title } from './StyledPlpHeader';
import { IPlpHeader } from './IPlpHeader';
export const PlpHeader: FC<IPlpHeader> = ({ pageTitle }: IPlpHeader) => {
  return (
    <PlpHeaderWrapper>
      <Title>{pageTitle}</Title>
    </PlpHeaderWrapper>
  );
};
