import { IQuickShopProps } from 'plp-product-info/IProductInfo';
import React, { FC } from 'react';
import {
  Size,
  GetItIn,
  SizeLabel,
  AddToCart,
  SizeDetails,
  QuantityLeft,
  SizeSelector,
  ViewSizeChart,
  QuickShopWrapper,
} from './StyledQuickShopDesktop';
export const QuickShopDesktop: FC<IQuickShopProps> = ({
  eddColor,
  pinCode,
  qtyLeft,
  addToCart,
  isOneSize,
  eddPrefix,
  simpleSkus,
  deliveryMsg,
  selectedSku,
  hasSizeChart,
  eddTextColor,
  onSizeSelect,
  openSizeChart,
  disableAddToCart,
  sizePickerDropdownLabel,
}: IQuickShopProps) => {
  const getEddTitle = () => {
    const eddTextMsg = `${eddPrefix} ${deliveryMsg} ${
      pinCode ? ' to ' + pinCode : ''
    }`;
    if (selectedSku) {
      return eddTextMsg;
    } else if (sizePickerDropdownLabel && sizePickerDropdownLabel.length) {
      return sizePickerDropdownLabel;
    }
    return eddTextMsg;
  };

  return (
    <QuickShopWrapper
      className="fadeQuickShop"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
      }}
    >
      <GetItIn eddTextColor={eddTextColor} eddColor={eddColor}>
        {getEddTitle()}
      </GetItIn>
      {isOneSize && !hasSizeChart ? (
        <></>
      ) : (
        <SizeDetails>
          <SizeLabel>
            {isOneSize ? <></> : 'Select a size'}
            {qtyLeft && qtyLeft > 0 && qtyLeft < 4 && selectedSku?.skuId ? (
              <QuantityLeft>{qtyLeft} left</QuantityLeft>
            ) : (
              <></>
            )}
          </SizeLabel>
          {hasSizeChart ? (
            <ViewSizeChart
              onClick={() => {
                openSizeChart('Select size');
              }}
            >
              VIEW SIZE CHART
            </ViewSizeChart>
          ) : (
            <></>
          )}
        </SizeDetails>
      )}
      {isOneSize ? (
        <></>
      ) : (
        <SizeSelector>
          {simpleSkus.map((sku, index: number) => (
            <Size
              key={index}
              className={`${sku.availableQuantity == 0 ? 'disabled ' : ''} ${
                sku.skuId === selectedSku?.skuId ? 'selected' : ''
              }`}
              onClick={() => {
                if (sku.availableQuantity) {
                  onSizeSelect(sku);
                }
              }}
            >
              {sku.attributes.size}
            </Size>
          ))}
        </SizeSelector>
      )}
      <AddToCart
        className={`${disableAddToCart ? 'disabled ' : ''} ${
          selectedSku?.skuId ? '' : 'disabled'
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (selectedSku?.skuId) {
            addToCart(selectedSku);
          }
        }}
      >
        Add to cart
      </AddToCart>
    </QuickShopWrapper>
  );
};
