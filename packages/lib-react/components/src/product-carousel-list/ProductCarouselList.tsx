import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  CarouselListWrapper,
  CarouselList,
  SaleRetailPrice,
  ImageWrapper,
  TransparentImgOverlay,
} from './StyledProductCarouselList';
import {
  IProductCarouselListProps,
  IRecommendProductDetailListEntity,
} from './IProductCarouselList';
import { IFunnelData, SESSION_DATA, useSessionStorage } from '@hs/framework';

const getDashedParameter = (product: IRecommendProductDetailListEntity) => {
  let dashSeparatedUrlProductName = '';
  if (product.brandName || product.brand) {
    dashSeparatedUrlProductName = (product.brandName || product.brand) + '-';
  }
  dashSeparatedUrlProductName += product.name || product.productName;
  dashSeparatedUrlProductName = dashSeparatedUrlProductName
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return dashSeparatedUrlProductName;
};
export const ProductCarouselList: FC<IProductCarouselListProps> = ({
  products,
  section,
  subsection,
}: IProductCarouselListProps) => {
  const router = useRouter();
  const [funnelData] = useSessionStorage<IFunnelData>(
    SESSION_DATA.OA_DATA,
    null
  );
  const imageSize = 360;

  const gotoProductDetailsPage = (
    product: IRecommendProductDetailListEntity
  ) => {
    router.push({
      pathname: `/product/${product.id}/${getDashedParameter(product)}`,
      query: {
        ...funnelData,
        ...{ section, subsection, from_screen: 'product' },
      },
    });
  };

  return (
    <CarouselListWrapper>
      {products &&
        products.map(
          (product: IRecommendProductDetailListEntity, index: number) => (
            <CarouselList key={index}>
              <ImageWrapper
                onClick={() => gotoProductDetailsPage(product)}
                key={index}
              >
                <Image
                  src={`${product.imageUrl}&tr=w-${imageSize},c-at_max,dpr-2,n-medium`}
                  alt={product.productName}
                  placeholder="blur"
                  blurDataURL="https://static.hopscotch.in/web2/images/boutique-pattern.png"
                  layout="fill"
                  unoptimized
                  // objectFit="cover"
                />
                <TransparentImgOverlay></TransparentImgOverlay>
              </ImageWrapper>
              <SaleRetailPrice>
                ₹{product.salePrice || product.retailPrice}
              </SaleRetailPrice>
            </CarouselList>
          )
        )}
    </CarouselListWrapper>
  );
};
