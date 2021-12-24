import React, { FC } from 'react';
import { FaceBookLinkIcon } from '@hs/icons';
import { IHyperLinkProps } from './IHyperLink';
import { HyperLinkWrapper, HyperLinkTag, Divider, FaceBookIcon } from './StyledHyperLink';
export const HyperLink: FC<IHyperLinkProps> = () => {
  return (
    <HyperLinkWrapper>
      <HyperLinkTag>Use Email</HyperLinkTag>
      <Divider />
      <FaceBookIcon icon={FaceBookLinkIcon} />
      <HyperLinkTag>Continue with Facebook</HyperLinkTag>
    </HyperLinkWrapper>
  );
};
