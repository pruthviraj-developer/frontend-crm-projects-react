import React, { FC } from 'react';
import Image from 'next/image';
import {
  CarouselListWrapper,
  SaleRetailPrice,
  ImageWrapper,
} from './StyledProductCarouselList';
import {
  IProductCarouselListProps,
  IRecommendProductDetailListEntity,
} from './IProductCarouselList';
export const ProductCarouselList: FC<IProductCarouselListProps> = ({
  products,
  section,
  id,
  pid,
  subsection,
}: IProductCarouselListProps) => {
  const imageSize = 360;
  console.log(section, id, pid, subsection);
  return (
    <CarouselListWrapper>
      {products &&
        products.map(
          (product: IRecommendProductDetailListEntity, index: number) => (
            <ImageWrapper key={index}>
              <Image
                loader={() =>
                  `${product.imageUrl}&w=${imageSize}&h=${imageSize}`
                }
                src={product.imageUrl}
                alt={product.productName}
                placeholder="blur"
                blurDataURL="https://static.hopscotch.in/web2/images/boutique-pattern.png"
                width={imageSize}
                height={imageSize}
                objectFit="cover"
              />
              <SaleRetailPrice>
                ₹{product.salePrice || product.retailPrice}
              </SaleRetailPrice>
            </ImageWrapper>
          )
        )}
    </CarouselListWrapper>
  );
};
