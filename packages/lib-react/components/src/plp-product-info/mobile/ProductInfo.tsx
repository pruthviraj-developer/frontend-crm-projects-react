import React, { FC } from 'react';
import {
  ProductWrapper,
  ProductPriceWrapper,
  Tags,
  Tag,
  Details,
  ProductName,
  ProductPrice,
  ProductVendorPrice,
  ProductDiscountPrice,
  WishListIcon,
  WishListWrapper,
} from './StyledProductInfo';
import { IconWishList, IconWishListFilled } from '@hs/icons';
import { formatterService } from '@hs/services';
import { IProductInfoProps } from '../IProductInfo';

export const ProductInfoMobile: FC<IProductInfoProps> = ({
  discount,
  wishlistId,
  productName,
  retailPrice,
  regularPrice,
  isComingSoon,
  addToWishlist,
  deleteFromWishlist,
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

  return (
    <ProductWrapper>
      <Tags>
        <Tag>Pre-order</Tag>
      </Tags>
      <Details>
        <ProductName>{productName}</ProductName>
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
            icon={wishlistId ? IconWishListFilled : IconWishList}
            fill={wishlistId ? '#ED54A4' : '#bbb'}
          />
        </WishListWrapper>
      </Details>
      {isComingSoon ? (
        <></>
      ) : (
        <>
          <ProductPriceWrapper>
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
          </ProductPriceWrapper>
        </>
      )}
    </ProductWrapper>
  );
};
