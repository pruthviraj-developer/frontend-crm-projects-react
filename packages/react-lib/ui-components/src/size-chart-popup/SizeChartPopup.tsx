import React, { FC } from 'react';
import { ISizeChartPopup } from './ISizeChartPopup';
import {
  SizeChartWrapper,
  SizeChartHeader,
  SizeChartHeaderTitle,
  SizeChartHeaderCloseIcon,
  SizeChartCloseIcon,
} from './StyledSizeChartPopup';
import { IconClose } from '@hs/icons';
export const SizeChartPopup: FC<ISizeChartPopup> = ({}: ISizeChartPopup) => {
  return (
    <SizeChartWrapper>
      <SizeChartHeader>
        <SizeChartHeaderTitle>SIZE CHART</SizeChartHeaderTitle>
        <SizeChartHeaderCloseIcon>
          <SizeChartCloseIcon icon={IconClose}></SizeChartCloseIcon>
        </SizeChartHeaderCloseIcon>
      </SizeChartHeader>
    </SizeChartWrapper>
  );
};
