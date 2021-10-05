import React, { FC } from 'react';

import { IMobileProps } from './ILoginModal';
import { MobileWrapper, MobileNumber, MobileNumberLabel } from './StyledMobile';

export const Mobile: FC<IMobileProps> = ({}: IMobileProps) => {
  return (
    <MobileWrapper>
      <MobileNumber />
      <MobileNumberLabel>Mobile Number</MobileNumberLabel>
    </MobileWrapper>
  );
};
