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
  Offers,
  DisplayBanner,
} from '@hs/components';

const ProductDesktop = ({
  productId,
  productData,
  selectedSku,
  addedToCart,
  offerDetails,
  deliveryDetails,
  recommendedProductDetails,
  similarProductDetails,
  goToCart,
  seeAllOffers,
  onSizeSelect,
  addProductToCart,
  openPinCodePopup,
  openSizeChartPopup,
}: IProductPage) => {
  const [isAddtoCartClicked, setIsAddtoCart] = useState<boolean>(false);
  const [canOpenDropDown, setCanOpenDropDown] = useState<boolean>(false);
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
    setCanOpenDropDown(false);
    return () => {
      setIsAddtoCart(false);
      setCanOpenDropDown(false);
    };
  }, [productId]);

  return (
    <>
      <ProductWrapper>
        {productData.imgurls && productData.imgurls.length > 0 && (
          <ProductCarousel
            {...{
              isProductSoldOut,
              imgUrls: productData.imgurls,
              goToProductRecommendation,
            }}
          />
        )}
        <ProductDetailsWrapper>
          <ProductNamePrice
            {...{
              productName,
              isProductSoldOut,
              retailPrice,
              retailPriceMax,
              selectedSku,
              regularPrice,
              discount,
            }}
          />
          {offerDetails && (
            <Offers
              {...{
                ...offerDetails,
                seeAllOffers: () => {
                  seeAllOffers('/w/offers');
                },
              }}
            />
          )}
          <SizeAndChartLabels
            {...{
              isOneSize,
              hasSizeChart: productData.hasSizeChart,
              qtyLeft,
              simpleSkus,
              onSizeChartClick: openSizeChartPopup,
            }}
          />
          {isOneSize === false ? (
            <SizeSelector
              {...{
                showRFYP: showRFYP || showSimilarProducts,
                goToProductRecommendation,
                simpleSkus,
                showAddToCart: true,
                onSizeSelect,
                selectedSku,
                isAddtoCartClicked,
                canOpenDropDown,
                onDropDownClose: () => {
                  setCanOpenDropDown(false);
                },
              }}
            />
          ) : (
            ''
          )}
          {addedToCart ? (
            <GoToCart goToCart={goToCart} />
          ) : (
            <AddToCart
              {...{
                isProductSoldOut,
                addProductToCart: () => {
                  setIsAddtoCart(true);
                  addProductToCart();
                },
              }}
            />
          )}
          {isProductSoldOut === false && (
            <DeliveryDetails
              {...{
                ...deliveryDetailsData,
                selectedSku,
                ...deliveryDetails,
                openPinCodePopup,
                openSizeSelector: () => {
                  setCanOpenDropDown(true);
                },
              }}
            />
          )}
          {productData.id && (
            <Accordion
              {...{
                ...product,
                isPresale,
                simpleSkus,
                selectedSku,
              }}
            />
          )}
          <DisplayBanner />
        </ProductDetailsWrapper>
      </ProductWrapper>

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
      <GoToTopDesktop />
    </>
  );
};
export default ProductDesktop;
