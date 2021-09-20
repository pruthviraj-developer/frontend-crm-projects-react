import React, { FC } from 'react';
import {
  ProductPricingWrapper,
  ProductNamePriceWrapper,
  ProductName,
  ProductPrice,
  ProductOfferPrice,
  ProductVendorPrice,
  ProductDiscountPrice,
  ProductSold,
  WishListWrapper,
  WishListIcon,
} from './StyledProductNamePrice';
import { IProductNamePriceProps } from './IProductNamePrice';
import { IconWishList } from '@hs/icons';
export const ProductNamePrice: FC<IProductNamePriceProps> = ({
  name,
  retailPrice,
  retailPriceMax,
  regularPrice,
  discount,
  selectedSku,
  isProductSoldOut,
}: IProductNamePriceProps) => {
  if (retailPrice) {
    return (
      <>
        {isProductSoldOut && <ProductSold>Sold out</ProductSold>}
        <ProductPricingWrapper>
          <ProductNamePriceWrapper>
            <ProductPrice>₹{retailPrice}</ProductPrice>
            {retailPriceMax &&
              !selectedSku &&
              retailPrice != retailPriceMax && (
                <ProductPrice> - ₹{retailPriceMax}</ProductPrice>
              )}
            {!(retailPriceMax && !selectedSku) && (
              <>
                {regularPrice > retailPrice && discount > 2 && (
                  <ProductOfferPrice>
                    <ProductVendorPrice>₹{regularPrice}</ProductVendorPrice>
                    <ProductDiscountPrice>{discount}% off</ProductDiscountPrice>
                  </ProductOfferPrice>
                )}
              </>
            )}
            <ProductName>{name}</ProductName>
          </ProductNamePriceWrapper>
          <WishListWrapper>
            <WishListIcon icon={IconWishList} fill={'#bbb'} />
          </WishListWrapper>
        </ProductPricingWrapper>
      </>
    );
  }
  return <div style={{ display: 'none' }}></div>;
};
