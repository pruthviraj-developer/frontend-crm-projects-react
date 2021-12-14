import React, { FC } from 'react';
import { IconRadio, IconRadioActive } from '@hs/icons';
import { ISizeSelectorPopupProps } from '../ISizeSelectorPopup';
import { AddToCart } from '../../add-to-cart';
import { ISimpleSkusEntityProps } from '@hs/framework';
import {
  SizeSelectorPopupWrapper,
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
  SizeSelectorWrapper,
} from './StyledSizeSelectorPopup';
const ADD_TO_CART_BUTTON = 'Add to cart button';
const SizeSelectorMobile: FC<ISizeSelectorPopupProps> = ({
  pinCode,
  simpleSkus,
  selectedSku,
  showAddToCart,
  addProductToCart,
  onSizeChartClick,
  onSizeSelect,
  closePopup,
}: ISizeSelectorPopupProps) => {
  const selectedSkuId = selectedSku && selectedSku.skuId;
  const addProduct = () => {
    closePopup();
    addProductToCart();
  };
  return (
    <SizeSelectorWrapper>
      <SizeSelectorPopupWrapper>
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
              View size chart
            </ViewSizeChart>
          </Header>
          <OptionsContainer>
            {simpleSkus &&
              simpleSkus.map((sku: ISimpleSkusEntityProps, index: number) => {
                const isSelected = sku.skuId === selectedSkuId;
                return (
                  <Option
                    key={index}
                    selected={isSelected}
                    onClick={() => {
                      if (sku.availableQuantity > 0) {
                        onSizeSelect(sku, ADD_TO_CART_BUTTON);
                      }
                    }}
                  >
                    <SizeSelector selected={isSelected}>
                      <SizeLabel>{sku.attributes.size}</SizeLabel>
                      <SoldOutWrapper>
                        {sku.availableQuantity < 1 && (
                          <SoldOut>Sold out</SoldOut>
                        )}
                        <SvgIconsElement
                          icon={isSelected ? IconRadioActive : IconRadio}
                        />
                      </SoldOutWrapper>
                    </SizeSelector>
                    {sku.availableQuantity > 0 && isSelected && (
                      <DeliveryMessageWrapper>
                        <DeliveryMessage>
                          {sku.eddPrefix + ' ' + sku.deliveryMsg}
                        </DeliveryMessage>
                        {sku.availableQuantity < 4 &&
                          sku.availableQuantity > 0 && (
                            <>
                              <DeliveryMessageOval></DeliveryMessageOval>
                              <QuantityLeftOut>
                                {sku.availableQuantity} left
                              </QuantityLeftOut>
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
          <AddToCart
            {...{
              show: showAddToCart || false,
              addProductToCart: addProduct,
              disabled: !selectedSkuId,
            }}
          ></AddToCart>
        </SizeWrapper>
      </SizeSelectorPopupWrapper>
    </SizeSelectorWrapper>
  );
};
export default SizeSelectorMobile;
