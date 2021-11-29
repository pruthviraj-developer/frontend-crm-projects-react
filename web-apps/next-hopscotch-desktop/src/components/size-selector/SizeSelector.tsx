import React, { FC, useEffect, useState } from 'react';
import {
  SizeSelectorWrapper,
  CustomSizePicker,
  AngleDownArrow,
  DeliveryIcon,
  SelectSize,
  SelectPreview,
  OptionsPreview,
  Options,
  DeliveryDetails,
} from './StyledSizeSelector';
import { IconAngleDown, IconDeliveryTruck } from '@hs/icons';
const SizeSelector: FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<Boolean>(false);
  const showDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  return (
    <SizeSelectorWrapper>
      <CustomSizePicker border={isDropDownOpen}>
        <SelectPreview onClick={showDropDown} borderBottom={isDropDownOpen}>
          <SelectSize>Select a size</SelectSize>
          <AngleDownArrow icon={IconAngleDown} />
        </SelectPreview>
        {isDropDownOpen && (
          <OptionsPreview>
            <Options soldOut={false}>
              <span>6-12 months</span>
              <DeliveryDetails>
                <DeliveryIcon icon={IconDeliveryTruck} />
                4-5 weeks
              </DeliveryDetails>
            </Options>
            <Options soldOut={true}>6-12 months</Options>
            <Options soldOut={false}>1-2 years</Options>
            <Options soldOut={false}>2-3 years</Options>
            <Options soldOut={true}>
              <span>3-4 years</span> <span>Sold out</span>
            </Options>
          </OptionsPreview>
        )}
      </CustomSizePicker>
    </SizeSelectorWrapper>
  );
};
export default SizeSelector;
