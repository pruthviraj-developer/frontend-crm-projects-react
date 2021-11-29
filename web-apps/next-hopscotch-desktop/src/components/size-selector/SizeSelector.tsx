import React, { FC, useEffect, useState } from 'react';
import { SizeSelectorWrapper, CustomSizePicker, AngleDownArrow, SelectSize } from './StyledSizeSelector';
import { IconAngleDown } from '@hs/icons';
const SizeSelector: FC = () => {
  return (
    <SizeSelectorWrapper>
      <CustomSizePicker>
        <SelectSize>Select a size</SelectSize>
        <AngleDownArrow icon={IconAngleDown} />
      </CustomSizePicker>
    </SizeSelectorWrapper>
  );
};
export default SizeSelector;
