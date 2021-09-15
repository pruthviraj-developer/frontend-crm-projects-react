import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Accordian,
  NavBar,
  ProductNamePrice,
  DeliveryDetails,
  CustomSizePicker,
  SizeAndChartLabels,
  RecommendedProducts,
} from '@hs/components';
import { IProductProps, IProductDetails, IProductFormProps, SimpleSkusEntity, IRecommendedProducts } from '@/types';
import { useQuery } from 'react-query';
import { cookiesService, productDetailsService } from '@hs/services';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { ProductDetailsWrapper } from './StyledUrlParams';

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/product/94829348/test',
    ],
    fallback: true,
  };
}
// const ADD_TO_CART_BUTTON = 'Add to cart button';
const SIZE_LIST_UPFRONT = 'Size list upfront';
const ONE_SIZE = 'one size';
const ONESIZE = 'onesize';
// const getProductDetails = <P, R>(): Promise<R> => {
//   const params = { currentTime: new Date().getTime() };
//   // return httpService.get<R>({ url: `/api/product/${productId}`, params });
//   return httpService.get<R>({ url: '/api/product/948332', params });
// };

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Product: NextPage = () => {
  const router = useRouter();
  const urlParams = router.query as unknown as IProductProps;
  const [productId] = [...(urlParams.urlParams || [])];
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedSkuId, setSelectedSkuId] = useState<string>('');
  const [product, setProduct] = useState<any>({});
  const [productInfo, setProductInfo] = useState<IProductDetails | any>({});
  const [productForm, setProductForm] = useState<IProductFormProps | any>({});
  const [recommendedProducts, setRecommendedProducts] = useState<IRecommendedProducts | any>({});
  const [similarProducts, setSimilarProducts] = useState<IRecommendedProducts | any>({});
  const [showRfyp, setShowRfyp] = useState<boolean>(false);

  // const [quantity, setQuantity] = useState<number>(0);
  // const showNewPromo = _self._AbTestService.isOnNewPromo();
  // const SHOW_RFYP = true;

  const { data: productDetails, isSuccess: isProductDetailsSuccess } = useQuery<IProductDetails>(
    ['ProductDetail', productId],
    () => productDetailsService.getProductDetails(productId),
    {
      staleTime: Infinity,
      enabled: productId !== undefined,
    },
  );

  const { data: recommendedProductDetails, isSuccess: isRecommendedProductsSuccess } = useQuery<IRecommendedProducts>(
    ['RecommendedProducts', productId],
    () => productDetailsService.getRecommendedProducts(productId, { boutiqueId: undefined }),
    {
      staleTime: Infinity,
      enabled: productId !== undefined,
    },
  );

  const { data: similarProductDetails, isSuccess: isSimilarProductSuccess } = useQuery<IRecommendedProducts>(
    ['SimilarProducts', productId],
    () => productDetailsService.getSimilarProducts(productId, { boutiqueId: undefined }),
    {
      staleTime: Infinity,
      enabled: productId !== undefined,
    },
  );

  // setSimilarProducts

  useEffect(() => {
    if (isProductDetailsSuccess) {
      if (productDetails && productDetails.action === 'success') {
        const updateProductDetail = (
          sku: SimpleSkusEntity,
          isfirst: boolean,
          isDefault: boolean = false,
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
            var sku: any = productDetails.simpleSkus[i];
            sku.attributes = {};
            for (let j = 0; j < sku.attrs.length; j++) {
              sku.attributes[sku.attrs[j].name.toLowerCase()] = sku.attrs[j].value;
            }
          }
        };

        const setDetails = () => {
          setAttrObject();
          productDetails.simpleSkus = sortBy(productDetails.simpleSkus, function (skus: SimpleSkusEntity) {
            return !(skus.availableQuantity > 0);
          });

          // TODO: Logic to show default selection of sku and checking quantity > 0
          const selectSku = (skuList: SimpleSkusEntity[]) => {
            for (var i = 0; i < skuList.length; i++) {
              var sku = skuList[i];
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
        setDetails();
        setShowRfyp(true);
      }
    }

    // return () => {};
  }, [isProductDetailsSuccess, product, productDetails]);

  useEffect(() => {
    if (isRecommendedProductsSuccess) {
      if (recommendedProductDetails && recommendedProductDetails.action === 'success') {
        const recommendedProducts = {
          details: recommendedProductDetails.recommendProductDetailList,
          matching: recommendedProductDetails.recommendMatchingDetailList,
          title: recommendedProductDetails.recommendationTitle,
        };
        setRecommendedProducts(recommendedProducts);
        console.log('isRecommendedProductsSuccess', recommendedProducts);

        // // Based on condition available on view.
        // _self.checkstatus = '#productrecommendations';
        if (recommendedProducts.details && recommendedProducts.details.length <= 6) {
          // _self.checkstatus = '#similarproducts';
          setShowRfyp(false);
          setProductInfo({ ...productDetails, showRfypCue: false });
        }
      }
    }
  }, [isRecommendedProductsSuccess, recommendedProductDetails, productDetails]);

  useEffect(() => {
    if (isSimilarProductSuccess) {
      if (similarProductDetails && similarProductDetails.action === 'success') {
        const similarProducts = {
          details: similarProductDetails.recommendProductDetailList,
          matching: similarProductDetails.recommendMatchingDetailList,
          title: similarProductDetails.recommendationTitle,
        };
        if (similarProducts.details && similarProducts.details.length <= 6) {
          setShowRfyp(false);
          setProductInfo({ ...productDetails, showRfypCue: false });
        }
        setSimilarProducts(similarProducts);
      }
    }
  }, [isSimilarProductSuccess, similarProductDetails, productDetails]);

  cookiesService.setCookies({ key: 'test', value: 'test value' });
  return (
    <div>
      <Head>
        <title>Product details</title>
        <meta
          name="description"
          content="'Online shopping store for kids & baby products. Buy kids clothes, footwear, toys at hopscotch.in . &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.'"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {productInfo && productInfo.action === 'success' && (
          <div>
            <NavBar count={productInfo && productInfo.quantity}></NavBar>
            <ProductDetailsWrapper>
              <ProductNamePrice
                {...{
                  name: productInfo.productName,
                  retailPrice: productForm.retailPrice,
                  retailPriceMax: productForm.retailPriceMax,
                  selectedSku: productForm.selectedSku,
                  regularPrice: productForm.regularPrice,
                  discount: productForm.discount,
                }}
              ></ProductNamePrice>
              <SizeAndChartLabels
                {...{
                  isOneSize: productInfo.isOneSize,
                  hasSizeChart: productInfo.hasSizeChart,
                  qtyLeft: productForm.qtyLeft,
                  simpleSkus: productInfo.simpleSkus,
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
              <DeliveryDetails
                {...{
                  deliveryDetails: productInfo.deliveryMessages,
                  selectedSku: productForm.selectedSku,
                  productDetail: productInfo,
                }}
              ></DeliveryDetails>
              {productInfo.id && <Accordian {...{ productInfo, sku: productForm.selectedSku }}></Accordian>}

              {/* <RecommendedProducts>
                {recommendedProducts.details && recommendedProducts.details.length && (
                  <RecommendedProductsTitle>{recommendedProducts.title}</RecommendedProductsTitle>
                )}
                <RecommendedMatching>
                  <RecommendedMatchingProduct>
                    <RecommendedMatchingProductLink></RecommendedMatchingProductLink>
                  </RecommendedMatchingProduct>
                  <RecommendedMatchingProduct>
                    <RecommendedMatchingProductLink></RecommendedMatchingProductLink>
                  </RecommendedMatchingProduct>
                  <RecommendedMatchingProduct>
                    <RecommendedMatchingProductLink></RecommendedMatchingProductLink>
                  </RecommendedMatchingProduct>
                </RecommendedMatching>
              </RecommendedProducts> */}
              {similarProducts.details && similarProducts.details.length > 6 && (
                <RecommendedProducts
                  section="'RFYP'"
                  showmatching={true}
                  recommended={similarProducts}
                  id="similarproducts"
                  pid={productInfo.id}
                ></RecommendedProducts>
              )}
            </ProductDetailsWrapper>
          </div>
        )}
      </main>
      {/* <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(similarProducts, null, 4)}</pre> */}
    </div>
  );
};

export default Product;
