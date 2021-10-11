import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef, ReactElement, useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import {
  AddToCart,
  Accordion,
  ProductCarousel,
  DeliveryDetails,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
  RecommendedProductsLinks,
  ProductNamePrice,
} from '@hs/components';

import {
  IProductProps,
  urlParamsProps,
  IWishListProps,
  ICartAPIResponse,
  IUserInfoProps,
  NextPageWithLayout,
} from '@/types';
import { cookiesService, productDetailsService, timeService } from '@hs/services';
import {
  ProductDetailsWrapper,
  CartLink,
  CartNotification,
  CartNotificationDetails,
  CartHeader,
  CartMessage,
  CartLinkText,
} from '@/styles';

const SizeChartPopupComponent = dynamic(() => import('../../components/size-chart/SizeChart'), {
  ssr: false,
});

const SizeSelectorPopupComponent = dynamic(() => import('../../components/size-selector/SizeSelector'), {
  ssr: false,
});

import {
  useRecommendation,
  IRecommendedProducts,
  useDeliveryDetails,
  useSelectedProduct,
  useOneSize,
  useProduct,
  useSegment,
  IProductDetails,
  ISimpleSkusEntityProps,
  getProductTrackingData,
  COOKIE_DATA,
  CartItemQtyContext,
} from '@hs/framework';

import * as segment from '@/components/segment-analytic';
import { LoginModal } from '@/components/login-modal';
import { Layout } from '@/components/layout/Layout';
import { ProductHead } from '@/components/header';
// import { useProduct } from '@/components/use-product';
// import { ProductNamePrice } from '@/components/product-name-price';
// const ADD_TO_CART_BUTTON = 'Add to cart button';
let CUSTOMER_INFO: IUserInfoProps;
const SUCCESS = 'success';
const tryLater = 'Try Later';
const CUSTOMER_INFO_COOKIE_NAME = 'hs_customer_info';
const GUEST_CUSTOMER_INFO = 'hs_guest_customer_info';
// const CART_ITEM_QTY_COOKIE_NAME = 'cart_item_quantity';
// const CART_TRACKING_COOKIE_NAME = 'cart_tracking_data';
// const getProductDetails = <P, R>(): Promise<R> => {
//   const params = { currentTime: new Date().getTime() };
//   // return httpService.get<R>({ url: `/api/product/${productId}`, params });
//   return httpService.get<R>({ url: '/api/product/948332', params });
// };

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
    },
  };
};
const Product: NextPageWithLayout = (props) => {
  const router = useRouter();
  const similarProductsLink = useRef<HTMLDivElement>(null);
  const recommendedProductsLink = useRef<HTMLDivElement>(null);
  const urlParams = router.query as unknown as IProductProps;
  const [productId]: urlParamsProps | any = [...(urlParams.urlParams || [])];
  const [productInfo, setProductInfo] = useState<IProductDetails | any>({}); // productDetails with modification
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const [LoginPopupModal, openLoginPopup, closeLoginPopup, isLoginPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const [SizeChartPopupModal, openSizeChartPopup, closeSizeChartPopup, isSizeChartPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const [SizeSelectorPopupModal, openSizeSelector, closeSizeSelector, isSizeSelectorPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const { data: productDetails, isSuccess: isProductDetailsSuccess } = useQuery<IProductDetails>(
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

  const [sku, setSku] = useState<ISimpleSkusEntityProps | any>();
  const {
    productName,
    selectedSku,
    retailPrice,
    regularPrice,
    discount,
    isPresale,
    finalSale,
    qtyLeft,
    simpleSkus,
    showRfypCue,
    ...product
  } = useProduct({ productData: productDetails, sku });

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

  const { retailPriceMax, selectedSkuId } = useSelectedProduct({
    productData: productDetails,
    selectedSku: sku,
  }); // productForm

  const { isOneSize } = useOneSize({
    productData: productDetails,
  });

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku,
    productData: productDetails,
  });

  const goToProductRecommendation = (fromLocation: string) => {
    if (fromLocation) {
      const currentRefElement = showRFYP ? recommendedProductsLink : similarProductsLink;
      currentRefElement?.current?.scrollIntoView({ behavior: 'smooth' });
      segment.trackEvent({
        evtName: segment.PDP_TRACKING_EVENTS.PDP_SEE_SIMILAR_CLICKED,
        properties: {
          ...properties,
          reco_type: 'Similar products',
          product_id: productId,
          from_location: fromLocation,
        },
        contextData,
      });
    }
  };

  const [{ contextData, properties }] = useSegment();
  // const pdpTrackingData = useProductTracking({ selectedSku, productDetails });

  const closeLoginModalPopup = (quantity?: number) => {
    if (quantity != undefined) {
      updateCartItemQty(quantity);
      addToWishlistAfterModalClose();
    }
    closeLoginPopup();
  };

  useEffect(() => {
    if (contextData && properties && productDetails) {
      segment.trackEvent({
        evtName: segment.PDP_TRACKING_EVENTS.PRODUCT_VIEWED,
        properties: {
          ...properties,
          ...getProductTrackingData({ productDetails }),
          addFrom: 'current=' + location.pathname,
        },
        contextData,
      });
    }
  }, [contextData, productDetails, properties]);

  useEffect(() => {
    (async () => {
      try {
        const response: IUserInfoProps = await productDetailsService.getUserInfo();
        CUSTOMER_INFO = response;
        const expireProp = { expires: new Date(timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000) };
        if (response.action === SUCCESS) {
          if (response.isLoggedIn) {
            cookiesService.setCookies({ key: CUSTOMER_INFO_COOKIE_NAME, value: response, options: expireProp });
          } else {
            cookiesService.setCookies({ key: GUEST_CUSTOMER_INFO, value: response, options: expireProp });
          }
          if (response.cartItemQty !== undefined) {
            updateCartItemQty(response.cartItemQty);
            // cookiesService.setCookies({
            //   key: COOKIE_DATA.CART_ITEM_QTY,
            //   value: response.cartItemQty,
            //   options: expireProp,
            // });
          }
        }
      } catch (error) {
        const errorResponse = error as unknown as IUserInfoProps;
        CUSTOMER_INFO = errorResponse;
      }
    })();
  }, []);

  const addToWishlist = () => {
    if (CUSTOMER_INFO.isLoggedIn) {
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
      openLoginPopup();
    }
  };

  const goToCart = (path = '/v2/cart') => {
    console.log(`${window.location.protocol}//${window.location.host}${path}`);
    window.location.href = `${window.location.protocol}//${window.location.host}${path}`;
  };

  const getToasterContent = (response: ICartAPIResponse) => {
    return (
      <>
        <CartNotification>
          <CartLink
            onClick={() => {
              goToCart();
            }}
          >
            <img
              src={`${productDetails?.imgurls[0] && productDetails.imgurls[0].imgUrlThumbnail}`}
              alt={`${productName}`}
            />
            <CartNotificationDetails>
              {!isOneSize && <CartHeader>{`${sku.attrs[0].name} : ${sku.attrs[0].value}`}</CartHeader>}
              <CartMessage>Added to your Cart!</CartMessage>
              <CartLinkText>View cart</CartLinkText>
            </CartNotificationDetails>
          </CartLink>
        </CartNotification>
      </>
    );
  };

  const addProductToCart = () => {
    if (sku) {
      const data = { sku: sku.skuId, quantity: 1 };
      (async () => {
        try {
          const addToCartResponse: ICartAPIResponse = await productDetailsService.addItemToCart(data);
          const atc_user = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
          if (addToCartResponse.action === SUCCESS) {
            updateCartItemQty(addToCartResponse.cartItemQty);

            toast(getToasterContent(addToCartResponse), {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: false,
              hideProgressBar: true,
              autoClose: 2250,
              toastId: 'cartQuantiyChangeToaster',
              bodyClassName: 'cartQuantiyChangeBodyToaster',
            });
            segment.trackEvent({
              evtName: segment.PDP_TRACKING_EVENTS.ADDED_TO_CART,
              properties: {
                ...properties,
                ...getProductTrackingData({ productDetails, selectedSku: sku }),
                atc_user,
                addFrom: 'current=' + location.pathname,
              },
              contextData,
            });
            return;
          }
        } catch (error: any) {
          const errorMessage = error ? error.message : tryLater;
          toast.error(errorMessage, {
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
        }
      })();

      return;
    }
    openSizeSelector();
  };

  const onSizeSelect = (sku: ISimpleSkusEntityProps, fromLocation: string) => {
    segment.trackEvent({
      evtName: segment.PDP_TRACKING_EVENTS.SIZE_CLICKED,
      properties: {
        ...properties,
        ...getProductTrackingData({ productDetails, selectedSku: sku }),
        addFrom: 'current=' + location.pathname,
        from_location: fromLocation,
      },
      contextData,
    });
    setSku(sku);
  };

  const deleteFromWishlist = () => {
    (async () => {
      try {
        const wishListStatus: IWishListProps = await productDetailsService.deleteFromWishlist(productInfo.wishlistId);
        if (wishListStatus.action === SUCCESS) {
          setProductInfo({ ...productInfo, wishlistId: 0 });
          if (navigator && navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const addToWishlistAfterModalClose = () => {
    let retailPrice = 0;
    if (selectedSku) {
      retailPrice = selectedSku.retailPrice;
    } else {
      retailPrice = productDetails.retailPrice;
    }
    const wishlistItem = {
      sku: selectedSkuId,
      productId: productDetails.id,
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
        if (wishListStatus.action === SUCCESS) {
          setProductInfo({ ...productInfo, wishlistId: wishListStatus.wishlistItemId });
          if (navigator && navigator.vibrate) {
            navigator.vibrate(200);
          }
        }
      } catch {}
    })();
  };

  // cookiesService.setCookies({ key: 'test', value: 'test value' });
  return (
    <>
      {productDetails && productDetails.action === SUCCESS && (
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
                wishlistId: productDetails.wishlistId,
                retailPrice,
                retailPriceMax,
                selectedSku,
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
                  selectedSku: sku,
                  onSizeSelect,
                }}
              ></CustomSizePicker>
            )}
            {showRfypCue && showRFYP && (
              <RecommendedProductsLinks
                {...{ isProductSoldOut: !!productDetails.isProductSoldOut, goToProductRecommendation }}
              ></RecommendedProductsLinks>
            )}
            <DeliveryDetails {...deliveryDetailsData}></DeliveryDetails>
            {productDetails.id && <Accordion {...{ ...product, isPresale, simpleSkus, selectedSku }}></Accordion>}

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
      <SizeChartPopupModal>
        {isSizeChartPopupOpen && productDetails && (
          <SizeChartPopupComponent
            {...{
              id: productDetails.id,
              productName: productName,
              onClickClose: closeSizeChartPopup,
            }}
          ></SizeChartPopupComponent>
        )}
      </SizeChartPopupModal>

      <SizeSelectorPopupModal>
        {isSizeSelectorPopupOpen && (
          <SizeSelectorPopupComponent
            {...{
              closePopup: closeSizeSelector,
              showRfypCue,
              showAddToCart: true,
              onSizeChartClick: openSizeChartPopup,
              simpleSkus,
              selectedSku: sku,
              onSizeSelect,
              goToProductRecommendation,
              addProductToCart,
            }}
          ></SizeSelectorPopupComponent>
        )}
      </SizeSelectorPopupModal>

      <LoginPopupModal>
        {isLoginPopupOpen && <LoginModal {...{ closeLoginPopup: closeLoginModalPopup }}></LoginModal>}
      </LoginPopupModal>
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productDetails, null, 4)}</pre> */}
    </>
  );
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
