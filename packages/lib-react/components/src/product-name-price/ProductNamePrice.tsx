import React, { FC } from 'react';
import {
  ProductNamePriceWrapper,
  ProductName,
  ProductPrice,
  ProductOfferPrice,
  ProductVendorPrice,
  ProductDiscountPrice,
} from './StyledProductNamePrice';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IProductNamePriceProps } from './IProductNamePrice';

export const ProductNamePrice: FC<IProductNamePriceProps> =
  // eslint-disable-next-line no-empty-pattern
  ({
    name,
    retailPrice,
    retailPriceMax,
    regularPrice,
    discount,
    selectedSku,
  }: IProductNamePriceProps) => {
    if (retailPrice) {
      return (
        <ProductNamePriceWrapper>
          <ProductPrice>₹{retailPrice}</ProductPrice>
          {retailPriceMax && !selectedSku && retailPrice != retailPriceMax && (
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
      );
    }
    return <div style={{ display: 'none' }}></div>;
  };
