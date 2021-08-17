import React, { FC } from 'react';
import {
  ProductNamePriceWrapper,
  ProductName,
  ProductPrice,
  ProductOfferPrice,
  ProductVendorPrice,
  ProductDiscountPrice,
} from './StyledProductNamePrice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IProductNamePriceProps } from './IProductNamePrice';

export const ProductNamePrice: FC<IProductNamePriceProps> =
  ({}: IProductNamePriceProps) => {
    return (
      <ProductNamePriceWrapper>
        <ProductPrice>₹299</ProductPrice>
        <ProductOfferPrice>
          <ProductVendorPrice>₹499</ProductVendorPrice>
          <ProductDiscountPrice>40% off</ProductDiscountPrice>
        </ProductOfferPrice>
        <ProductName>Black Polka on Pink Leggings</ProductName>
      </ProductNamePriceWrapper>
    );
  };
