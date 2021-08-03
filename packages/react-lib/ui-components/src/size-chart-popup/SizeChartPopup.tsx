import React, { FC } from 'react';
import { ISizeChartPopup } from './ISizeChartPopup';
import {
  SizeChartWrapper,
  SizeChartHeaderWrapper,
  SizeChartHeader,
  SizeChartHeaderTitle,
  SizeChartHeaderProductName,
  SizeChartHeaderCloseIcon,
  SizeChartCloseIcon,
} from './StyledSizeChartPopup';
import { IconClose } from '@hs/icons';
export const SizeChartPopup: FC<ISizeChartPopup> = ({}: ISizeChartPopup) => {
  return (
    <SizeChartWrapper>
      <SizeChartHeaderWrapper>
        <SizeChartHeader>
          <SizeChartHeaderTitle>SIZE CHART</SizeChartHeaderTitle>
          <SizeChartHeaderCloseIcon>
            <SizeChartCloseIcon
              icon={IconClose}
              fill={'#bbb'}
            ></SizeChartCloseIcon>
          </SizeChartHeaderCloseIcon>
        </SizeChartHeader>
        <SizeChartHeaderProductName>
          Black Solid Jeans
        </SizeChartHeaderProductName>
      </SizeChartHeaderWrapper>
    </SizeChartWrapper>
  );
};
