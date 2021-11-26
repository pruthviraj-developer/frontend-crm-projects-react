import React, { FC } from 'react';
import { ISizeAndChartLabelsDesktopProps } from './ISizeAndChartLabelsDesktop';
import {
  SizeAndChartLabelsWrapperDesktop,
  SizeDesktop,
  ViewSizeChartDesktop,
} from './StyledSizeAndChartLabelsDesktop';
export const SizeAndChartLabelsDesktop: FC<ISizeAndChartLabelsDesktopProps> = ({
  isOneSize,
  hasSizeChart,
  qtyLeft,
  simpleSkus,
  onSizeChartClick,
}: ISizeAndChartLabelsDesktopProps) => {
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
