import React, { FC } from 'react';
import { IconRadio, IconRadioActive } from '@hs/icons';
import { ISizeSelectorPopupProps } from './ISizeSelectorPopup';
import { AddToCart } from '../add-to-cart';
import {
  SizeSelectorPopupWrapper,
  SeeSimilarProducts,
  SizeSoldOut,
  SeeSimilar,
  SizeWrapper,
  Header,
  Size,
  ViewSizeChart,
  OptionsContainer,
  Option,
  SizeLabel,
  SvgIconsElement,
  SizeSelector,
  SoldOutWrapper,
  SoldOut,
  DeliveryMessageWrapper,
  DeliveryMessage,
  DeliveryMessageOval,
  QuantityLeftOut,
} from './StyledSizeSelectorPopup';
export const SizeSelectorPopup: FC<ISizeSelectorPopupProps> = ({
  showRfypCue,
  pinCode,
  simpleSkus,
  selectedSku,
  onSizeChartClick,
}: ISizeSelectorPopupProps) => {
  console.log(showRfypCue, pinCode, simpleSkus, selectedSku);
  return (
    <SizeSelectorPopupWrapper>
      <SeeSimilarProducts>
        <SizeSoldOut>Size sold out?</SizeSoldOut>
        <SeeSimilar>See similar products</SeeSimilar>
      </SeeSimilarProducts>
      <SizeWrapper>
        <Header>
          <Size>Size</Size>
          <ViewSizeChart
            onClick={() => {
              onSizeChartClick();
            }}
          >
            {' '}
            View size chart
          </ViewSizeChart>
        </Header>
        <OptionsContainer>
          <Option selected={true}>
            <SizeSelector>
              <SizeLabel>6-12 months</SizeLabel>
              <SvgIconsElement icon={IconRadio} />
            </SizeSelector>
            <DeliveryMessageWrapper>
              <DeliveryMessage>Get it in 4-5 weeks</DeliveryMessage>
              <DeliveryMessageOval></DeliveryMessageOval>
              <QuantityLeftOut>1 left</QuantityLeftOut>
            </DeliveryMessageWrapper>
          </Option>
          <Option selected={false}>
            <SizeSelector>
              <SizeLabel>1-2 years</SizeLabel>
              <SvgIconsElement icon={IconRadio} />
            </SizeSelector>
          </Option>
          <Option selected={true}>
            <SizeSelector>
              <SizeLabel>1-2 years</SizeLabel>
              <SvgIconsElement icon={IconRadioActive} />
            </SizeSelector>
            <DeliveryMessageWrapper>
              <DeliveryMessage>Get it in 4-5 days</DeliveryMessage>
            </DeliveryMessageWrapper>
          </Option>
          <Option selected={false}>
            <SizeSelector>
              <SizeLabel>6-12 months</SizeLabel>
              <SoldOutWrapper>
                <SoldOut>Sold out</SoldOut>
                <SvgIconsElement icon={IconRadio} />
              </SoldOutWrapper>
            </SizeSelector>
          </Option>
        </OptionsContainer>
        <AddToCart {...{ show: true, disabled: false }}></AddToCart>
      </SizeWrapper>
    </SizeSelectorPopupWrapper>
  );
};
