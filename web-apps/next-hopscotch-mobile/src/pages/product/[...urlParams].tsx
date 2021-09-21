import type { GetServerSideProps, NextPage } from 'next';
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
  Footer,
  RecommendedProductsLinks,
} from '@hs/components';
import {
  IProductProps,
  IProductDetails,
  IProductFormProps,
  SimpleSkusEntity,
  IRecommendedProducts,
  IRecommendedProductsCarousel,
  IPopularSearchUrlProps,
  urlParamsProps,
} from '@/types';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { cookiesService, productDetailsService } from '@hs/services';
import { useState, useEffect, useRef } from 'react';
import sortBy from 'lodash/sortBy';
import { ProductDetailsWrapper } from './StyledUrlParams';

// const ADD_TO_CART_BUTTON = 'Add to cart button';
const SIZE_LIST_UPFRONT = 'Size list upfront';
const ONE_SIZE = 'one size';
const ONESIZE = 'onesize';
const POPULAR_URL = [
  { displayName: 'Boys Sherwani', link: '/products/15172/boys-sherwani' },
  { displayName: ' Girls Party Wear Dresses', link: '/products/15864/girls-party-wear-dresses' },
  { displayName: 'Girls Jackets', link: '/products/15935/girls-jackets' },
  { displayName: ' Girls Frocks', link: '/products/15936/girls-frocks' },
  { displayName: 'Boys Jackets', link: '/products/15966/boys-jackets' },
  { displayName: 'Girls Leggings', link: '/products/15971/girls-leggings' },
  { displayName: 'Girls Casual Dresses', link: '/products/16270/girls-casual-dresses' },
  { displayName: 'Girls Gowns', link: '/products/16320/girls-gowns' },
  { displayName: 'Baby Girl Onesies ', link: '/products/16415/baby-girl-onesies' },
  { displayName: 'Baby Boy Onesies ', link: '/products/16416/baby-boy-onesies' },
  { displayName: 'Baby Girls Rompers', link: '/products/16417/baby-girl-rompers' },
  { displayName: 'Baby Boy Rompers', link: '/products/16418/baby-boy-rompers' },
  { displayName: 'Baby Clothes ', link: '/baby' },
  { displayName: 'Girls Clothes ', link: '/girls' },
  { displayName: 'Boys Clothes ', link: '/boys' },
  { displayName: 'Boys Tshirts ', link: '/clothing/boys/tshirts' },
  { displayName: 'Girls Tops ', link: '/clothing/girls/tops' },
  { displayName: 'Boys Jeans', link: '/clothing/boys/jeans' },
  { displayName: 'Girls Jeans ', link: '/clothing/girls/jeans' },
  { displayName: 'Boys Shirts ', link: '/clothing/boys/shirts' },
  { displayName: 'Girls Tshirts ', link: '/clothing/girls/tshirts' },
  { displayName: 'Girls Dresses', link: '/clothing/girls/dresses' },
];

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
  const [product, setProduct] = useState<any>({});
  const [productInfo, setProductInfo] = useState<IProductDetails | any>({});
  const [productForm, setProductForm] = useState<IProductFormProps | any>({});
  const [recommendedProducts, setRecommendedProducts] = useState<IRecommendedProductsCarousel | any>({});
  const [similarProducts, setSimilarProducts] = useState<IRecommendedProductsCarousel>();
  const [showRfyp, setShowRfyp] = useState<boolean>(false);
  const [popularSearchUrl, setPopularSearchUrl] = useState<IPopularSearchUrlProps[]>([]);

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

  const goToProductRecommendation = (fromLocation: string) => {
    if (fromLocation) {
      const currentRefElement =
        recommendedProducts.details && recommendedProducts.details.length > 5
          ? recommendedProductsLink
          : similarProductsLink;
      currentRefElement &&
        currentRefElement.current &&
        currentRefElement.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const popularSUrl = POPULAR_URL.filter((item) => item.link !== router.asPath.split('?')[0]);
    setPopularSearchUrl(popularSUrl);
  }, [router.asPath]);

  // setSimilarProducts
  useEffect(() => {
    if (isProductDetailsSuccess) {
      if (productDetails && productDetails.action === 'success') {
        const updateProductDetail = (
          sku: SimpleSkusEntity,
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
          productDetails.simpleSkus = sortBy(productDetails.simpleSkus, function (skus: SimpleSkusEntity) {
            return !(skus.availableQuantity > 0);
          });

          // TODO: Logic to show default selection of sku and checking quantity > 0
          const selectSku = (skuList: SimpleSkusEntity[]) => {
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
        setShowRfyp(true);
        const soldOutSkus = productDetails.simpleSkus.find((sku) => !(sku.availableQuantity > 0));
        productDetails.showRfypCue = !!soldOutSkus;
        setDetails();
      }
    }
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

        if (recommendedProducts.details && recommendedProducts.details.length <= 6) {
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
      <main>
        {productInfo && productInfo.action === 'success' && (
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
              {productInfo.showRfypCue && (
                <RecommendedProductsLinks
                  {...{ isProductSoldOut: productInfo.isProductSoldOut, goToProductRecommendation }}
                ></RecommendedProductsLinks>
              )}
              <DeliveryDetails
                {...{
                  deliveryDetails: productInfo.deliveryMessages,
                  selectedSku: productForm.selectedSku,
                  productDetail: productInfo,
                }}
              ></DeliveryDetails>
              {productInfo.id && <Accordian {...{ productInfo, sku: productForm.selectedSku }}></Accordian>}

              {recommendedProducts && recommendedProducts.details && recommendedProducts.details.length > 6 && (
                <div ref={recommendedProductsLink}>
                  <RecommendedProducts
                    section="UserRecoPDP"
                    subsection="Carousel"
                    showmatching={false}
                    recommended={recommendedProducts}
                    id="productrecommendations"
                    pid={productInfo.id}
                  ></RecommendedProducts>
                </div>
              )}

              {similarProducts && similarProducts.details && similarProducts.details.length > 6 && (
                <div ref={similarProductsLink}>
                  <RecommendedProducts
                    {...{
                      section: 'RFYP',
                      subsection: 'Carousel',
                      showmatching: true,
                      recommended: similarProducts,
                      id: 'similarproducts',
                      pid: productInfo.id,
                    }}
                  ></RecommendedProducts>
                </div>
              )}
              <Footer urls={popularSearchUrl}></Footer>
            </ProductDetailsWrapper>
          </div>
        )}
      </main>
      <pre style={{ width: '60%', overflowX: 'scroll' }}>{JSON.stringify(productInfo, null, 4)}</pre>
    </div>
  );
};

export default Product;
