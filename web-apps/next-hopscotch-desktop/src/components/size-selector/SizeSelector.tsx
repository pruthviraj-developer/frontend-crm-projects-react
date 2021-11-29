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
            <Options>
              <span>6-12 months</span>
              <DeliveryDetails>
                <DeliveryIcon icon={IconDeliveryTruck} />
                4-5 weeks
              </DeliveryDetails>
            </Options>
            <Options>6-12 months</Options>
            <Options>1-2 years</Options>
            <Options>2-3 years</Options>
          </OptionsPreview>
        )}
      </CustomSizePicker>
    </SizeSelectorWrapper>
  );
};
export default SizeSelector;
