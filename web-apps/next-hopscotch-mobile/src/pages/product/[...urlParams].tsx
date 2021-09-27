import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Accordion,
  NavBar,
  ProductNamePrice,
  DeliveryDetails,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
  Footer,
  RecommendedProductsLinks,
} from '@hs/components';
import { IProductProps, IProductDetails, ISimpleSkusEntityProps, urlParamsProps, IWishListProps } from '@/types';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { cookiesService, productDetailsService } from '@hs/services';
import { useState, useEffect, useRef } from 'react';
import sortBy from 'lodash/sortBy';
import { ProductDetailsWrapper } from './StyledUrlParams';
import { useModal } from 'react-hooks-use-modal';

const SizeChartPopupComponent = dynamic(() => import('../../components/size-chart/SizeChart'), {
  ssr: false,
});
import {
  useProduct,
  useRecommendation,
  IRecommendedProducts,
  useDeliveryDetails,
  useSelectedProduct,
  useOneSize,
} from '@hs/framework';

// const ADD_TO_CART_BUTTON = 'Add to cart button';
const SIZE_LIST_UPFRONT = 'Size list upfront';
const SUCCESS = 'success';

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
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [sku, setSku] = useState<ISimpleSkusEntityProps>();
  const [productInfo, setProductInfo] = useState<IProductDetails | any>({}); // productDetails with modification

  // const [quantity, setQuantity] = useState<number>(0);
  // const showNewPromo = _self._AbTestService.isOnNewPromo();
  // const SHOW_RFYP = true;

  const [Modal, open, close, isOpenBool] = useModal('root', {
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

  const { ...product } = useProduct({ productData: productInfo });

  const { canShow: showSimilarProducts, ...similarProducts } = useRecommendation({
    section: 'RFYP',
    showmatching: true,
    recommended: similarProductDetails,
    id: 'similarproducts',
    pid: productInfo.id,
  });

  const { canShow: showRFYP, ...recommendedForYou } = useRecommendation({
    section: 'UserRecoPDP',
    showmatching: false,
    recommended: recommendedProductDetails,
    id: 'productrecommendations',
    pid: productInfo.id,
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

  const { isOneSize, productName, skuAttributes } = useOneSize({
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
    }
  };

  const addToWishlist = () => {
    if (1) {
      // check for login
      addToWishlistAfterModalClose();
    }
    // else {
    //   this.toastr.info('Sign in to add this item to your Wishlist.');
    //   self._ModalService.showLoginModal(
    //     null,
    //     false,
    //     { message: 'Helllo' },
    //     this.addToWishlistAfterModalClose.bind(self, product),
    //   );
    // }
  };

  const deleteFromWishlist = () => {
    if (1) {
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
    } else {
      // delete wishlist method will be executed
      // if and only if user logged in and made the product as wishlist
      // self._ModalService.showLoginModal();
    }
  };

  const addToWishlistAfterModalClose = () => {
    if (1) {
      // check for login
      // let cookiesUserType = self._$cookies.get(WEBSITE_CUSTOMER_SEGMENT);
      // let atc_user = self._SegmentService.getATCUser(self._CustomerService.isLoggedIn(), cookiesUserType);
      // let oa_data = self.SessionStorageService.getData('oa_data') || {};
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
    }
  };

  // setSimilarProducts
  useEffect(() => {
    if (isProductDetailsSuccess) {
      if (productDetails && productDetails.action === SUCCESS) {
        const updateProductDetail = (sku: ISimpleSkusEntityProps, isfirst: boolean, isDefault = false) => {
          setIsSelected(isfirst ? false : true);
          productDetails.isDefault = isDefault;
          productDetails.isfirst = isfirst;
          if (!sku) {
            return;
          }
          setSku(sku);
        };

        const setDetails = () => {
          productDetails.simpleSkus = sortBy(productDetails.simpleSkus, function (skus: ISimpleSkusEntityProps) {
            return !(skus.availableQuantity > 0);
          });

          // TODO: Logic to show default selection of sku and checking quantity > 0
          const selectSku = (skuList: ISimpleSkusEntityProps[]) => {
            for (let i = 0; i < skuList.length; i++) {
              const sku = skuList[i];
              if (sku.availableQuantity > 0) {
                productDetails.isProductSoldOut = false;
                if (skuList.length > 1) {
                  updateProductDetail(sku, true, true);
                } else {
                  updateProductDetail(sku, false, true);
                }
                return;
              }
            }
            updateProductDetail(skuList[0], false);
            productDetails.isProductSoldOut = true;
          };
          selectSku(productDetails.simpleSkus);
          setProductInfo(productDetails);
        };
        const soldOutSkus = productDetails.simpleSkus.find((sku) => !(sku.availableQuantity > 0));
        productDetails.showRfypCue = !!soldOutSkus;
        setDetails();
      }
    }
  }, [isProductDetailsSuccess, productDetails]);

  cookiesService.setCookies({ key: 'test', value: 'test value' });
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
                content={`${productInfo?.productName?.replace(
                  /-|:|_/gi,
                  ' ',
                )},online shopping for ${productInfo?.productName?.replace(/-|:|_/gi, ' ')}`}
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar count={productInfo && productInfo.quantity}></NavBar>
            <ProductDetailsWrapper>
              <ProductNamePrice
                {...{
                  productName: productName,
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
                  simpleSkus: productInfo.simpleSkus,
                  onSizeChartClick: open,
                }}
              ></SizeAndChartLabels>
              {!isOneSize && (
                <CustomSizePicker
                  {...{
                    simpleSkus: productInfo.simpleSkus,
                    skuAttributes,
                    selectedSkuId,
                    isSelected,
                    sizeListUpfront: SIZE_LIST_UPFRONT,
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
                <Accordion {...{ productData: productInfo, skuAttributes, selectedSku, ...product }}></Accordion>
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
          </div>
        )}
        <Modal>
          {isOpenBool && (
            <SizeChartPopupComponent
              {...{
                id: productInfo.id,
                productName: productName,
                onClickClose: close,
              }}
            ></SizeChartPopupComponent>
          )}
        </Modal>
      </main>
      <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productDetails, null, 4)}</pre>
    </div>
  );
};

export default Product;
