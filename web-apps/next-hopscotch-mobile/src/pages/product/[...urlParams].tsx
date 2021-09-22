import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  Accordian,
  NavBar,
  ProductNamePrice,
  DeliveryDetails,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
  Footer,
  RecommendedProductsLinks,
} from '@hs/components';
import {
  IProductProps,
  IProductDetails,
  IProductFormProps,
  ISimpleSkusEntityProps,
  urlParamsProps,
  IWishListProps,
} from '@/types';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { cookiesService, productDetailsService } from '@hs/services';
import { useState, useEffect, useRef } from 'react';
import sortBy from 'lodash/sortBy';
import { ProductDetailsWrapper } from './StyledUrlParams';
import { useModal } from 'react-hooks-use-modal';

const SizeChartPopupComponent = dynamic(() => import('../../components/size-chart/SizeChart'), {
  ssr: false,
});
import { useRecommendation, IRecommendedProducts, useDeliveryDetails } from '@hs/framework';

// const ADD_TO_CART_BUTTON = 'Add to cart button';
const SIZE_LIST_UPFRONT = 'Size list upfront';
const ONE_SIZE = 'one size';
const ONESIZE = 'onesize';
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
  const [selectedSkuId, setSelectedSkuId] = useState<string>('');
  const [selectedSku, setSelectedSku] = useState<ISimpleSkusEntityProps>();
  const [product, setProduct] = useState<any>({});
  const [productInfo, setProductInfo] = useState<IProductDetails | any>({}); // productDetails with modification
  const [productForm, setProductForm] = useState<IProductFormProps | any>({});

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

  const deliveryDetailsData = useDeliveryDetails({
    selectedSku,
    productDetails,
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
            // self._ProductService.invalidateCategoryProductsV2Cache();
            // self._ProductService.invalidateSearchProductsV2Cache();
            // TODO: triggering PRODUCT_REMOVED_FROM_WISHLIST segment event
            // let segmentData = {};
            // if (angular.isDefined(self.productForm.selectedSku)) {
            //   segmentData = self.generateReqData(self.productForm.selectedSku);
            //   segmentData.sku = self.productForm.selectedSku.skuId;
            // } else {
            //   segmentData.sku = '';
            // }
            // segmentData.low_inventory =
            //   self.productForm.qtyLeft < 1 ? 'Sold out' : self.productForm.qtyLeft < 4 ? 'yes' : null;
            // segmentData.from_screen = 'Wishlist';
            // segmentData.from_location = 'Product tile';
            // segmentData.product_id = product.id;
            // segmentData.category = product.categoryName;
            // segmentData.subcategory = product.subcategoryName;
            // segmentData.brand = product.brandName;
            //segmentData.price_status = 'Same';
            // let extraSegData = self.getSegExtraData();
            // segmentData = Object.assign({},  segmentData, extraSegData);
            // self._SegmentService.track(self._SegmentService.EVENTS.PRODUCT_REMOVED_FROM_WISHLIST, segmentData);
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
      let skuId = '';
      let retailPrice = 0;
      if (productForm.selectedSku) {
        skuId = productForm.selectedSku.skuId;
        retailPrice = productForm.selectedSku.retailPrice;
      } else {
        retailPrice = productInfo.retailPrice;
      }
      let wishlistItem = {
        sku: skuId,
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
            // self._ProductService.invalidateCategoryProductsV2Cache();
            // self._ProductService.invalidateSearchProductsV2Cache();
            // // haptic feedback 200ms

            // // TODO: triggering PRODUCT_ADDED_TO_WISHLIST segment event
            // let segmentData = {};
            // let selectedData = {};
            // if (angular.isDefined(self.productForm.selectedSku)) {
            //   selectedData = self.generateReqData(self.productForm.selectedSku);
            //   segmentData = Object.assign({}, selectedData.segmentData, selectedData.cartData);
            // } else {
            //   segmentData.sku = '';
            // }
            // segmentData.from_screen = 'Product details';
            // segmentData.from_location = 'Wishlist icon';
            // segmentData.atc_user = atc_user;
            // let extraSegData = self.getSegExtraData();
            // segmentData = Object.assign({}, segmentData, extraSegData, {
            //   subproduct_type: self.productDetail.subProductTypeName,
            // });
            // self._SegmentService.track(self._SegmentService.EVENTS.PRODUCT_ADDED_TO_WISHLIST, segmentData);
          }
        } catch (e) {}
      })();
    }
  };

  // setSimilarProducts
  useEffect(() => {
    if (isProductDetailsSuccess) {
      if (productDetails && productDetails.action === SUCCESS) {
        const updateProductDetail = (
          sku: ISimpleSkusEntityProps,
          isfirst: boolean,
          isDefault = false,
          fromLocation?: string,
        ) => {
          const productForm: IProductFormProps | any = {};
          if (isfirst) {
            setIsSelected(false);
          } else {
            setIsSelected(true);
          }

          productDetails.isDefault = isDefault;
          // this.showSizeError = false;
          if (!sku) {
            return;
          }
          if (!isfirst) {
            setSelectedSkuId(sku.skuId);
            // this.showSizeSelectorOption = false;
            productForm['selectedSku'] = sku;
            setSelectedSku(sku);
            productForm['retailPrice'] = sku.retailPrice;
          } else {
            // this.showSizeSelectorOption = true;
            productForm['retailPrice'] = productDetails.retailPrice || sku.retailPrice;
          }
          // if (!this._$scope.isSelected) {
          //   this.showSizeSelectorOption = true;
          // }
          productForm['regularPrice'] = sku.regularPrice;
          //TODO: to be replaced by api variable once discount available in api
          productForm['discount'] = sku.discount;
          productForm['qtyLeft'] = sku.availableQuantity;
          // productForm['size'] = sku.attributes.size;
          productForm['isPresale'] = sku.isPresale;
          productForm['finalSale'] = sku.finalSale;
          productForm['deliveryMsg'] =
            isDefault && productDetails.edd ? productDetails.edd.split('Get it ').join('') : sku.deliveryMsg;
          productDetails.selectedSkuId = sku.skuId;
          setProductForm(productForm);
          // if (!isfirst && !isDefault) {
          //   var { segmentData, finalSegData } = this.generateReqData(sku);
          //   let extraSegData = this.getSegExtraData();
          //   finalSegData = Object.assign({}, segmentData, extraSegData);
          //   delete finalSegData.subtotal;
          //   delete finalSegData.sku;
          //   // Here "showSizePickerDropdown" flag is used for AB-Test EDD on PDP
          //   if (productDetails.showSizePickerDropdown) {
          //     finalSegData.from_location = fromLocation ? fromLocation : ADD_TO_CART_BUTTON;
          //   }
          //   this._SegmentService.track(this._SegmentService.EVENTS.SIZE_CLICKED, finalSegData);
          // }
        };

        const setAttrObject = () => {
          for (let i = 0; i < productDetails.simpleSkus.length; i++) {
            const sku: any = productDetails.simpleSkus[i];
            sku.attributes = {};
            for (let j = 0; j < sku.attrs.length; j++) {
              sku.attributes[sku.attrs[j].name.toLowerCase()] = sku.attrs[j].value;
            }
          }
        };

        const setDetails = () => {
          setAttrObject();
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
          if (!product.id) {
            selectSku(productDetails.simpleSkus);
          }
          // productDetails.hasSamePrice =
          // chain(productDetails.simpleSkus)?.map('retailPrice')?.uniq()?.value()?.length == 1;
          productDetails.productName = productDetails.simpleSkus[0] && productDetails.simpleSkus[0].productName;
          productDetails.isOneSize =
            productDetails.simpleSkus.length == 1 &&
            [ONESIZE, ONE_SIZE].includes(
              productDetails.simpleSkus[0] &&
                productDetails.simpleSkus[0].attributes &&
                productDetails.simpleSkus[0].attributes.size.toLowerCase(),
            );
          // productDetails.moreInfo =
          // '<div>\n<p><b>Country of Origin: </b> China</p>\n\n<b>Manufacturer Details:</b>\n<ul style="margin-bottom: 10px;">\n   <li>Mucheng,China</li>\n</ul>\n\n<b>Importer Details:</b>\n<ul>\n   <li>Hopscotch Wholesale Trading Pvt. Ltd,Mumbai</li>\n</ul>\n\n<b>Packer Details:</b>\n<ul>\n   <li>Mucheng,China</li>\n</ul>\n\n</div>';
          setProductInfo(productDetails);
          // (_self.productDetail.simpleSkus[0].attributes.size.toLowerCase() ==
          //   _self.configService.products.ONE_SIZE ||
          //   _self.productDetail.simpleSkus[0].attributes.size.toLowerCase() ==
          //   _self.configService.products.ONESIZE);
        };

        // const brandName = productDetails.brandName;
        // const price = productDetail.retailPrice;
        // const defaultTitle = `Shop Online ${productName} at ₹${price}`;
        // const description = `Buy ${productName} online in India at ₹${price}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`;
        // const keywords = [];
        // keywords.push(productName.replace(/-|:|_/gi, ' '));
        // keywords.push('online shopping for ' + productName.replace(/-|:|_/gi, ' '));
        // setShowRfyp(true);
        const soldOutSkus = productDetails.simpleSkus.find((sku) => !(sku.availableQuantity > 0));
        productDetails.showRfypCue = !!soldOutSkus;
        setDetails();
      }
    }
  }, [isProductDetailsSuccess, product, productDetails]);

  cookiesService.setCookies({ key: 'test', value: 'test value' });
  return (
    <div>
      <main>
        {productInfo && productInfo.action === SUCCESS && (
          <div>
            <Head>
              <title>{`Shop Online ${productInfo.productName} at ₹${productForm.retailPrice}`}</title>
              <meta
                name="description"
                content={`Buy ${productInfo.productName} online in India at ₹${productForm.retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`}
              />
              <meta
                property="og:title"
                content={`Shop Online ${productInfo.productName} at ₹${productForm.retailPrice}`}
              />
              <meta
                property="og:description"
                content={`Buy ${productInfo.productName} online in India at ₹${productForm.retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`}
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
                  name: productInfo.productName,
                  isProductSoldOut: productInfo.isProductSoldOut,
                  retailPrice: productForm.retailPrice,
                  retailPriceMax: productForm.retailPriceMax,
                  selectedSku: productForm.selectedSku,
                  regularPrice: productForm.regularPrice,
                  discount: productForm.discount,
                  addToWishlist,
                  deleteFromWishlist,
                }}
              ></ProductNamePrice>
              <SizeAndChartLabels
                {...{
                  isOneSize: productInfo.isOneSize,
                  hasSizeChart: productInfo.hasSizeChart,
                  qtyLeft: productForm.qtyLeft,
                  simpleSkus: productInfo.simpleSkus,
                  onSizeChartClick: open,
                }}
              ></SizeAndChartLabels>
              {!productInfo.isOneSize && (
                <CustomSizePicker
                  {...{
                    simpleSkus: productInfo.simpleSkus,
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
              {productInfo.id && <Accordian {...{ productInfo, sku: productForm.selectedSku }}></Accordian>}

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
                productName: productInfo.productName,
                onClickClose: close,
              }}
            ></SizeChartPopupComponent>
          )}
        </Modal>
      </main>
      <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(similarProducts, null, 4)}</pre>
    </div>
  );
};

export default Product;
