import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, ReactElement, useContext } from 'react';
import { useModal } from 'react-hooks-use-modal';
import { toast } from 'react-toastify';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { Layout } from '@/components/layout/Layout';
const ProductDesktop = dynamic(() => import('@/components/pdp'), {
  ssr: true,
});
const SizeChartPopupComponent = dynamic(() => import('../../components/size-chart'), {
  ssr: false,
});

const PinCodePopupComponent = dynamic(() => import('../../components/pin-code/PinCode'), {
  ssr: false,
});

import { ProductHead } from '@hs/components';
import { IProductProps, ICartAPIResponse, NextPageWithLayout, IUpdatedDeliverDetailsProps } from '@/types';
import { cookiesService, productDetailsService } from '@hs/services';
import { CartLink, CartNotification, CartNotificationDetails, CartHeader, CartMessage, CartLinkText } from '@/styles';
import {
  IRecommendedProducts,
  useOneSize,
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
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      url,
    },
  };
};
const Product: NextPageWithLayout<IProductProps> = ({ url, productId }: IProductProps) => {
  const [deliveryDetails, updateDeliveryDetails] = useState<IUpdatedDeliverDetailsProps>();
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const [addedToCart, updateAddedToCart] = useState<boolean>(false);

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
  const { productName, retailPrice, simpleSkus, defaultSku } = useProduct({
    productData,
    selectedSku,
  });

  const { isOneSize } = useOneSize({
    productData,
  });

  const [{ contextData, properties }] = useSegment();

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
    const pickedProperties: Record<string, string | number> = { sku: sku.skuId, quantity: 1 };
    const props: Record<string, string> = { ...properties } as unknown as Record<string, string>;
    const propertiesSubset = ['funnel', 'funnel_tile', 'funnel_section', 'plp', 'source', 'section'];

    for (let index = 0; index < propertiesSubset.length; index++) {
      const element = propertiesSubset[index];
      pickedProperties[element] = (props && props[element]) || '';
    }

    pickedProperties['sortBy'] = props['sort_by'] || '';
    pickedProperties['sortBar'] = props['sortbar'] || '';
    pickedProperties['subSection'] = props['subsection'] || '';
    pickedProperties['sortBarGroup'] = props['sortbar_group'] || '';

    (async () => {
      try {
        const atc_user = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
        const addToCartResponse: ICartAPIResponse = await productDetailsService.addItemToCart({
          ...pickedProperties,
          atc_user,
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
          return;
        }
      } catch (error: any) {
        const errorMessage = error ? error.message : tryLater;
        showErrorNotification(errorMessage);
      }
    })();
  };

  // remove
  const openSizeSelector = () => {
    console.log('Open size selector logic pending');
  };
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

  const goToCart = () => {
    console.log('test');
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
          <ProductDesktop
            {...{
              productId,
              productData,
              selectedSku,
              deliveryDetails,
              recommendedProductDetails,
              similarProductDetails,
              openSizeChartPopup,
              onSizeSelect,
              openPinCodePopup,
              openSizeSelector,
              addProductToCart,
              addedToCart,
              goToCart,
            }}
          ></ProductDesktop>
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
      {/* <GoToTopDesktop></GoToTopDesktop> */}
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productData, null, 4)}</pre> */}
    </>
  );
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
