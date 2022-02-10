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
  Offers,
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
  productId,
  productData,
  selectedSku,
  addedToCart,
  offerDetails,
  deliveryDetails,
  updatedWishListId,
  similarProductDetails,
  recommendedProductDetails,
  goToCart,
  seeAllOffers,
  onSizeSelect,
  addToWishlist,
  openSizeSelector,
  addProductToCart,
  openPinCodePopup,
  deleteFromWishlist,
  openSizeChartPopup,
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
          isProductSoldOut,
          imgUrls: productData.imgurls,
          goToProductRecommendation,
        }}
      />
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
        />
        {offerDetails && (
          <Offers
            {...{
              ...offerDetails,
              seeAllOffers: () => {
                seeAllOffers('/v2/offers');
              },
            }}
          />
        )}
        {isProductSoldOut === false && (
          <SizeAndChartLabels
            {...{
              isOneSize,
              hasSizeChart: productData.hasSizeChart,
              qtyLeft,
              simpleSkus,
              onSizeChartClick: openSizeChartPopup,
            }}
          />
        )}
        {!isOneSize && (
          <CustomSizePicker
            {...{
              simpleSkus,
              selectedSku: selectedSku,
              onSizeSelect,
            }}
          />
        )}
        {showRfypCue && (showRFYP || showSimilarProducts) && (
          <RecommendedProductsLinks
            {...{ isProductSoldOut, goToProductRecommendation }}
          />
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
          />
        )}
        {productData.id && (
          <Accordion
            {...{ ...product, isPresale, simpleSkus, selectedSku: selectedSku }}
          />
        )}
        {showRFYP && (
          <div ref={recommendedProductsLink}>
            <RecommendedProducts {...recommendedForYou} />
          </div>
        )}
        {showSimilarProducts && (
          <div ref={similarProductsLink}>
            <RecommendedProducts {...similarProducts} />
          </div>
        )}
      </ProductDetailsWrapper>

      {addedToCart ? (
        <GoToCart goToCart={goToCart} />
      ) : (
        <AddToCart
          {...{
            isProductSoldOut,
            addProductToCart,
          }}
        />
      )}
      <GoToTop />
    </>
  );
};
export default ProductMobile;
