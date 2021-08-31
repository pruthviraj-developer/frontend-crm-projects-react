import React, { FC } from 'react';
import { INextNavLinkProps } from './INextNavLink';
import { LinkTag } from './StyledNextNavLink';
import Link from 'next/link';

export const NextNavLink: FC<INextNavLinkProps> = ({
  href,
  name,
}: INextNavLinkProps) => {
  return (
    <Link href={href} passHref>
      <LinkTag>{name}</LinkTag>
    </Link>
  );
};
