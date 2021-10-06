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
import { IconWishList, IconWishListFilled } from '@hs/icons';
export const ProductNamePrice: FC<IProductNamePriceProps> = ({
  productName,
  retailPrice,
  retailPriceMax,
  regularPrice,
  discount,
  selectedSku,
  isProductSoldOut,
  wishlistId = 0,
  addToWishlist,
  deleteFromWishlist,
}: IProductNamePriceProps) => {
  if (retailPrice) {
    return (
      <>
        {isProductSoldOut && <ProductSold>Sold out</ProductSold>}
        <ProductPricingWrapper>
          <ProductNamePriceWrapper>
            <ProductPrice>₹{retailPrice.toLocaleString('en-IN')}</ProductPrice>
            {retailPriceMax &&
              retailPriceMax > 0 &&
              !selectedSku &&
              retailPrice != retailPriceMax && (
                <ProductPrice>
                  - ₹{retailPriceMax.toLocaleString('en-IN')}
                </ProductPrice>
              )}
            {!(retailPriceMax && !selectedSku) &&
              discount &&
              discount > 2 &&
              regularPrice &&
              regularPrice > retailPrice && (
                <ProductOfferPrice>
                  <ProductVendorPrice>
                    ₹{regularPrice.toLocaleString('en-IN')}
                  </ProductVendorPrice>
                  <ProductDiscountPrice>{discount}% off</ProductDiscountPrice>
                </ProductOfferPrice>
              )}
            <ProductName>{productName}</ProductName>
          </ProductNamePriceWrapper>
          <WishListWrapper>
            <WishListIcon
              selected={wishlistId}
              onClick={() => {
                if (wishlistId) {
                  deleteFromWishlist();
                  return;
                }
                addToWishlist();
              }}
              icon={wishlistId ? IconWishListFilled : IconWishList}
              fill={wishlistId ? '#ED54A4' : '#bbb'}
            />
          </WishListWrapper>
        </ProductPricingWrapper>
      </>
    );
  }
  return <div style={{ display: 'none' }}></div>;
};
