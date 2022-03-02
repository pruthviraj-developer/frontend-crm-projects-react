import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import * as segment from '@/components/segment-analytic';
import * as gtm from '@/components/google-tag-manager/GTMLib';
import { ProductHead } from '@hs/components';
import {
  IProductProps,
  IWishListProps,
  ICartAPIResponse,
  IErrorStateProps,
  IUpdatedDeliverDetailsProps,
} from '@/types';
import { cookiesService, productDetailsService } from '@hs/services';
import { CartLink, CartNotification, CartNotificationDetails, CartHeader, CartMessage, CartLinkText } from '@/styles';
import {
  IRecommendedProducts,
  useOneSize,
  useProduct,
  useSegment,
  IProductDetails,
  ISimpleSkusEntityProps,
  getProductTrackingData,
  getSchemaData,
  getCanonicalUrl,
  COOKIE_DATA,
  CartItemQtyContext,
  LoginContext,
  UserInfoContext,
  LOCAL_DATA,
  SESSION_DATA,
  useSessionStorage,
  IOfferDetailsProps,
} from '@hs/framework';

const SizeChartPopupComponentDeskTop = dynamic(() => import('@/components/size-chart/desktop'), {
  ssr: false,
});

const OffersPopUpComponent = dynamic(() => import('@/components/offers-popup'), {
  ssr: false,
});

const SizeChartPopupComponentMobile = dynamic(() => import('@/components/size-chart/mobile'), {
  ssr: false,
});

const SizeSelectorMobile = dynamic(() => import('@/components/size-selector/mobile'), {
  ssr: false,
});

const PinCodeMobile = dynamic(() => import('@/components/pin-code/mobile'), {
  ssr: false,
});

const PinCodeDesktop = dynamic(() => import('@/components/pin-code/desktop'), {
  ssr: false,
});

const LoginPopup = dynamic(() => import('@/components/login-modal'), {
  ssr: false,
});

const ProductMobile = dynamic(() => import('@/components/pdp/mobile'), {
  ssr: true,
});
const ProductDesktop = dynamic(() => import('@/components/pdp/desktop'), {
  ssr: true,
});
const tryLater = 'Try Later';

export const ProductPage = ({ productId, isMobile, url }: IProductProps) => {
  const router = useRouter();
  const [deliveryDetails, updateDeliveryDetails] = useState<IUpdatedDeliverDetailsProps>();
  const [updatedWishListId, updateWishListId] = useState<number>();
  const [addToWishlistStatus, setAddToWishlistStatus] = useState<boolean>(false);
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const [addedToCart, updateAddedToCart] = useState<boolean>(false);
  const [offersUrl, setOffersUrl] = useState<string>('');
  const { showLoginPopup } = useContext(LoginContext);
  const { userInfo } = useContext(UserInfoContext);
  const [, setGotoCartLocation] = useSessionStorage<string>(SESSION_DATA.CART_LOCATION, null);
  const [LoginPopupModal, openLoginPopup, closeLoginPopup, isLoginPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const [SizeChartPopupModal, openSizeChartPopup, closeSizeChartPopup, isSizeChartPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });

  const [OffersPopupModal, openOffersPopup, closeOffersPopup, isOffersPopupOpen] = useModal('root', {
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

  const { data: offerDetails } = useQuery<IOfferDetailsProps>(
    ['OfferDetails', productId],
    () => productDetailsService.getPromotions(productId),
    {
      enabled: productId !== undefined,
    },
  );

  const [selectedSku, setSelectedSku] = useState<ISimpleSkusEntityProps | any>();
  const { productName, retailPrice, selectedSkuId, simpleSkus, wishlistId, defaultSku } = useProduct({
    productData: productData,
    selectedSku: selectedSku,
  });
  const { isOneSize } = useOneSize({
    productData: productData,
  });

  const [{ contextData, properties }] = useSegment();
  // const pdpTrackingData = useProductTracking({ selectedSku, productDetails });

  const closeLoginModalPopup = (status?: string | boolean) => {
    if (status && addToWishlistStatus) {
      addToWishlistAfterModalClose();
    }
    setAddToWishlistStatus(false);
    closeLoginPopup();
  };

  useEffect(() => {
    setSelectedSku(null);
    updateAddedToCart(false);
    if (simpleSkus && simpleSkus.length === 1) {
      const sku = simpleSkus[0];
      if (sku.availableQuantity) {
        setSelectedSku(sku);
      }
    }
  }, [productId]);

  useEffect(() => {
    if (contextData && properties && productData && contextData.traits?.hs_device_id !== '') {
      const id = setTimeout(
        () =>
          segment.trackEvent({
            evtName: segment.PDP_TRACKING_EVENTS.PRODUCT_VIEWED,
            properties: {
              ...properties,
              ...getProductTrackingData({ productData: productData }),
              addFrom: 'current=' + location.pathname,
            },
            contextData,
          }),
        0,
      );
      return () => {
        clearTimeout(id);
      };
    }
  }, [contextData, productData, properties]);

  useEffect(() => {
    if (productData && productId && productName && userInfo) {
      const id = setTimeout(
        () =>
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
          }),
        0,
      );
      return () => {
        clearTimeout(id);
      };
    }
  }, [productData, productId, productName, userInfo]);

  useEffect(() => {
    if (showLoginPopup) {
      openLoginPopup();
    }
  }, [showLoginPopup, openLoginPopup]);

  const addToWishlist = () => {
    if (userInfo && userInfo.isLoggedIn) {
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
              pathname: isMobile ? '/v2/cart' : '/w/cart',
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
    const {
      funnel,
      funnel_tile,
      funnel_section,
      plp,
      source,
      section,
      sort_by: sortBy,
      sortbar: sortBar,
      subsection: subSection,
      sortbar_group: sortBarGroup,
    } = properties || {};
    (async () => {
      try {
        const atc_user = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
        const addToCartResponse: ICartAPIResponse = await productDetailsService.addItemToCart({
          addFrom: 'current=' + location.pathname,
          funnel,
          funnel_tile,
          addFromDetails: 'nextjs',
          funnel_section,
          plp,
          source,
          section,
          sortBy,
          sortBar,
          subSection,
          sortBarGroup,
          atc_user,
          sku: sku.skuId,
          quantity: 1,
        });
        if (addToCartResponse.action === LOCAL_DATA.SUCCESS) {
          updateAddedToCart(true);
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
    } else if (isMobile) {
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
    updateAddedToCart(false);
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
    const atc_user = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
    const {
      funnel,
      funnel_tile,
      funnel_section,
      plp,
      source,
      section,
      sort_by: sortBy,
      sortbar: sortBar,
      subsection: subSection,
      sortbar_group: sortBarGroup,
    } = properties || {};
    const wishlistItem = {
      sku: selectedSkuId || '',
      productId: productData?.id,
      price: retailPrice,
      attribution: {
        funnel,
        funnel_tile,
        quick_shop: 'No',
        funnel_section,
        plp,
        source,
        section,
        sortBy,
        sortBar,
        subSection,
        sortBarGroup,
        atc_user,
        addFromDetails: 'nextjs',
        hs_framework: 'nextjs',
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
        deliveryMsg: newValues.edd,
      });
    }
  };

  const goToCart = () => {
    setGotoCartLocation('goto cart button');
  };

  const seeAllOffers = () => {
    if (offerDetails) {
      const cardCount: number = offerDetails?.cardCount || 0;
      if (cardCount > 1) {
        const getEncodedString = (elem?: string | number | boolean) => {
          return elem ? encodeURIComponent(elem) : elem;
        };
        const promotionUrl =
          `/v2/offers?site=web&fromScreen=${encodeURIComponent('Product details')}` +
          `&productId=${getEncodedString(productId)}` +
          `&bestPrice=${getEncodedString(offerDetails.bestPrice)}` +
          `&saving=${getEncodedString(offerDetails.saving)}` +
          `&offerCardsCount=${getEncodedString(offerDetails.cardCount)}`;
        // let promotionUrl = '/';
        // if (window.location.hostname === 'localhost') {
        //   promotionUrl =
        //     window.location.protocol +
        //     '//' +
        //     'localhost:3002' +
        //     `/v2/offers?site=web&fromScreen=${encodeURIComponent('Product details')}` +
        //     `&productId=${getEncodedString(productId)}` +
        //     `&bestPrice=${getEncodedString(offerDetails.bestPrice)}` +
        //     `&saving=${getEncodedString(offerDetails.saving)}` +
        //     `&offerCardsCount=${getEncodedString(offerDetails.cardCount)}`;
        // }
        setOffersUrl(promotionUrl);
        openOffersPopup();
      } else {
        const urlParams: Record<string, string | number | undefined> = {
          site: 'mweb',
          fromScreen: 'Product details',
          productId,
          offerCardsCount: offerDetails.cardCount,
        };
        if (offerDetails.promoOfferText) {
          urlParams['saving'] = offerDetails.saving;
          urlParams['bestPrice'] = offerDetails.bestPrice;
          urlParams['promoOfferText'] = offerDetails.promoOfferText;
        }
        router.push({
          pathname: offerDetails.actionURI,
          query: urlParams,
        });
      }
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
              schema: getSchemaData({ productData, defaultSku, url: url }),
              canonicalUrl: getCanonicalUrl({ productData, url }),
              url,
              discovery: !!productData?.discovery,
            }}
          ></ProductHead>
          {isMobile && (
            <ProductMobile
              {...{
                goToCart,
                productId,
                addedToCart,
                selectedSku,
                productData,
                seeAllOffers,
                offerDetails,
                onSizeSelect,
                addToWishlist,
                deliveryDetails,
                openPinCodePopup,
                openSizeSelector,
                addProductToCart,
                updatedWishListId,
                deleteFromWishlist,
                openSizeChartPopup,
                similarProductDetails,
                recommendedProductDetails,
              }}
            ></ProductMobile>
          )}
          {!isMobile && (
            <ProductDesktop
              {...{
                goToCart,
                productId,
                addedToCart,
                selectedSku,
                productData,
                seeAllOffers,
                offerDetails,
                onSizeSelect,
                deliveryDetails,
                openPinCodePopup,
                openSizeSelector,
                addProductToCart,
                openSizeChartPopup,
                similarProductDetails,
                recommendedProductDetails,
              }}
            ></ProductDesktop>
          )}
          <PinCodePopupModel>
            {isPinCodePopupOpen && isMobile && (
              <PinCodeMobile
                {...{
                  productId: productData.id,
                  pinCode: deliveryDetails?.pinCode || productData.pinCode,
                  closePinCodePopup: updateAndClosePinCodePopup,
                }}
              />
            )}
            {isPinCodePopupOpen && !isMobile && (
              <PinCodeDesktop
                {...{
                  productId: productData.id,
                  pinCode: deliveryDetails?.pinCode || productData.pinCode,
                  closePinCodePopup: updateAndClosePinCodePopup,
                }}
              />
            )}
          </PinCodePopupModel>
        </>
      )}
      <SizeChartPopupModal>
        {isSizeChartPopupOpen &&
          productData &&
          (isMobile ? (
            <SizeChartPopupComponentMobile
              {...{
                id: productData.id,
                productName: productName,
                onClickClose: closeSizeChartPopup,
              }}
            />
          ) : (
            <SizeChartPopupComponentDeskTop
              {...{
                id: productData.id,
                productName: productName,
                onClickClose: closeSizeChartPopup,
              }}
            />
          ))}
      </SizeChartPopupModal>

      <OffersPopupModal>
        {isOffersPopupOpen ? (
          <OffersPopUpComponent
            {...{
              closeOffersPopup,
              offersUrl,
            }}
          />
        ) : (
          <></>
        )}
      </OffersPopupModal>

      <SizeSelectorPopupModal>
        {isSizeSelectorPopupOpen && (
          <SizeSelectorMobile
            {...{
              closePopup: closeSizeSelector,
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
      {/* <GoToTop></GoToTop> */}
      {/* <pre style={{ width: '90%', overflowX: 'scroll' }}>{isMobile}</pre> */}
    </>
  );
};
