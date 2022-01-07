import React, { FC } from 'react';
import { ISizeAndChartLabelsProps } from '../ISizeAndChartLabels';
import {
  SizeAndChartLabelsWrapper,
  Size,
  ViewSizeChart,
} from './StyledSizeAndChartLabels';
export const SizeAndChartLabels: FC<ISizeAndChartLabelsProps> = ({
  isOneSize,
  hasSizeChart,
  qtyLeft,
  simpleSkus,
  onSizeChartClick,
}: ISizeAndChartLabelsProps) => {
  debugger;
  return (
    <>
      {(!isOneSize ||
        hasSizeChart ||
        (qtyLeft && qtyLeft < 6) ||
        simpleSkus.length < 2) && (
        <SizeAndChartLabelsWrapper>
          <div>{!isOneSize && <Size>Size</Size>}</div>
          <div>
            {hasSizeChart && (
              <ViewSizeChart
                onClick={() => {
                  onSizeChartClick();
                }}
              >
                View size chart
              </ViewSizeChart>
            )}
          </div>
        </SizeAndChartLabelsWrapper>
      )}
    </>
  );
};
