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
  SizeChartDetailsWrapper,
  SizeChartDetailImage,
  SizeChartDetailImages,
  ChartDetailImageIllustration,
  ImageLink,
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
        <SizeChartDetailsWrapper>
          <SizeChartDetailImages>
            <SizeChartDetailImage>
              <ChartDetailImageIllustration src="https://static.hopscotch.in/fstatic/product/201507/472d2b7a-7975-4987-8b4f-3f8047596c58_full.png?version=1436881619676" />
              <ImageLink src="https://static.hopscotch.in/fstatic/product/201507/0f961c44-681a-48ed-bef7-ff9712c7af66_full.png?version=1437372200395" />
              <ImageLink src="https://static.hopscotch.in/fstatic/product/201507/ed6f256e-b839-4974-95ea-4cc5280ecfa0_full.png?version=1437372205447" />
            </SizeChartDetailImage>
          </SizeChartDetailImages>
        </SizeChartDetailsWrapper>
      </SizeChartHeaderWrapper>
    </SizeChartWrapper>
  );
};
