import React, { FC } from 'react';
import { ILoaderProps } from './ILoginModal';
import { CartLoaderWrapper, CartSpinner, Spinner, Bullet } from './StyledLoader';
export const Loader: FC<ILoaderProps> = ({}: ILoaderProps) => {
  return (
    <CartLoaderWrapper>
      <CartSpinner>
        <Spinner>
          {[...Array(4)].map((_x, _i) => (
            <Bullet></Bullet>
          ))}
        </Spinner>
      </CartSpinner>
    </CartLoaderWrapper>
  );
};
