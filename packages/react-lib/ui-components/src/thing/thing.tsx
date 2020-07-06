import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { BackIcon } from '@hs/icons';
export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Thing: FC<Props> = ({ children }) => {
  return (
    <div>
      {children || `the snozzberries taste like snozzberries Rishikant ji `}
      <BackIcon color={'#fcba03'} width={'100px'} height={'40px'}/>
    </div>
  );
};
