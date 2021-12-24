import React, { FC } from 'react';
import { FaceBookLinkIcon } from '@hs/icons';
import { IHyperLinkProps } from './IHyperLink';
import { HyperLinkWrapper, HyperLinkTag, Divider, FaceBookIcon } from './StyledHyperLink';
import { EMAILSIGNIN, MOBILESIGNIN } from '../../constants';

export const HyperLink: FC<IHyperLinkProps> = ({ switchToEmailOrMobile, loginType }: IHyperLinkProps) => {
  return (
    <HyperLinkWrapper>
      <HyperLinkTag
        onClick={() => {
          switchToEmailOrMobile(loginType === EMAILSIGNIN ? MOBILESIGNIN : EMAILSIGNIN);
        }}
      >
        {loginType === MOBILESIGNIN ? 'Use Email' : 'Use Mobile'}
      </HyperLinkTag>
      <Divider />
      <FaceBookIcon icon={FaceBookLinkIcon} />
      <HyperLinkTag>Continue with Facebook</HyperLinkTag>
    </HyperLinkWrapper>
  );
};
