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
  IProductCarouselListDesktopProps,
  IProductCarouselDetailsEntityListDesktop,
} from './IProductCarouselListDesktop';
import { IFunnelData, SESSION_DATA, useSessionStorage } from '@hs/framework';

const getDashedParameter = (
  product: IProductCarouselDetailsEntityListDesktop
) => {
  let dashSeparatedUrlProductName = '';
  dashSeparatedUrlProductName += product.name || product.productName;
  dashSeparatedUrlProductName = dashSeparatedUrlProductName
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return dashSeparatedUrlProductName;
};
const getFormattedPrice = (price?: number) => {
  return price && price.toLocaleString('en-IN');
};
export const ProductCarouselListDesktop: FC<IProductCarouselListDesktopProps> =
  ({ products, section, subsection }: IProductCarouselListDesktopProps) => {
    const [funnelData] = useSessionStorage<IFunnelData>(
      SESSION_DATA.OA_DATA,
      null
    );
    // const imageSize = 360;
    return (
      <CarouselListWrapper>
        {products &&
          products.map(
            (
              product: IProductCarouselDetailsEntityListDesktop,
              index: number
            ) => (
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
                  ₹{getFormattedPrice(product.salePrice || product.retailPrice)}
                </SaleRetailPrice>
              </CarouselList>
            )
          )}
      </CarouselListWrapper>
    );
  };
