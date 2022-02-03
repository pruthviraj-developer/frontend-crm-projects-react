import React, { FC } from 'react';
import { IHyperLinkProps } from './IHyperLink';
import { HyperLinkWrapper, HyperLinkTag } from './StyledHyperLink';
import { EMAILSIGNIN, MOBILESIGNIN } from '../../constants';

export const HyperLink: FC<IHyperLinkProps> = ({
  switchToEmailOrMobile,
  loginType,
}: IHyperLinkProps) => {
  return (
    <HyperLinkWrapper>
      <HyperLinkTag
        onClick={() => {
          switchToEmailOrMobile(
            loginType === EMAILSIGNIN ? MOBILESIGNIN : EMAILSIGNIN
          );
        }}
      >
        {loginType === MOBILESIGNIN ? 'Use Email' : 'Use Mobile'}
      </HyperLinkTag>
      {/* <Divider />
      <FaceBookIcon icon={FaceBookLinkIcon} />
      <HyperLinkTag>Continue with Facebook</HyperLinkTag> */}
    </HyperLinkWrapper>
  );
};
