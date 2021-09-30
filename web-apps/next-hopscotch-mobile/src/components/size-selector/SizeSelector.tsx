import React, { FC } from 'react';
import { SizeSelectorPopup } from '../size-selector-popup';
import { ISizeSelectorProps } from './ISizeSelector';
import { SizeSelectorWrapper } from './StyledSizeSelector';

const SizeSelector: FC<ISizeSelectorProps> = ({
  showRfypCue,
  pinCode,
  showAddToCart,
  simpleSkus,
  selectedSku,
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
