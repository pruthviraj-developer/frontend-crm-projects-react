import React, { useRef } from 'react';
import {
  useProduct,
  useOneSize,
  useDeliveryDetails,
  useRecommendation,
} from '@hs/framework';
import { ProductDetailsWrapper, ProductWrapper } from './StyledProduct';
import { IProductPage } from '../IProduct';
import {
  ProductNamePriceDesktop as ProductNamePrice,
  SizeAndChartLabelsDesktop as SizeAndChartLabels,
  DeliveryDetailsDesktop as DeliveryDetails,
  AccordionDesktop as Accordion,
  RecommendedProductsDesktop as RecommendedProducts,
  ProductCarouselDesktop as ProductCarousel,
} from '@hs/components';
const ProductDesktop = ({
  productId,
  productData,
  selectedSku,
  deliveryDetails,
  recommendedProductDetails,
  similarProductDetails,
  updatedWishListId,
  addToWishlist,
  deleteFromWishlist,
  openSizeChartPopup,
  // onSizeSelect,
  openPinCodePopup,
  openSizeSelector,
}: // addProductToCart,
IProductPage) => {
  const similarProductsLink = useRef<HTMLDivElement>(null);
  const recommendedProductsLink = useRef<HTMLDivElement>(null);
  const {
    productName,
    retailPrice,
    regularPrice,
    retailPriceMax,
    discount,
    isPresale,
    qtyLeft,
    simpleSkus,
    showRfypCue,
    wishlistId,
    isProductSoldOut,
    ...product
  } = useProduct({ productData: productData, selectedSku: selectedSku });
  const { isOneSize } = useOneSize({
    productData: productData,
  });

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku: selectedSku,
    productData: productData,
  });
  const { canShow: showRFYP, ...recommendedForYou } = useRecommendation({
    section: 'UserRecoPDP',
    showmatching: false,
    recommended: recommendedProductDetails,
    id: 'productrecommendations',
    pid: productId,
  });
  const { canShow: showSimilarProducts, ...similarProducts } =
    useRecommendation({
      section: 'RFYP',
      showmatching: true,
      recommended: similarProductDetails,
      id: 'similarproducts',
      pid: productId,
    });
  const goToProductRecommendation = (fromLocation: string) => {
    if (fromLocation) {
      const currentRefElement = showRFYP
        ? recommendedProductsLink
        : similarProductsLink;
      currentRefElement?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <ProductWrapper>
        {productData.imgurls && productData.imgurls.length > 0 && (
          <ProductCarousel
            {...{
              showArrows: true,
              autoPlay: false,
              draggable: false,
              focusOnSelect: false,
              renderButtonGroupOutside: false,
              renderDotsOutside: false,
              slidesToSlide: 1,
              swipeable: false,
              showDots: false,
              imgUrls: productData.imgurls,
              goToProductRecommendation,
            }}
          ></ProductCarousel>
        )}
        <ProductDetailsWrapper>
          <ProductNamePrice
            {...{
              productName,
              isProductSoldOut: !!productData.isProductSoldOut,
              wishlistId:
                updatedWishListId === undefined
                  ? wishlistId
                  : updatedWishListId,
              retailPrice,
              retailPriceMax,
              selectedSku: selectedSku,
              regularPrice,
              discount,
              addToWishlist,
              deleteFromWishlist,
            }}
          ></ProductNamePrice>
          <SizeAndChartLabels
            {...{
              isOneSize,
              hasSizeChart: productData.hasSizeChart,
              qtyLeft,
              simpleSkus,
              onSizeChartClick: openSizeChartPopup,
            }}
          ></SizeAndChartLabels>
          {/* {!isOneSize && (
                  <CustomSizePicker
                    {...{
                      simpleSkus,
                      selectedSku: selectedSku,
                      onSizeSelect,
                    }}
                  ></CustomSizePicker>
                )}
                {showRfypCue && showRFYP && (
                  <RecommendedProductsLinks
                    {...{ isProductSoldOut: !!productData.isProductSoldOut, goToProductRecommendation }}
                  ></RecommendedProductsLinks>
                )} */}

          {/* <SizeSelector
            {...{ showRFYP, goToProductRecommendation }}
          ></SizeSelector> */}
          <DeliveryDetails
            {...{
              ...deliveryDetailsData,
              selectedSku: selectedSku,
              ...deliveryDetails,
              openPinCodePopup,
              openSizeSelector,
            }}
          ></DeliveryDetails>
          {productData.id && (
            <Accordion
              {...{
                ...product,
                isPresale,
                simpleSkus,
                selectedSku: selectedSku,
              }}
            ></Accordion>
          )}
        </ProductDetailsWrapper>
      </ProductWrapper>

      {showRFYP && (
        <div ref={recommendedProductsLink}>
          <RecommendedProducts {...recommendedForYou}></RecommendedProducts>
        </div>
      )}

      {showSimilarProducts && (
        <div ref={similarProductsLink}>
          <RecommendedProducts {...similarProducts}></RecommendedProducts>
        </div>
      )}
    </>
  );
};
export default ProductDesktop;
