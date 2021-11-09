import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, ReactElement, useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import { dehydrate, useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  AddToCart,
  Accordion,
  ProductCarousel,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
  RecommendedProductsLinks,
  ProductHead,
  ProductNamePrice,
  DeliveryDetails,
} from '@hs/components';

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
  ProductDetailsWrapper,
  CartLink,
  CartNotification,
  CartNotificationDetails,
  CartHeader,
  CartMessage,
  CartLinkText,
} from '@/styles';

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
  const productId = context.params?.urlParams?.[0] || '';
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

  const { data: productDetails } = useQuery<IProductDetails>(
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

  const [skuValue, setSku] = useState<ISimpleSkusEntityProps | any>();
  const {
    productName,
    selectedSku,
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
    ...product
  } = useProduct({ productData: productDetails, sku: skuValue });

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
    productData: productDetails,
  });

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku: skuValue,
    productData: productDetails,
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
  // const pdpTrackingData = useProductTracking({ selectedSku, productDetails });

  const closeLoginModalPopup = (status?: boolean) => {
    if (status && addToWishlistStatus) {
      addToWishlistAfterModalClose();
    }
    setAddToWishlistStatus(false);
    closeLoginPopup();
  };

  useEffect(() => {
    if (contextData && properties && productDetails) {
      // segment.trackEvent({
      //   evtName: segment.PDP_TRACKING_EVENTS.PRODUCT_VIEWED,
      //   properties: {
      //     ...properties,
      //     ...getProductTrackingData({ productDetails }),
      //     addFrom: 'current=' + location.pathname,
      //   },
      //   contextData,
      // });
    }
  }, [contextData, productDetails, properties]);

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

  const getToasterContent = (skuValue: ISimpleSkusEntityProps) => {
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
                src={`${productDetails?.imgurls?.[0] && productDetails.imgurls[0].imgUrlThumbnail}`}
              />
              <CartNotificationDetails>
                {!isOneSize && <CartHeader>{`${skuValue?.attrs[0]?.name} : ${skuValue?.attrs[0]?.value}`}</CartHeader>}
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
          //     ...getProductTrackingData({ productDetails, selectedSku: sku }),
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
  const closePinCodePopup = () => {};
  const openPinCodePopup = () => {};
  const openSizeSelector = () => {};
  const openSizeChartPopup = () => {};

  // end

  const addProductToCart = () => {
    if (skuValue) {
      addToCart(skuValue);
    } else if (simpleSkus.length === 1) {
      const sku = simpleSkus[0];
      setSku(sku);
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
    //     ...getProductTrackingData({ productDetails, selectedSku: sku }),
    //     addFrom: 'current=' + location.pathname,
    //     from_location: fromLocation,
    //   },
    //   contextData,
    // });
    setSku(sku);
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
        fontSize: '14px',
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
    let retailPrice = skuValue?.retailPrice || productDetails?.retailPrice || 0;
    const wishlistItem = {
      sku: selectedSkuId || '',
      productId: productDetails?.id,
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
      <QueryClientProvider client={queryClient}>
        {productDetails && productDetails.action === LOCAL_DATA.SUCCESS && (
          <>
            <ProductHead {...{ productName, retailPrice }}></ProductHead>
            <ProductCarousel
              {...{
                showArrows: false,
                autoPlay: true,
                draggable: false,
                focusOnSelect: false,
                renderButtonGroupOutside: false,
                renderDotsOutside: false,
                slidesToSlide: 1,
                swipeable: false,
                showDots: true,
                imgUrls: productDetails.imgurls,
                goToProductRecommendation,
              }}
            ></ProductCarousel>
            <ProductDetailsWrapper>
              <ProductNamePrice
                {...{
                  productName,
                  isProductSoldOut: !!productDetails.isProductSoldOut,
                  wishlistId: updatedWishListId === undefined ? wishlistId : updatedWishListId,
                  retailPrice,
                  retailPriceMax,
                  selectedSku: skuValue,
                  regularPrice,
                  discount,
                  addToWishlist,
                  deleteFromWishlist,
                }}
              ></ProductNamePrice>
              <SizeAndChartLabels
                {...{
                  isOneSize,
                  hasSizeChart: productDetails.hasSizeChart,
                  qtyLeft,
                  simpleSkus,
                  onSizeChartClick: openSizeChartPopup,
                }}
              ></SizeAndChartLabels>
              {!isOneSize && (
                <CustomSizePicker
                  {...{
                    simpleSkus,
                    selectedSku: skuValue,
                    onSizeSelect,
                  }}
                ></CustomSizePicker>
              )}
              {showRfypCue && showRFYP && (
                <RecommendedProductsLinks
                  {...{ isProductSoldOut: !!productDetails.isProductSoldOut, goToProductRecommendation }}
                ></RecommendedProductsLinks>
              )}
              <DeliveryDetails
                {...{
                  ...deliveryDetailsData,
                  selectedSku: skuValue,
                  ...deliveryDetails,
                  openPinCodePopup,
                  openSizeSelector,
                }}
              ></DeliveryDetails>
              {productDetails.id && (
                <Accordion {...{ ...product, isPresale, simpleSkus, selectedSku: skuValue }}></Accordion>
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
            <AddToCart {...{ show: true, disabled: false, addProductToCart }}></AddToCart>
          </>
        )}
      </QueryClientProvider>
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productDetails, null, 4)}</pre> */}
    </>
  );
};

export default Product;
