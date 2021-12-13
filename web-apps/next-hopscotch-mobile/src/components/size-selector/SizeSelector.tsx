import React, { FC } from 'react';
import { SizeSelectorPopup } from '@hs/components';
import { ISizeSelectorProps } from './ISizeSelector';
import { SizeSelectorWrapper } from './StyledSizeSelector';

const SizeSelector: FC<ISizeSelectorProps> = ({
  pinCode,
  showAddToCart,
  simpleSkus,
  selectedSku,
  addProductToCart,
  closePopup,
  onSizeSelect,
  onSizeChartClick,
}: ISizeSelectorProps) => {
  return (
    <SizeSelectorWrapper>
      <SizeSelectorPopup
        {...{
          pinCode,
          showAddToCart,
          onSizeChartClick,
          addProductToCart,
          simpleSkus,
          selectedSku,
          onSizeSelect,
          closePopup,
        }}
      ></SizeSelectorPopup>
    </SizeSelectorWrapper>
  );
};

export default SizeSelector;
