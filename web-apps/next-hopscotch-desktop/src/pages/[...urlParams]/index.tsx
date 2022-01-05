import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactElement, useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Layout } from '@/components/layout/Layout';

const SizeChartPopupComponent = dynamic(() => import('../../components/size-chart/SizeChart'), {
  ssr: false,
});

const PinCodePopupComponent = dynamic(() => import('../../components/pin-code/PinCode'), {
  ssr: false,
});

import {
  AddToCartDesktop,
  AccordionDesktop,
  RecommendedProductsDesktop,
  ProductHead,
  SizeAndChartLabelsDesktop,
  ProductNamePriceDesktop,
  DeliveryDetailsDesktop,
} from '@hs/components';

import { ProductCarouselDesktop } from '../../components/product-carousel-desktop/ProductCarouselDesktop';

import { IProductProps, ICartAPIResponse, NextPageWithLayout, IUpdatedDeliverDetailsProps } from '@/types';
import { cookiesService, productDetailsService } from '@hs/services';
import {
  ProductWrapper,
  ProductDetailsWrapper,
  CartLink,
  CartNotification,
  CartNotificationDetails,
  CartHeader,
  CartMessage,
  CartLinkText,
} from '@/styles';

import SizeSelector from '../../components/size-selector/SizeSelector';

import {
  useRecommendation,
  IRecommendedProducts,
  useOneSize,
  useDeliveryDetails,
  useProduct,
  useSegment,
  IProductDetails,
  ISimpleSkusEntityProps,
  COOKIE_DATA,
  CartItemQtyContext,
  LOCAL_DATA,
  getSchemaData,
  getCanonicalUrl,
} from '@hs/framework';
import GoToTopDesktop from '@/components/go-to-top/GoToTopDesktop';

const tryLater = 'Try Later';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const productId = context.params?.urlParams?.[1] || '';
  const baseUrl = process.env.WEB_HOST;
  const url = `${baseUrl}${context.resolvedUrl?.split('?')?.[0]}`;
  await queryClient.prefetchQuery(
    ['ProductDetail', productId],
    () => productDetailsService.getProductDetails(productId, process.env.WEB_HOST),
    {
      staleTime: Infinity,
    },
  );
  // await queryClient.prefetchQuery(
  //   ['RecommendedProducts', productId],
  //   () => productDetailsService.getRecommendedProducts(productId, { boutiqueId: undefined }, process.env.WEB_HOST),
  //   {
  //     staleTime: Infinity,
  //   },
  // );
  // await queryClient.prefetchQuery(
  //   ['SimilarProducts', productId],
  //   () => productDetailsService.getSimilarProducts(productId, { boutiqueId: undefined }, process.env.WEB_HOST),
  //   {
  //     staleTime: Infinity,
  //   },
  // );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      url,
    },
  };
};
const Product: NextPageWithLayout<IProductProps> = ({ url, productId }: IProductProps) => {
  const similarProductsLink = useRef<HTMLDivElement>(null);
  const recommendedProductsLink = useRef<HTMLDivElement>(null);
  const [deliveryDetails, updateDeliveryDetails] = useState<IUpdatedDeliverDetailsProps>();
  const { updateCartItemQty } = useContext(CartItemQtyContext);

  const { data: productData } = useQuery<IProductDetails>(
    ['ProductDetail', productId],
    () => productDetailsService.getProductDetails(productId),
    {
      staleTime: Infinity,
      enabled: productId !== undefined,
    },
  );

  const { data: recommendedProductDetails } = useQuery<IRecommendedProducts>(
    ['RecommendedProducts', productId],
    () => productDetailsService.getRecommendedProducts(productId, { boutiqueId: undefined }),
    {
      enabled: productId !== undefined,
    },
  );

  const { data: similarProductDetails } = useQuery<IRecommendedProducts>(
    ['SimilarProducts', productId],
    () => productDetailsService.getSimilarProducts(productId, { boutiqueId: undefined }),
    {
      enabled: productId !== undefined,
    },
  );

  const [SizeChartPopupModal, openSizeChartPopup, closeSizeChartPopup, isSizeChartPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const [PinCodePopupModal, openPinCodePopup, closePinCodePopup, isPinCodePopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const [selectedSku, setSelectedSku] = useState<ISimpleSkusEntityProps | any>();
  const {
    productName,
    retailPrice,
    regularPrice,
    retailPriceMax,
    selectedSkuId,
    discount,
    isPresale,
    finalSale,
    qtyLeft,
    simpleSkus,
    showRfypCue,
    isProductSoldOut,
    defaultSku,
    ...product
  } = useProduct({ productData, selectedSku });

  const { canShow: showSimilarProducts, ...similarProducts } = useRecommendation({
    section: 'RFYP',
    showmatching: true,
    recommended: similarProductDetails,
    id: 'similarproducts',
    pid: productId,
  });

  const { canShow: showRFYP, ...recommendedForYou } = useRecommendation({
    section: 'UserRecoPDP',
    showmatching: false,
    recommended: recommendedProductDetails,
    id: 'productrecommendations',
    pid: productId,
  });

  const { isOneSize } = useOneSize({
    productData,
  });

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku: selectedSku,
    productData,
  });

  const goToProductRecommendation = (fromLocation: string) => {
    if (fromLocation) {
      const currentRefElement = showRFYP ? recommendedProductsLink : similarProductsLink;
      currentRefElement?.current?.scrollIntoView({ behavior: 'smooth' });
      // segment.trackEvent({
      //   evtName: segment.PDP_TRACKING_EVENTS.PDP_SEE_SIMILAR_CLICKED,
      //   properties: {
      //     ...properties,
      //     reco_type: 'Similar products',
      //     product_id: Number(productId),
      //     from_location: fromLocation,
      //   },
      //   contextData,
      // });
    }
  };

  const [{ contextData, properties }] = useSegment();
  // const pdpTrackingData = useProductTracking({ selectedSku, productData });

  useEffect(() => {
    if (contextData && properties && productData) {
      // segment.trackEvent({
      //   evtName: segment.PDP_TRACKING_EVENTS.PRODUCT_VIEWED,
      //   properties: {
      //     ...properties,
      //     ...getProductTrackingData({ productData }),
      //     addFrom: 'current=' + location.pathname,
      //   },
      //   contextData,
      // });
    }
    if (productData?.simpleSkus?.length === 1) {
      setSelectedSku(productData.simpleSkus[0]);
    }
  }, [contextData, productData, properties]);

  const getToasterContent = (selectedSku: ISimpleSkusEntityProps) => {
    return (
      <>
        <CartNotification>
          <Link
            href={{
              pathname: '/v2/cart',
            }}
            passHref
          >
            <CartLink>
              <Image
                alt={`${productName}`}
                width="70px"
                height="70px"
                max-width="100%"
                draggable={false}
                unoptimized
                src={`${productData?.imgurls?.[0] && productData.imgurls[0].imgUrlThumbnail}`}
              />
              <CartNotificationDetails>
                {!isOneSize && (
                  <CartHeader>{`${selectedSku?.attrs[0]?.name} : ${selectedSku?.attrs[0]?.value}`}</CartHeader>
                )}
                <CartMessage>Added to your Cart!</CartMessage>
                <CartLinkText>View cart</CartLinkText>
              </CartNotificationDetails>
            </CartLink>
          </Link>
        </CartNotification>
      </>
    );
  };

  const addToCart = (sku: ISimpleSkusEntityProps) => {
    const data = { sku: sku.skuId, quantity: 1 };
    (async () => {
      try {
        const addToCartResponse: ICartAPIResponse = await productDetailsService.addItemToCart(data);
        const atc_user = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
        if (addToCartResponse.action === LOCAL_DATA.SUCCESS) {
          updateCartItemQty(addToCartResponse.cartItemQty);
          toast(getToasterContent(sku), {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: false,
            hideProgressBar: true,
            autoClose: 2250,
            toastId: 'cartQuantiyChangeToaster',
            bodyClassName: 'cartQuantiyChangeBodyToaster',
          });
          // segment.trackEvent({
          //   evtName: segment.PDP_TRACKING_EVENTS.ADDED_TO_CART,
          //   properties: {
          //     ...properties,
          //     ...getProductTrackingData({ productData, selectedSku: sku }),
          //     atc_user,
          //     addFrom: 'current=' + location.pathname,
          //   },
          //   contextData,
          // });
          return;
        }
      } catch (error: any) {
        const errorMessage = error ? error.message : tryLater;
        showErrorNotification(errorMessage);
      }
    })();
  };

  // remove
  const openSizeSelector = () => {};
  // end

  const addProductToCart = () => {
    if (selectedSku) {
      addToCart(selectedSku);
    } else {
      openSizeSelector();
    }
  };

  const onSizeSelect = (sku: ISimpleSkusEntityProps, fromLocation: string) => {
    // segment.trackEvent({
    //   evtName: segment.PDP_TRACKING_EVENTS.SIZE_CLICKED,
    //   properties: {
    //     ...properties,
    //     ...getProductTrackingData({ productData, selectedSku: sku }),
    //     addFrom: 'current=' + location.pathname,
    //     from_location: fromLocation,
    //   },
    //   contextData,
    // });
    setSelectedSku(sku);
  };

  const showErrorNotification = (message: string) => {
    toast.error(message, {
      hideProgressBar: true,
      closeButton: false,
      icon: false,
      autoClose: 2250,
      style: {
        backgroundColor: '#f44',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '1.4rem',
        lineHeight: '16px',
      },
    });
  };

  const updateAndClosePinCodePopup = (newValues?: any) => {
    closePinCodePopup();
    if (newValues && newValues.simpleSkus) {
      for (let i = 0; i < simpleSkus.length; i++) {
        const sku = simpleSkus[i];
        const newSku = newValues.simpleSkus[sku.skuId];
        for (const key in newSku) {
          if (sku[key]) {
            sku[key] = newSku[key];
          }
        }
      }
      updateDeliveryDetails({
        pinCode: newValues.newPincode,
        eddPrefix: newValues.eddPrefix,
        deliveryMessages: newValues.deliveryMessages,
      });
    }
  };

  return (
    <>
      {productData && productData.action === LOCAL_DATA.SUCCESS && (
        <>
          <ProductHead
            {...{
              productName,
              retailPrice,
              schema: getSchemaData({ productData, defaultSku, url }),
              canonicalUrl: getCanonicalUrl({ productData, url }),
            }}
          ></ProductHead>
          <ProductWrapper>
            {productData.imgurls && productData.imgurls.length > 0 && (
              <ProductCarouselDesktop
                {...{
                  showArrows: false,
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
              ></ProductCarouselDesktop>
            )}
            <ProductDetailsWrapper>
              <ProductNamePriceDesktop
                {...{
                  productName,
                  isProductSoldOut: !!productData.isProductSoldOut,
                  retailPrice,
                  retailPriceMax,
                  selectedSku: selectedSku,
                  regularPrice,
                  discount,
                }}
              ></ProductNamePriceDesktop>
              <SizeAndChartLabelsDesktop
                {...{
                  isOneSize,
                  hasSizeChart: productData.hasSizeChart,
                  qtyLeft,
                  simpleSkus,
                  onSizeChartClick: openSizeChartPopup,
                }}
              ></SizeAndChartLabelsDesktop>
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

              <SizeSelector
                {...{ showRFYP, goToProductRecommendation, simpleSkus, showAddToCart: true, onSizeSelect, selectedSku }}
              ></SizeSelector>
              <AddToCartDesktop
                {...{
                  show: true,
                  disabled: isProductSoldOut ? true : false,
                  addProductToCart,
                }}
              ></AddToCartDesktop>
              <DeliveryDetailsDesktop
                {...{
                  ...deliveryDetailsData,
                  selectedSku: selectedSku,
                  ...deliveryDetails,
                  openPinCodePopup,
                  openSizeSelector,
                }}
              ></DeliveryDetailsDesktop>
              {productData.id && (
                <AccordionDesktop
                  {...{ ...product, isPresale, simpleSkus, selectedSku: selectedSku }}
                ></AccordionDesktop>
              )}
            </ProductDetailsWrapper>
          </ProductWrapper>

          {showRFYP && (
            <div ref={recommendedProductsLink}>
              <RecommendedProductsDesktop {...recommendedForYou}></RecommendedProductsDesktop>
            </div>
          )}

          {showSimilarProducts && (
            <div ref={similarProductsLink}>
              <RecommendedProductsDesktop {...similarProducts}></RecommendedProductsDesktop>
            </div>
          )}
          {/* <AddToCart {...{ show: true, disabled: false, addProductToCart }}></AddToCart> */}

          <SizeChartPopupModal>
            {isSizeChartPopupOpen && productData && (
              <SizeChartPopupComponent
                {...{
                  id: productData.id,
                  productName: productName,
                  onClickClose: closeSizeChartPopup,
                }}
              ></SizeChartPopupComponent>
            )}
          </SizeChartPopupModal>

          <PinCodePopupModal>
            {isPinCodePopupOpen && productData && (
              <PinCodePopupComponent
                {...{
                  pincode: deliveryDetails?.pinCode || productData.pinCode,
                  productId,
                  closePinCodePopup: updateAndClosePinCodePopup,
                }}
              ></PinCodePopupComponent>
            )}
          </PinCodePopupModal>
        </>
      )}
      <GoToTopDesktop></GoToTopDesktop>
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productData, null, 4)}</pre> */}
    </>
  );
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
