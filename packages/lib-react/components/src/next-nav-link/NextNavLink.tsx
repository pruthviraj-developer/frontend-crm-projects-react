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
  fontWeight = 'inherit',
  fontSize = '1.4rem',
  lineHeight = '16px',
  hoverOpacity = '1',
  hoverColor,
}: INextNavLinkProps) => {
  return (
    <Link
      href={{
        pathname: href,
        query: queryParams,
      }}
      passHref={true}
    >
      <LinkTag
        color={color}
        display={display}
        margin={margin}
        padding={padding}
        fontweight={fontWeight}
        fontsize={fontSize}
        lineHeight={lineHeight}
        hoverColor={hoverColor}
        hoverOpacity={hoverOpacity}
      >
        {name}
      </LinkTag>
    </Link>
  );
};
