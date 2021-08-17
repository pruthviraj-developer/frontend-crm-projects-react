import React, { FC } from 'react';
import { ICustomSizePicker } from './ICustomSizePicker';
import {
  CustomSizeWrapper,
  Size,
  Sizes,
  SizePill,
} from './StyledCustomSizePicker';

export const CustomSizePicker: FC<ICustomSizePicker> =
  ({}: ICustomSizePicker) => {
    return (
      <CustomSizeWrapper>
        <Sizes>
          <SizePill>
            <Size selected={false}>2-4 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={true}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>4-6 years</Size>
          </SizePill>
          <SizePill>
            <Size selected={false}>6-8 years</Size>
          </SizePill>
        </Sizes>
      </CustomSizeWrapper>
    );
  };
