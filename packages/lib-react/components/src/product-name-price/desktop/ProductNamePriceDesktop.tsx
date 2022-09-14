import React, { FC } from 'react';
import {
  AllTaxes,
  ProductPricingWrapperDesktop,
  ProductNamePriceWrapperDesktop,
  ProductNameDesktop,
  ProductPriceDesktop,
  ProductOfferPriceDesktop,
  ProductVendorPriceDesktop,
  ProductDiscountPriceDesktop,
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
        <ProductPricingWrapperDesktop>
          <ProductNamePriceWrapperDesktop>
            <ProductNameDesktop>{productName}</ProductNameDesktop>
            {getDiscountDetails() === false && getRetailPrice() === false ? (
              <ProductPriceDesktop>MRP:</ProductPriceDesktop>
            ) : (
              <></>
            )}
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
                <ProductVendorPriceDesktop isMrp={true}>
                  MRP:
                </ProductVendorPriceDesktop>
                <ProductVendorPriceDesktop>
                  ₹{getFormattedPrice(regularPrice)}
                </ProductVendorPriceDesktop>
                <ProductDiscountPriceDesktop>
                  {discount}% off
                </ProductDiscountPriceDesktop>
              </ProductOfferPriceDesktop>
            )}
            {getRetailPrice() === false ? (
              <AllTaxes>Inclusive of all taxes</AllTaxes>
            ) : (
              <></>
            )}
          </ProductNamePriceWrapperDesktop>
        </ProductPricingWrapperDesktop>
      </>
    );
  }
  return <></>;
};
