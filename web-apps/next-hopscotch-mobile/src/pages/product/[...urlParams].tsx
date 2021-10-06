import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  AddToCart,
  Accordion,
  NavBar,
  ProductNamePrice,
  ProductCarousel,
  DeliveryDetails,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
  Footer,
  RecommendedProductsLinks,
} from '@hs/components';

import { toast } from 'react-toastify';
import { IProductProps, urlParamsProps, IWishListProps, ICartAPIResponse, IUserInfoProps } from '@/types';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { cookiesService, productDetailsService, timeService } from '@hs/services';
import { useState, useEffect, useRef } from 'react';
import sortBy from 'lodash/sortBy';
import {
  ProductDetailsWrapper,
  CartLink,
  CartNotification,
  CartNotificationDetails,
  CartHeader,
  CartMessage,
  CartLinkText,
} from './StyledUrlParams';
import { useModal } from 'react-hooks-use-modal';

const SizeChartPopupComponent = dynamic(() => import('../../components/size-chart/SizeChart'), {
  ssr: false,
});

const SizeSelectorPopupComponent = dynamic(() => import('../../components/size-selector/SizeSelector'), {
  ssr: false,
});

import {
  useProduct,
  useRecommendation,
  IRecommendedProducts,
  useDeliveryDetails,
  useSelectedProduct,
  useOneSize,
  useSegment,
  IProductDetails,
  ISimpleSkusEntityProps,
  getProductTrackingData,
  COOKIE_DATA,
} from '@hs/framework';

import * as segment from '@/components/segment-analytic';
import { LoginModal } from '@/components/login-modal';
// const ADD_TO_CART_BUTTON = 'Add to cart button';
let CUSTOMER_INFO: IUserInfoProps;
const SUCCESS = 'success';
const tryLater = 'Try Later';
const CUSTOMER_INFO_COOKIE_NAME = 'hs_customer_info';
const GUEST_CUSTOMER_INFO = 'hs_guest_customer_info';
const CART_ITEM_QTY_COOKIE_NAME = 'cart_item_quantity';
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
  await queryClient.prefetchQuery(
    ['RecommendedProducts', productId],
    () => productDetailsService.getRecommendedProducts(productId, { boutiqueId: undefined }, process.env.WEB_HOST),
    {
      staleTime: Infinity,
    },
  );
  await queryClient.prefetchQuery(
    ['SimilarProducts', productId],
    () => productDetailsService.getSimilarProducts(productId, { boutiqueId: undefined }, process.env.WEB_HOST),
    {
      staleTime: Infinity,
    },
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
const Product: NextPage = (props) => {
  const router = useRouter();
  const similarProductsLink = useRef<HTMLDivElement>(null);
  const recommendedProductsLink = useRef<HTMLDivElement>(null);
  const urlParams = router.query as unknown as IProductProps;
  const [productId]: urlParamsProps | any = [...(urlParams.urlParams || [])];
  const [cartItemQty, setCartItemQty] = useState<number>(0);
  const [productInfo, setProductInfo] = useState<IProductDetails | any>({}); // productDetails with modification

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

  const { productName, simpleSkus, ...product } = useProduct({ productData: productInfo });

  const [sku, setSku] = useState<ISimpleSkusEntityProps | any>();

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

  const {
    // deliveryMsg,
    discount,
    // finalSale,
    // isPresale,
    qtyLeft,
    retailPrice,
    retailPriceMax,
    regularPrice,
    selectedSku,
    selectedSkuId,
  } = useSelectedProduct({
    productData: productInfo,
    selectedSku: sku,
  }); // productForm
  const { isOneSize } = useOneSize({
    productData: productInfo,
  });

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku,
    productData: productInfo,
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
      setCartItemQty(quantity);
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
            setCartItemQty(response.cartItemQty);
            cookiesService.setCookies({
              key: CART_ITEM_QTY_COOKIE_NAME,
              value: response.cartItemQty,
              options: expireProp,
            });
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
            <img src={`${productInfo.imgurls[0] && productInfo.imgurls[0].imgUrlThumbnail}`} alt={`${productName}`} />
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
            setCartItemQty(addToCartResponse.cartItemQty);

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
      retailPrice = productInfo.retailPrice;
    }
    let wishlistItem = {
      sku: selectedSkuId,
      productId: productInfo.id,
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

  useEffect(() => {
    if (isProductDetailsSuccess) {
      if (productDetails && productDetails.action === SUCCESS) {
        let showRfypCue = false;
        const setDetails = () => {
          const simpleSkus = sortBy(productDetails.simpleSkus, function (skus: ISimpleSkusEntityProps) {
            return !(skus.availableQuantity > 0);
          });

          let isfirst = false,
            isDefault = false,
            isProductSoldOut = false;

          const selectSku = (skuList: ISimpleSkusEntityProps[]) => {
            for (let i = 0; i < skuList.length; i++) {
              const sku = skuList[i];
              if (sku.availableQuantity > 0) {
                isProductSoldOut = false;
                if (skuList.length === 1) {
                  isfirst = true;
                  isDefault = true;
                } else {
                  isfirst = false;
                  isDefault = true;
                }
                setSku(sku);
                return;
              }
            }
            setSku(skuList[0]);
            isfirst = false;
            isProductSoldOut = true;
          };
          selectSku(simpleSkus);
          setProductInfo({
            ...productDetails,
            showRfypCue,
            isfirst,
            isDefault,
            isProductSoldOut,
            simpleSkus,
          });
        };
        const soldOutSkus = productDetails.simpleSkus.find((sku) => !(sku.availableQuantity > 0));
        showRfypCue = !!soldOutSkus;
        setCartItemQty(productDetails.quantity);
        setDetails();
      }
    }
  }, [isProductDetailsSuccess, productDetails]);

  // cookiesService.setCookies({ key: 'test', value: 'test value' });
  return (
    <div>
      <main>
        {productInfo && productInfo.action === SUCCESS && (
          <div>
            <Head>
              <title>{`Shop Online ${productName} at ₹${retailPrice}`}</title>
              <meta
                name="description"
                content={`Buy ${productName} online in India at ₹${retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`}
              />
              <meta property="og:title" content={`Shop Online ${productName} at ₹${retailPrice}`} />
              <meta
                property="og:description"
                content={`Buy ${productName} online in India at ₹${retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`}
              />
              <meta
                name="keywords"
                content={`${productName?.replace(
                  /-|:|_/gi,
                  ' ',
                )},online shopping for ${productInfo?.productName?.replace(/-|:|_/gi, ' ')}`}
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar count={cartItemQty}></NavBar>
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
                imgUrls: productInfo.imgurls,
                goToProductRecommendation,
              }}
            ></ProductCarousel>
            <ProductDetailsWrapper>
              <ProductNamePrice
                {...{
                  productName,
                  isProductSoldOut: productInfo.isProductSoldOut,
                  wishlistId: productInfo.wishlistId,
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
                  hasSizeChart: productInfo.hasSizeChart,
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
              {productInfo.showRfypCue && showRFYP && (
                <RecommendedProductsLinks
                  {...{ isProductSoldOut: productInfo.isProductSoldOut, goToProductRecommendation }}
                ></RecommendedProductsLinks>
              )}
              <DeliveryDetails {...deliveryDetailsData}></DeliveryDetails>
              {productInfo.id && (
                <Accordion {...{ productData: productInfo, simpleSkus, selectedSku, ...product }}></Accordion>
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
              <Footer />
            </ProductDetailsWrapper>
            <AddToCart {...{ show: true, disabled: false, addProductToCart }}></AddToCart>
          </div>
        )}
        <SizeChartPopupModal>
          {isSizeChartPopupOpen && (
            <SizeChartPopupComponent
              {...{
                id: productInfo.id,
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
                showRfypCue: true,
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
      </main>
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productDetails, null, 4)}</pre> */}
    </div>
  );
};

export default Product;
