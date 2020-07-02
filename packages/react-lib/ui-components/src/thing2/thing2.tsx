import React, { FC, HTMLAttributes, ReactChild } from 'react';
export interface Thing2Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Thing2: FC<Thing2Props> = ({ children }) => {
  return <div>{children || `Thing2 Testing  Rishikant `}</div>;
};
