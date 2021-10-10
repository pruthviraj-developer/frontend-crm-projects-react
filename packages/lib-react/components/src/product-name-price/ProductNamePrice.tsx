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
    const getDiscountDetails = () => {
      return selectedSku &&
        !retailPriceMax &&
        discount &&
        discount > 2 &&
        regularPrice &&
        regularPrice > retailPrice
        ? true
        : false;
    };

    const getRetailPrice = () => {
      return retailPriceMax &&
        retailPriceMax > 0 &&
        !selectedSku &&
        retailPrice != retailPriceMax
        ? true
        : false;
    };

    const getFormattedPrice = (price?: number) => {
      return price && price.toLocaleString('en-IN');
    };

    return (
      <>
        {isProductSoldOut && <ProductSold>Sold out</ProductSold>}
        <ProductPricingWrapper>
          <ProductNamePriceWrapper>
            <ProductPrice>₹{getFormattedPrice(retailPrice)}</ProductPrice>
            {getRetailPrice() && (
              <ProductPrice>
                &nbsp;-&nbsp;₹{getFormattedPrice(retailPriceMax)}
              </ProductPrice>
            )}
            {getDiscountDetails() && (
              <ProductOfferPrice>
                <ProductVendorPrice>
                  ₹{getFormattedPrice(regularPrice)}
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
