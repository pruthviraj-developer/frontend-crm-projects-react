import React, { FC } from 'react';
import { SizeSelectorPopup } from '../size-selector-popup';
import { ISizeSelectorProps } from './ISizeSelector';
import { SizeSelectorWrapper } from './StyledSizeSelector';

const SizeSelector: FC<ISizeSelectorProps> = ({
  showRfypCue,
  pinCode,
  showAddToCart,
  onSizeChartClick,
  simpleSkus,
  selectedSku,
  onSizeSelect,
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
          simpleSkus,
          selectedSku,
          onSizeSelect,
          goToProductRecommendation,
        }}
      ></SizeSelectorPopup>
    </SizeSelectorWrapper>
  );
};

export default SizeSelector;
