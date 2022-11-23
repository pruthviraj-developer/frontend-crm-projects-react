import Image from 'next/image';
import React, { FC } from 'react';
import {
  ProductListWrapper,
  ProductPriceWrapper,
  Tags,
  Tag,
  Prices,
  ProductName,
  ProductPrice,
  QuickShopWrapper,
  ProductVendorPrice,
  ProductDiscountPrice,
  ImageContainer,
} from './StyledProductInfoDesktop';
import { formatterService } from '@hs/services';
import { IProductInfoProps } from '../IProductInfo';
import { QuickShopDesktop } from '../../plp-quick-shop/desktop/QuickShopDesktop';
export const ProductInfoDesktop: FC<IProductInfoProps> = ({
  name,
  isTile,
  pinCode,
  qtyLeft,
  quantity,
  imageUrl,
  discount,
  eddColor,
  isPresale,
  isOneSize,
  eddPrefix,
  simpleSkus,
  selectedSku,
  retailPrice,
  deliveryMsg,
  isComingSoon,
  hasSizeChart,
  eddTextColor,
  regularPrice,
  addToCart,
  onSizeSelect,
  openSizeChart,
  disableQuickShop,
  disableAddToCart,
  sizePickerDropdownLabel,
}: IProductInfoProps) => {
  const showRegularPrice = () => {
    return regularPrice > retailPrice ? true : false;
  };

  const showDiscount = () => {
    if (regularPrice > retailPrice) {
      if (discount > 5) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const isQuantityLeft = () =>
    quantity && quantity < 4 && quantity > 0 && isComingSoon === false
      ? true
      : false;

  return (
    <ProductListWrapper
      onMouseLeave={() => {
        onSizeSelect();
      }}
    >
      <ImageContainer>
        <Image
          layout="fill"
          className="plpImage"
          loader={({ src, width }) => `${src}&tr=w-${width},c-at_max,n-medium`}
          draggable={false}
          src={imageUrl}
          alt={name}
        />
      </ImageContainer>

      {isTile ? (
        <></>
      ) : (
        <Tags>
          {isPresale ? <Tag bgActive={true}>Pre-order</Tag> : <></>}
          {isQuantityLeft() ? (
            <Tag className="qty-left">{`${quantity} left`}</Tag>
          ) : (
            <></>
          )}
          {quantity || isComingSoon ? (
            <></>
          ) : (
            <Tag className="sold-out">Sold out</Tag>
          )}
        </Tags>
      )}
      {disableQuickShop ? (
        <></>
      ) : (
        <QuickShopWrapper className={'quick-shop'}>
          <QuickShopDesktop
            {...{
              eddColor,
              pinCode,
              qtyLeft,
              isOneSize,
              eddPrefix,
              deliveryMsg,
              hasSizeChart,
              eddTextColor,
              selectedSku,
              simpleSkus,
              addToCart,
              onSizeSelect,
              openSizeChart,
              disableAddToCart,
              sizePickerDropdownLabel,
            }}
          />
        </QuickShopWrapper>
      )}
      <ProductPriceWrapper>
        <ProductName>{name}</ProductName>
        {isComingSoon ? (
          <></>
        ) : (
          <Prices key={retailPrice + regularPrice + discount}>
            <ProductPrice>
              ₹{formatterService.getFormattedPrice(retailPrice)}
            </ProductPrice>
            {showRegularPrice() && (
              <ProductVendorPrice>
                ₹{formatterService.getFormattedPrice(regularPrice)}
              </ProductVendorPrice>
            )}
            {showDiscount() && (
              <ProductDiscountPrice>({discount}% off)</ProductDiscountPrice>
            )}
          </Prices>
        )}
      </ProductPriceWrapper>
    </ProductListWrapper>
  );
};
