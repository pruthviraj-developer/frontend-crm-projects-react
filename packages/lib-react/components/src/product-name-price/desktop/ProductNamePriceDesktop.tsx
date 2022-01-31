import React, { FC } from 'react';
import {
  ProductPricingWrapperDesktop,
  ProductNamePriceWrapperDesktop,
  ProductNameDesktop,
  ProductPriceDesktop,
  ProductOfferPriceDesktop,
  ProductVendorPriceDesktop,
  ProductDiscountPriceDesktop,
  ProductSoldDesktop,
} from './StyledProductNamePriceDesktop';
import { IProductNamePriceProps } from '../IProductNamePrice';

const getFormattedPrice = (price?: number) => {
  return price && price.toLocaleString('en-IN');
};
export const ProductNamePriceDesktop: FC<IProductNamePriceProps> = ({
  productName,
  retailPrice,
  retailPriceMax,
  regularPrice,
  discount,
  selectedSku,
  isProductSoldOut,
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
        {isProductSoldOut && <ProductSoldDesktop>Sold out</ProductSoldDesktop>}
        <ProductPricingWrapperDesktop>
          <ProductNamePriceWrapperDesktop>
            <ProductNameDesktop>{productName}</ProductNameDesktop>
            <ProductPriceDesktop>
              ₹{getFormattedPrice(retailPrice)}
            </ProductPriceDesktop>
            {getRetailPrice() && (
              <ProductPriceDesktop>
                &nbsp;-&nbsp;₹{getFormattedPrice(retailPriceMax)}
              </ProductPriceDesktop>
            )}
            {getDiscountDetails() && (
              <ProductOfferPriceDesktop>
                <ProductVendorPriceDesktop>
                  ₹{getFormattedPrice(regularPrice)}
                </ProductVendorPriceDesktop>
                <ProductDiscountPriceDesktop>
                  {discount}% off
                </ProductDiscountPriceDesktop>
              </ProductOfferPriceDesktop>
            )}
          </ProductNamePriceWrapperDesktop>
        </ProductPricingWrapperDesktop>
      </>
    );
  }
  return <div style={{ display: 'none' }}></div>;
};
