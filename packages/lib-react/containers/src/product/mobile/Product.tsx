import React, { useRef } from 'react';
import {
  AddToCart,
  Accordion,
  ProductCarousel,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
  RecommendedProductsLinks,
  ProductNamePrice,
  DeliveryDetails,
  GoToTop,
  GoToCartMobile as GoToCart,
} from '@hs/components';
import {
  useProduct,
  useOneSize,
  useDeliveryDetails,
  useRecommendation,
} from '@hs/framework';
import { ProductDetailsWrapper } from './StyledProduct';
import { IProductPage } from '../IProduct';
const ProductMobile = ({
  goToCart,
  productId,
  productData,
  selectedSku,
  addedToCart,
  deliveryDetails,
  recommendedProductDetails,
  similarProductDetails,
  updatedWishListId,
  addToWishlist,
  deleteFromWishlist,
  openSizeChartPopup,
  onSizeSelect,
  openPinCodePopup,
  openSizeSelector,
  addProductToCart,
}: IProductPage) => {
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
      <ProductCarousel
        {...{
          showArrows: false,
          autoPlay: true,
          draggable: false,
          focusOnSelect: false,
          renderButtonGroupOutside: false,
          renderDotsOutside: false,
          slidesToSlide: 1,
          swipeable: true,
          showDots: true,
          imgUrls: productData.imgurls,
          goToProductRecommendation,
          showRFYP,
          isProductSoldOut,
        }}
      ></ProductCarousel>
      <ProductDetailsWrapper>
        <ProductNamePrice
          {...{
            productName,
            isProductSoldOut,
            wishlistId:
              updatedWishListId === undefined ? wishlistId : updatedWishListId,
            retailPrice,
            retailPriceMax,
            selectedSku: selectedSku,
            regularPrice,
            discount,
            addToWishlist,
            deleteFromWishlist,
          }}
        ></ProductNamePrice>
        {isProductSoldOut === false && (
          <SizeAndChartLabels
            {...{
              isOneSize,
              hasSizeChart: productData.hasSizeChart,
              qtyLeft,
              simpleSkus,
              onSizeChartClick: openSizeChartPopup,
            }}
          ></SizeAndChartLabels>
        )}
        {!isOneSize && (
          <CustomSizePicker
            {...{
              simpleSkus,
              selectedSku: selectedSku,
              onSizeSelect,
            }}
          ></CustomSizePicker>
        )}
        {showRfypCue && (showRFYP || showSimilarProducts) && (
          <RecommendedProductsLinks
            {...{ isProductSoldOut, goToProductRecommendation }}
          ></RecommendedProductsLinks>
        )}
        {isProductSoldOut === false && (
          <DeliveryDetails
            {...{
              ...deliveryDetailsData,
              selectedSku: selectedSku,
              ...deliveryDetails,
              openPinCodePopup,
              openSizeSelector,
            }}
          ></DeliveryDetails>
        )}
        {productData.id && (
          <Accordion
            {...{ ...product, isPresale, simpleSkus, selectedSku: selectedSku }}
          ></Accordion>
        )}
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
      </ProductDetailsWrapper>

      {addedToCart ? (
        <GoToCart goToCart={goToCart} />
      ) : (
        <AddToCart
          {...{
            show: true,
            disabled: isProductSoldOut ? true : false,
            addProductToCart,
          }}
        />
      )}
      <GoToTop></GoToTop>
    </>
  );
};
export default ProductMobile;
