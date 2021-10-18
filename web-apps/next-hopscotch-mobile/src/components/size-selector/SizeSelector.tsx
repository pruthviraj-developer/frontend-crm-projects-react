import React, { FC } from 'react';
import { SizeSelectorPopup } from '@hs/components';
import { ISizeSelectorProps } from './ISizeSelector';
import { SizeSelectorWrapper } from './StyledSizeSelector';

const SizeSelector: FC<ISizeSelectorProps> = ({
  showRfypCue,
  pinCode,
  showAddToCart,
  simpleSkus,
  selectedSku,
  addProductToCart,
  closePopup,
  onSizeSelect,
  onSizeChartClick,
  goToProductRecommendation,
}: ISizeSelectorProps) => {
  return (
    <SizeSelectorWrapper>
      <SizeSelectorPopup
        {...{
          showRfypCue,
          pinCode,
          showAddToCart,
          onSizeChartClick,
          addProductToCart,
          simpleSkus,
          selectedSku,
          onSizeSelect,
          goToProductRecommendation,
          closePopup,
        }}
      ></SizeSelectorPopup>
    </SizeSelectorWrapper>
  );
};

export default SizeSelector;
