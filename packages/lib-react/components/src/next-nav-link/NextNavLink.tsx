import React, { FC } from 'react';
import { INextNavLinkProps } from './INextNavLink';
import { LinkTag } from './StyledNextNavLink';
import Link from 'next/link';

export const NextNavLink: FC<INextNavLinkProps> = ({
  href,
  name,
  color = '#FFFFFF',
}: INextNavLinkProps) => {
  return (
    <Link href={href} passHref>
      <LinkTag color={color}>{name}</LinkTag>
    </Link>
  );
};
