import React, { FC } from 'react';
import { ISizeAndChartLabelsProps } from './ISizeAndChartLabels';
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
}: ISizeAndChartLabelsProps) => {
  return (
    <>
      {(!isOneSize || hasSizeChart || qtyLeft < 6 || simpleSkus.length < 2) && (
        <SizeAndChartLabelsWrapper>
          <div>{!isOneSize && <Size>Size</Size>}</div>
          <div>
            {hasSizeChart && <ViewSizeChart>View size chart</ViewSizeChart>}
          </div>
        </SizeAndChartLabelsWrapper>
      )}
    </>
  );
};

//   <div class="row qty-chart"
//   ng-if="!vm.productDetail.isOneSize || vm.productDetail.hasSizeChart"
//    ng-show="vm.productForm.qtyLeft < 6 || vm.productDetail.hasSizeChart || !vm.productDetail.isOneSize || vm.productDetail.simpleSkus.length < 2">
//   <div class="medium-6 large-6 small-6 columns">
//       <span class="float-left">
//           <span ng-hide="vm.productDetail.isOneSize">Size </span>
//       </span>
//   </div>
//   <div class="medium-6 large-6 small-6 columns">
//       <span class="size-chart float-right" ng-if="::vm.productDetail.hasSizeChart" ng-click="vm.showSizeChart()">
//           View size chart
//       </span>
//   </div>
// </div>
