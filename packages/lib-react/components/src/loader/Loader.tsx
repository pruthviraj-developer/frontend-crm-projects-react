import React, { FC } from 'react';
import { LoaderWrapper, LoadingContainer, SpinningDot } from './StyledLoader';
export const Loader: FC = () => {
  return (
    <LoaderWrapper>
      <LoadingContainer>
        {[1, 2, 3, 4].map((index: number) => {
          return <SpinningDot key={index} className="dot" />;
        })}
        <SpinningDot className="dot" />
      </LoadingContainer>
    </LoaderWrapper>
  );
};
