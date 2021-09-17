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
export const ProductCarouselList: FC<IProductCarouselListProps> = ({
  products,
  section,
  subsection,
}: IProductCarouselListProps) => {
  const router = useRouter();
  const imageSize = 360;

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

  const gotoProductDetailsPage = (
    product: IRecommendProductDetailListEntity
  ) => {
    router.push({
      pathname: `/product/${product.id}/${getDashedParameter(product)}`,
      query: { section, subsection },
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
                  loader={({ src, width }) =>
                    `${src}&tr=w-${width / 2},c-at_max,dpr-2,n-medium`
                  }
                  src={product.imageUrl}
                  alt={product.productName}
                  placeholder="blur"
                  blurDataURL="https://static.hopscotch.in/web2/images/boutique-pattern.png"
                  width={imageSize}
                  height={imageSize}
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
