import React, { FC } from 'react';
import { ISizeAndChartLabelsProps } from '../ISizeAndChartLabels';
import {
  SizeAndChartLabelsWrapperDesktop,
  SizeDesktop,
  ViewSizeChartDesktop,
} from './StyledSizeAndChartLabelsDesktop';
export const SizeAndChartLabelsDesktop: FC<ISizeAndChartLabelsProps> = ({
  isOneSize,
  hasSizeChart,
  qtyLeft,
  simpleSkus,
  onSizeChartClick,
}: ISizeAndChartLabelsProps) => {
  return (
    <>
      {(!isOneSize ||
        hasSizeChart ||
        (qtyLeft && qtyLeft < 6) ||
        simpleSkus.length < 2) && (
        <SizeAndChartLabelsWrapperDesktop>
          <div>{!isOneSize && <SizeDesktop>Size</SizeDesktop>}</div>
          <div>
            {hasSizeChart && (
              <ViewSizeChartDesktop
                onClick={() => {
                  onSizeChartClick();
                }}
              >
                View size chart
              </ViewSizeChartDesktop>
            )}
          </div>
        </SizeAndChartLabelsWrapperDesktop>
      )}
    </>
  );
};
