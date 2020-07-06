import React, { FC } from 'react';

export const BackIcon: FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 48 1" {...props}>
      <title>{'Rectangle 5'}</title>
      <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
    </svg>
  );
};
