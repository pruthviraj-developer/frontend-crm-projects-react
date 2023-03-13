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
  AllTaxes,
} from './StyledProductNamePrice';
import { IProductNamePriceProps } from '../IProductNamePrice';
import { IconWishlistHeartEmpty, IconWishlistHeartFilled } from '@hs/icons';

const getFormattedPrice = (price?: number) => {
  return price && price.toLocaleString('en-IN');
};
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
    const showOffer = () => {
      return retailPriceMax && !selectedSku ? true : false;
    };

    const getRetailPrice = () => {
      return showOffer() === true &&
        retailPriceMax &&
        retailPriceMax > 0 &&
        retailPrice != retailPriceMax
        ? true
        : false;
    };

    const getDiscountDetails = () => {
      return showOffer() === false &&
        discount &&
        discount > 2 &&
        regularPrice &&
        regularPrice > retailPrice
        ? true
        : false;
    };

    return (
      <>
        {isProductSoldOut && <ProductSold>Sold out</ProductSold>}
        <ProductPricingWrapper>
          <ProductNamePriceWrapper>
            {getDiscountDetails() === false && getRetailPrice() === false ? (
              <ProductPrice>MRP:</ProductPrice>
            ) : (
              <></>
            )}
            <ProductPrice>₹{getFormattedPrice(retailPrice)}</ProductPrice>
            {getRetailPrice() && (
              <ProductPrice>
                &nbsp;-&nbsp;₹{getFormattedPrice(retailPriceMax)}
              </ProductPrice>
            )}
            {getDiscountDetails() && (
              <ProductOfferPrice>
                <ProductVendorPrice isMrp={true}>MRP:</ProductVendorPrice>
                <ProductVendorPrice>
                  ₹{getFormattedPrice(regularPrice)}
                </ProductVendorPrice>
                <ProductDiscountPrice>{discount}% off</ProductDiscountPrice>
              </ProductOfferPrice>
            )}
            {getRetailPrice() === false ? (
              <AllTaxes>Inclusive of all taxes</AllTaxes>
            ) : (
              <></>
            )}
            <ProductName>{productName}</ProductName>
          </ProductNamePriceWrapper>
          <WishListWrapper>
            <WishListIcon
              selected={wishlistId}
              onClick={() => {
                if (wishlistId) {
                  deleteFromWishlist && deleteFromWishlist();
                  return;
                }
                addToWishlist && addToWishlist();
              }}
              icon={wishlistId ? IconWishlistHeartFilled : IconWishlistHeartEmpty}
              fill={wishlistId ? '#ED54A4' : '#bbb'}
            />
          </WishListWrapper>
        </ProductPricingWrapper>
      </>
    );
  }
  return <></>;
};
