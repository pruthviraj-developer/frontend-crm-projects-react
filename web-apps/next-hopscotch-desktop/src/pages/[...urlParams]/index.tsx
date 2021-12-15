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
  AccordionDesktop,
  CustomSizePicker,
  RecommendedProductsDesktop,
  ProductHead,
  SizeAndChartLabelsDesktop,
  ProductNamePriceDesktop,
  DeliveryDetailsDesktop,
} from '@hs/components';

import { ProductCarouselDesktop } from '../../components/product-carousel-desktop/ProductCarouselDesktop';

import {
  IProductProps,
  IWishListProps,
  ICartAPIResponse,
  NextPageWithLayout,
  IUpdatedDeliverDetailsProps,
  IErrorStateProps,
} from '@/types';
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
  getProductTrackingData,
  COOKIE_DATA,
  CartItemQtyContext,
  LoginContext,
  UserInfoContext,
  LOCAL_DATA,
} from '@hs/framework';

const tryLater = 'Try Later';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const productId = context.params?.urlParams?.[1] || '';
  console.log('process.env.WEB_HOST', process.env.WEB_HOST);
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
    },
  };
};
const Product: NextPageWithLayout<IProductProps> = (props: IProductProps) => {
  const similarProductsLink = useRef<HTMLDivElement>(null);
  const recommendedProductsLink = useRef<HTMLDivElement>(null);
  const productId = props.productId;
  const [deliveryDetails, updateDeliveryDetails] = useState<IUpdatedDeliverDetailsProps>();
  const [updatedWishListId, updateWishListId] = useState<number>();
  const [addToWishlistStatus, setAddToWishlistStatus] = useState<boolean>(false);
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const { showLoginPopup } = useContext(LoginContext);
  const { userInfo } = useContext(UserInfoContext);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      }),
  );

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
    wishlistId,
    isProductSoldOut,
    ...product
  } = useProduct({ productData: productData, selectedSku: selectedSku });

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

  console.log(JSON.stringify(similarProducts));

  const { isOneSize } = useOneSize({
    productData: productData,
  });

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku: selectedSku,
    productData: productData,
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

  // Remove

  const closeLoginPopup = () => {};
  const openLoginPopup = () => {};

  const [{ contextData, properties }] = useSegment();
  // const pdpTrackingData = useProductTracking({ selectedSku, productData });

  const closeLoginModalPopup = (status?: boolean) => {
    if (status && addToWishlistStatus) {
      addToWishlistAfterModalClose();
    }
    setAddToWishlistStatus(false);
    closeLoginPopup();
  };

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
  }, [contextData, productData, properties]);

  useEffect(() => {
    if (showLoginPopup) {
      openLoginPopup();
    }
  }, [showLoginPopup, openLoginPopup]);

  const addToWishlist = () => {
    if (userInfo.isLoggedIn) {
      addToWishlistAfterModalClose();
    } else {
      toast.info('Sign in to add this item to your Wishlist.', {
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        autoClose: 2250,
        style: {
          backgroundColor: '#00aff0',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '16px',
        },
      });
      setAddToWishlistStatus(true);
      openLoginPopup();
    }
  };

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
    } else if (simpleSkus.length === 1) {
      const sku = simpleSkus[0];
      setSelectedSku(sku);
      addToCart(sku);
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

  const deleteFromWishlist = () => {
    (async () => {
      try {
        const wishListStatus: IWishListProps = await productDetailsService.deleteFromWishlist(
          updatedWishListId === undefined ? wishlistId : updatedWishListId,
        );
        if (wishListStatus.action === LOCAL_DATA.SUCCESS) {
          updateWishListId(0);
          if (navigator && navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      } catch (error: any) {
        const errorMessage = (error && error['data'] ? error.data : error) as unknown as IErrorStateProps;
        showErrorNotification(errorMessage.message);
      }
    })();
  };

  const addToWishlistAfterModalClose = () => {
    let retailPrice = selectedSku?.retailPrice || productData?.retailPrice || 0;
    const wishlistItem = {
      sku: selectedSkuId || '',
      productId: productData?.id,
      price: retailPrice,
      attribution: {
        // source: oa_data['source'],
        // funnel: oa_data['funnel'],
        // funnel_tile: oa_data['funnel_tile'],
        // funnel_section: oa_data['funnel_section'],
        funnel_row: '',
        // section: oa_data['section'],
        subSection: 'CT3006',
        // plp: oa_data['plp'],
        sortBar: 'All',
        sortBarGroup: 'All',
        sortBy: 'System',
        // quick_shop: oa_data['quickshop'],
        // atc_user: atc_user,
      },
    };

    (async () => {
      try {
        const wishListStatus: IWishListProps = await productDetailsService.addToWishlist(wishlistItem);
        if (wishListStatus.action === LOCAL_DATA.SUCCESS) {
          updateWishListId(wishListStatus.wishlistItemId);
          if (navigator && navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      } catch (error: any) {
        const errorMessage = (error && error['data'] ? error.data : error) as unknown as IErrorStateProps;
        showErrorNotification(errorMessage.message);
      }
    })();
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
          <ProductHead {...{ productName, retailPrice }}></ProductHead>
          <ProductWrapper>
            {productData.imgurls && productData.imgurls.length > 0 && (
              <ProductCarouselDesktop
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
              ></ProductCarouselDesktop>
            )}
            <ProductDetailsWrapper>
              <ProductNamePriceDesktop
                {...{
                  productName,
                  isProductSoldOut: !!productData.isProductSoldOut,
                  wishlistId: updatedWishListId === undefined ? wishlistId : updatedWishListId,
                  retailPrice,
                  retailPriceMax,
                  selectedSku: selectedSku,
                  regularPrice,
                  discount,
                  addToWishlist,
                  deleteFromWishlist,
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

              <SizeSelector {...{ showRFYP, goToProductRecommendation }}></SizeSelector>
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
              <PinCodePopupComponent {...{ pincode: '', closePinCodePopup }}> </PinCodePopupComponent>
            )}
          </PinCodePopupModal>
        </>
      )}
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productData, null, 4)}</pre> */}
    </>
  );
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
