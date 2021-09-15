import React, { FC } from 'react';
import { INextNavLinkProps } from './INextNavLink';
import { LinkTag } from './StyledNextNavLink';
import Link from 'next/link';

export const NextNavLink: FC<INextNavLinkProps> = ({
  href,
  name,
  queryParams,
  color = '#FFFFFF',
}: INextNavLinkProps) => {
  return (
    <Link
      href={{
        pathname: href,
        query: queryParams,
      }}
      passHref
    >
      <LinkTag color={color}>{name}</LinkTag>
    </Link>
  );
};
