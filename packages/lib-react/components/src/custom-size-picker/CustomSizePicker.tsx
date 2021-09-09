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
