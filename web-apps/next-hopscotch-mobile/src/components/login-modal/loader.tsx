import React, { FC } from 'react';
import { CartLoaderWrapper, CartSpinner, Spinner, Bullet } from './StyledLoader';
export const Loader: FC = () => {
  return (
    <CartLoaderWrapper>
      <CartSpinner>
        <Spinner>
          {[...Array(4)].map((_, i) => (
            <Bullet key={'loader_' + i}></Bullet>
          ))}
        </Spinner>
      </CartSpinner>
    </CartLoaderWrapper>
  );
};
