import React, { FC } from 'react';
import { ICustomSizePicker } from './ICustomSizePicker';
import {
  CustomSizeWrapper,
  Size,
  Sizes,
  SizePill,
  LeftQuantity,
} from './StyledCustomSizePicker';

export const CustomSizePicker: FC<ICustomSizePicker> = (
  props: ICustomSizePicker
) => {
  return (
    <CustomSizeWrapper>
      <Sizes>
        {props.simpleSkus &&
          props.simpleSkus.map((sku, index) => {
            return (
              <SizePill key={index}>
                <Size
                  selected={
                    props.isSelected && sku.skuId === props.selectedSkuId
                  }
                  disabled={sku.availableQuantity == 0}
                >
                  {sku.attributes.size}
                </Size>
                {props.isSelected &&
                  sku.availableQuantity > 0 &&
                  sku.availableQuantity < 4 &&
                  sku.skuId === props.selectedSkuId && (
                    <LeftQuantity>
                      Only {sku.availableQuantity} left
                    </LeftQuantity>
                  )}
              </SizePill>
            );
          })}
      </Sizes>
    </CustomSizeWrapper>
  );
};
//   <div class="size-pill" ng-class="{'first': $first, 'last': $last}"
//   ng-repeat="sku in vm.productDetail.simpleSkus track by sku.skuId">
//   <span class="size"
//       ng-class="{'selected': (isSelected && sku.skuId === vm.selectedSkuId), 'disabled': sku.availableQuantity == 0}"
//       ng-bind="::sku.attributes.size"
//       ng-click="vm.updateProductDetail(sku, null, null, vm.sizeListUpfront)">
//   </span>
//   <div class="left-qty"
//       ng-show="isSelected && sku.availableQuantity > 0 && sku.availableQuantity < 4 && sku.skuId === vm.selectedSkuId"
//       ng-bind="'Only '+ sku.availableQuantity +' left'"></div>
// </div>

// isSelected
// selectedSkuId
// sizeListUpfront
