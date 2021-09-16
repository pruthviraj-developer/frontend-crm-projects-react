import React, { FC } from 'react';
import { INextNavLinkProps } from './INextNavLink';
import { LinkTag } from './StyledNextNavLink';
import Link from 'next/link';

export const NextNavLink: FC<INextNavLinkProps> = ({
  href,
  name,
  display = 'inherit',
  queryParams,
  color = '#FFFFFF',
  padding = '8px 6px',
  margin = '16px 0 0 0',
}: INextNavLinkProps) => {
  return (
    <Link
      href={{
        pathname: href,
        query: queryParams,
      }}
      passHref
    >
      <LinkTag
        color={color}
        display={display}
        margin={margin}
        padding={padding}
      >
        {name}
      </LinkTag>
    </Link>
  );
};
