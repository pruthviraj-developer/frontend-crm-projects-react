import React, { FC } from 'react';
import { IconRadio, IconRadioActive } from '@hs/icons';
import { ISizeSelectorPopupProps } from './ISizeSelectorPopup';
import { AddToCart } from '@hs/components';
import { ISimpleSkusEntityProps } from '@hs/framework';
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
  DeliveryPincodeContainer,
  DeliveryPincode,
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
  showAddToCart,
  goToProductRecommendation,
  onSizeChartClick,
  onSizeSelect,
}: ISizeSelectorPopupProps) => {
  return (
    <SizeSelectorPopupWrapper>
      {showRfypCue && (
        <SeeSimilarProducts>
          <SizeSoldOut>Size sold out?</SizeSoldOut>
          <SeeSimilar
            onClick={() => {
              goToProductRecommendation('Add to cart');
            }}
          >
            See similar products
          </SeeSimilar>
        </SeeSimilarProducts>
      )}
      <SizeWrapper>
        {pinCode && (
          <DeliveryPincodeContainer>
            <DeliveryPincode>Delivery to {pinCode}</DeliveryPincode>
          </DeliveryPincodeContainer>
        )}
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
          {simpleSkus &&
            simpleSkus.map((sku: ISimpleSkusEntityProps, index: number) => {
              const isSelected = sku.skuId === selectedSku.skuId;
              return (
                <Option
                  key={index}
                  selected={isSelected}
                  onClick={() => {
                    if (sku.availableQuantity > 0) {
                      onSizeSelect(sku);
                    }
                  }}
                >
                  <SizeSelector selected={isSelected}>
                    <SizeLabel>{sku.attributes.size}</SizeLabel>
                    <SoldOutWrapper>
                      {sku.availableQuantity < 1 && <SoldOut>Sold out</SoldOut>}
                      <SvgIconsElement icon={isSelected ? IconRadioActive : IconRadio} />
                    </SoldOutWrapper>
                  </SizeSelector>
                  {sku.availableQuantity > 0 && isSelected && (
                    <DeliveryMessageWrapper>
                      <DeliveryMessage>{sku.eddPrefix + ' ' + sku.deliveryMsg}</DeliveryMessage>
                      {sku.availableQuantity < 4 && sku.availableQuantity > 0 && (
                        <>
                          <DeliveryMessageOval></DeliveryMessageOval>
                          <QuantityLeftOut>{sku.availableQuantity} left</QuantityLeftOut>
                        </>
                      )}
                    </DeliveryMessageWrapper>
                  )}
                </Option>
              );
            })}
          {/* <Option selected={false}>
            <SizeSelector>
              <SizeLabel>1-2 years</SizeLabel>
              <SvgIconsElement icon={IconRadio} />
            </SizeSelector>
          </Option> */}
        </OptionsContainer>
        <AddToCart {...{ show: showAddToCart || false, disabled: !selectedSku.skuId }}></AddToCart>
      </SizeWrapper>
    </SizeSelectorPopupWrapper>
  );
};
