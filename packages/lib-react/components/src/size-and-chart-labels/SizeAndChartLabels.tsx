import React, { FC } from 'react';
import { ISizeAndChartLabelsProps } from './ISizeAndChartLabels';
import {
  SizeAndChartLabelsWrapper,
  Size,
  ViewSizeChart,
} from './StyledSizeAndChartLabels';
export const SizeAndChartLabels: FC<ISizeAndChartLabelsProps> =
  ({}: ISizeAndChartLabelsProps) => {
    return (
      <SizeAndChartLabelsWrapper>
        <div>
          <Size>Size</Size>
        </div>
        <div>
          <ViewSizeChart>View size chart</ViewSizeChart>
        </div>
      </SizeAndChartLabelsWrapper>
    );
  };
