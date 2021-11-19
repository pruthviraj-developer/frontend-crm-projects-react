import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  const [funnelData] = useSessionStorage<IFunnelData>(
    SESSION_DATA.OA_DATA,
    null
  );
  // const imageSize = 360;
  return (
    <CarouselListWrapper>
      {products &&
        products.map(
          (product: IRecommendProductDetailListEntity, index: number) => (
            <CarouselList key={index}>
              <Link
                href={{
                  pathname: `/product/${product.id}/${getDashedParameter(
                    product
                  )}`,
                  query: {
                    ...funnelData,
                    ...{ section, subsection, from_screen: 'product' },
                  },
                }}
              >
                <ImageWrapper key={index}>
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    placeholder="blur"
                    blurDataURL="https://static.hopscotch.in/web2/images/boutique-pattern.png"
                    layout="fill"
                    loader={({ src, width }) =>
                      `${src}&tr=w-${width},c-at_max,n-medium`
                    }
                    sizes="40vw"
                  />
                  <TransparentImgOverlay></TransparentImgOverlay>
                </ImageWrapper>
              </Link>
              <SaleRetailPrice>
                ₹{product.salePrice || product.retailPrice}
              </SaleRetailPrice>
            </CarouselList>
          )
        )}
    </CarouselListWrapper>
  );
};
