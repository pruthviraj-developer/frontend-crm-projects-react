import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, ReactElement, useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Parser from 'ua-parser-js';
const ProductMobile = dynamic(() => import('@/components/pdp'), {
  ssr: true,
});
const Layout = dynamic(() => import('@/components/layout/Layout'), {
  ssr: true,
});

import {
  IProductProps,
  IWishListProps,
  ICartAPIResponse,
  NextPageWithLayout,
  IErrorStateProps,
  IUpdatedDeliverDetailsProps,
} from '@/types';
import { cookiesService, productDetailsService } from '@hs/services';
import { CartLink, CartNotification, CartNotificationDetails, CartHeader, CartMessage, CartLinkText } from '@/styles';

const SizeChartPopupComponent = dynamic(() => import('@/components/size-chart/SizeChart'), {
  ssr: false,
});

const SizeSelectorMobile = dynamic(() => import('@/components/size-selector'), {
  ssr: false,
});

const PinCodeMobile = dynamic(() => import('@/components/pin-code'), {
  ssr: false,
});

const LoginPopup = dynamic(() => import('@/components/login-modal'), {
  ssr: false,
});

import {
  IRecommendedProducts,
  useOneSize,
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

import * as segment from '@/components/segment-analytic';
import * as gtm from '@/components/google-tag-manager/GTMLib';
// import { Layout } from '@/components/layout/Layout';
import { ProductHead } from '@/components/header';
import GoToTop from '@/components/go-to-top/GoToTop';

const tryLater = 'Try Later';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const productId = context.params?.urlParams?.[0] || '';
  const ua = Parser(context.req.headers['user-agent']);
  const isMobile = ua.device.type === Parser.DEVICE.MOBILE;
  await queryClient.prefetchQuery(
    ['ProductDetail', productId],
    () => productDetailsService.getProductDetails(productId, process.env.WEB_HOST),
    {
      staleTime: Infinity,
    },
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      isMobile,
    },
  };
};
const Product: NextPageWithLayout<IProductProps> = ({ productId, isMobile }: IProductProps) => {
  const [deliveryDetails, updateDeliveryDetails] = useState<IUpdatedDeliverDetailsProps>();
  const [updatedWishListId, updateWishListId] = useState<number>();
  const [addToWishlistStatus, setAddToWishlistStatus] = useState<boolean>(false);
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const { showLoginPopup } = useContext(LoginContext);
  const { userInfo } = useContext(UserInfoContext);
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

  const [PinCodePopupModel, openPinCodePopup, closePinCodePopup, isPinCodePopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

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

  const [selectedSku, setSelectedSku] = useState<ISimpleSkusEntityProps | any>();
  const { productName, retailPrice, selectedSkuId, simpleSkus, wishlistId } = useProduct({
    productData: productData,
    selectedSku: selectedSku,
  });
  const { isOneSize } = useOneSize({
    productData: productData,
  });

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
    setSelectedSku(null);
  }, [productId]);

  useEffect(() => {
    if (contextData && properties && productData) {
      segment.trackEvent({
        evtName: segment.PDP_TRACKING_EVENTS.PRODUCT_VIEWED,
        properties: {
          ...properties,
          ...getProductTrackingData({ productData: productData }),
          addFrom: 'current=' + location.pathname,
        },
        contextData,
      });
    }
  }, [contextData, productData, properties]);

  useEffect(() => {
    if (productData && productId && productName) {
      gtm.trackEvent({
        event: gtm.PRODUCT_IMPRESSION,
        data: {
          ecommerce: {
            detail: {
              products: [
                {
                  id: Number(productId),
                  name: productName,
                  brand: productData.brandName,
                  price: productData.retailPrice,
                  category: productData.categoryId,
                },
              ],
            },
          },
          productSkus: productData?.simpleSkus.map((sku: ISimpleSkusEntityProps) => sku.skuId),
          productId: Number(productId),
          productName: productName,
          productCategory: productData.categoryId,
          productPrice: productData.retailPrice,
        },
      });
    }
  }, [productData, productId, productName]);

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
                src={`${productData?.imgurls?.[0] && productData.imgurls[0].imgUrlThumbnail}`}
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
          segment.trackEvent({
            evtName: segment.PDP_TRACKING_EVENTS.ADDED_TO_CART,
            properties: {
              ...properties,
              ...getProductTrackingData({ productData: productData, selectedSku: sku }),
              atc_user,
              addFrom: 'current=' + location.pathname,
            },
            contextData,
          });

          gtm.trackEvent({
            event: gtm.ADD_TO_CART,
            data: {
              ecommerce: {
                currentCode: 'INR',
                add: {
                  products: [
                    {
                      id: Number(productId),
                      name: productName,
                      brand: productData?.brandName,
                      price: retailPrice,
                      category: productData?.categoryId,
                      quantity: 1,
                    },
                  ],
                },
              },
              category: 'Cart',
              action: 'cart-change',
              label: 'add-item',
              productId: Number(productId),
              productName: productName,
              productCategory: productData?.categoryId,
              productPrice: retailPrice,
              productSkuId: sku.skuId,
            },
          });
          return;
        }
      } catch (error: any) {
        const errorMessage = error ? error.message : tryLater;
        showErrorNotification(errorMessage);
      }
    })();
  };

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
    segment.trackEvent({
      evtName: segment.PDP_TRACKING_EVENTS.SIZE_CLICKED,
      properties: {
        ...properties,
        ...getProductTrackingData({ productData: productData, selectedSku: sku }),
        addFrom: 'current=' + location.pathname,
        from_location: fromLocation,
      },
      contextData,
    });
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
          {
            <ProductMobile
              {...{
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
                onSizeSelect,
                openPinCodePopup,
                openSizeSelector,
                addProductToCart,
              }}
            ></ProductMobile>
          }
          <PinCodePopupModel>
            {isPinCodePopupOpen && (
              <PinCodeMobile
                {...{
                  productId: productData.id,
                  pinCode: productData.pinCode,
                  closePinCodePopup: updateAndClosePinCodePopup,
                }}
              />
            )}
          </PinCodePopupModel>
        </>
      )}
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

      <SizeSelectorPopupModal>
        {isSizeSelectorPopupOpen && (
          <SizeSelectorMobile
            {...{
              closePopup: closeSizeSelector,
              showAddToCart: true,
              onSizeChartClick: openSizeChartPopup,
              simpleSkus,
              selectedSku: selectedSku,
              onSizeSelect,
              addProductToCart,
            }}
          ></SizeSelectorMobile>
        )}
      </SizeSelectorPopupModal>

      <LoginPopupModal>
        {/* {isLoginPopupOpen && <LoginModal {...{ closeLoginPopup: closeLoginModalPopup }}></LoginModal>} */}
        {isLoginPopupOpen && <LoginPopup {...{ closeLoginPopup: closeLoginModalPopup }}></LoginPopup>}
      </LoginPopupModal>
      <GoToTop></GoToTop>
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productDetails, null, 4)}</pre> */}
    </>
  );
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  if (page.props.isMobile) return <Layout>{page}</Layout>;
  else return <>{page}</>;
};
