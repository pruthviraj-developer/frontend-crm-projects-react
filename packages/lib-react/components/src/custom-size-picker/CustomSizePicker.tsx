import React, { FC } from 'react';
import { ICustomSizePicker } from './ICustomSizePicker';
import {
  CustomSizeWrapper,
  Size,
  Sizes,
  SizePill,
  LeftQuantity,
} from './StyledCustomSizePicker';
const SIZE_LIST_UPFRONT = 'Size list upfront';
export const CustomSizePicker: FC<ICustomSizePicker> = ({
  onSizeSelect,
  selectedSku,
  simpleSkus,
}: ICustomSizePicker) => {
  return (
    <CustomSizeWrapper>
      <Sizes>
        {simpleSkus &&
          simpleSkus.map((sku, index) => {
            const isSelected = sku.skuId === (selectedSku && selectedSku.skuId);
            return (
              <SizePill
                key={index}
                onClick={() => {
                  if (sku.availableQuantity > 0) {
                    onSizeSelect(sku, SIZE_LIST_UPFRONT);
                  }
                }}
              >
                <Size
                  selected={isSelected}
                  disabled={sku.availableQuantity == 0}
                >
                  {sku.attributes.size}
                </Size>
                {isSelected &&
                  sku.availableQuantity > 0 &&
                  sku.availableQuantity < 4 && (
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
