import React, { FC } from 'react';
import {
  ProductWrapper,
  ProductNamePriceWrapper,
  ProductName,
  RetailPrice,
  ProductOfferPrice,
  ProductSold,
  WishListWrapper,
  WishListIcon,
} from './StyledSoldProductPrice';
import { ISoldProductPriceProps } from './ISoldProductPrice';
import { IconWishList } from '@hs/icons';

export const SoldProductPrice: FC<ISoldProductPriceProps> =
  // eslint-disable-next-line no-empty-pattern
  ({}: ISoldProductPriceProps) => {
    return (
      <ProductWrapper>
        <ProductSold>Sold out</ProductSold>
        <ProductNamePriceWrapper>
          <ProductOfferPrice>
            <RetailPrice>₹299</RetailPrice>
            <RetailPrice> - ₹499</RetailPrice>
            <ProductName>
              Navy Fish Print Half Sleeves T-Shirt And Short Set
            </ProductName>
          </ProductOfferPrice>
          <WishListWrapper>
            <WishListIcon icon={IconWishList} fill={'#bbb'} />
          </WishListWrapper>
        </ProductNamePriceWrapper>
      </ProductWrapper>
    );
  };
