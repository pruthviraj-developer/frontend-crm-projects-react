import React, { useRef, useState, useEffect } from 'react';
import {
  useProduct,
  useOneSize,
  useDeliveryDetails,
  useRecommendation,
} from '@hs/framework';
import { ProductDetailsWrapper, ProductWrapper } from './StyledProduct';
import { IProductPage } from '../IProduct';
import {
  ProductCarouselDesktop as ProductCarousel,
  ProductNamePriceDesktop as ProductNamePrice,
  SizeAndChartLabelsDesktop as SizeAndChartLabels,
  DeliveryDetailsDesktop as DeliveryDetails,
  AccordionDesktop as Accordion,
  RecommendedProductsDesktop as RecommendedProducts,
  AddToCartDesktop as AddToCart,
  GoToCartDesktop as GoToCart,
  SizeSelector,
  GoToTopDesktop,
} from '@hs/components';

const ProductDesktop = ({
  goToCart,
  productId,
  productData,
  selectedSku,
  addedToCart,
  deliveryDetails,
  recommendedProductDetails,
  similarProductDetails,
  addProductToCart,
  openSizeChartPopup,
  openPinCodePopup,
  openSizeSelector,
  onSizeSelect,
}: IProductPage) => {
  const [isAddtoCartClicked, setIsAddtoCart] = useState<boolean>(false);
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
  useEffect(() => {
    setIsAddtoCart(false);
    return () => {
      setIsAddtoCart(false);
    };
  }, [productId]);
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
              retailPrice,
              retailPriceMax,
              selectedSku,
              regularPrice,
              discount,
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
          <SizeSelector
            {...{
              showRFYP,
              goToProductRecommendation,
              simpleSkus,
              showAddToCart: true,
              onSizeSelect,
              selectedSku,
              isAddtoCartClicked,
            }}
          ></SizeSelector>
          {addedToCart ? (
            <GoToCart goToCart={goToCart} />
          ) : (
            <AddToCart
              {...{
                show: true,
                disabled: isProductSoldOut ? true : false,
                addProductToCart: () => {
                  setIsAddtoCart(true);
                  addProductToCart();
                },
              }}
            />
          )}
          <DeliveryDetails
            {...{
              ...deliveryDetailsData,
              selectedSku,
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
                selectedSku,
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
      <GoToTopDesktop></GoToTopDesktop>
    </>
  );
};
export default ProductDesktop;
