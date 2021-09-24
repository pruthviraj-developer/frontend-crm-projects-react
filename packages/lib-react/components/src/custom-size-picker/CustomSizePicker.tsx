import React, { FC } from 'react';
import { ICustomSizePicker } from './ICustomSizePicker';
import {
  CustomSizeWrapper,
  Size,
  Sizes,
  SizePill,
  LeftQuantity,
} from './StyledCustomSizePicker';

export const CustomSizePicker: FC<ICustomSizePicker> = ({
  isSelected,
  selectedSkuId,
  simpleSkus = [],
  skuAttributes = [],
}: ICustomSizePicker) => {
  return (
    <CustomSizeWrapper>
      <Sizes>
        {simpleSkus &&
          simpleSkus.map((sku, index) => {
            return (
              <SizePill key={index}>
                <Size
                  selected={isSelected && sku.skuId === selectedSkuId}
                  disabled={sku.availableQuantity == 0}
                >
                  {skuAttributes[index].size}
                </Size>
                {isSelected &&
                  sku.availableQuantity > 0 &&
                  sku.availableQuantity < 4 &&
                  sku.skuId === selectedSkuId && (
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
