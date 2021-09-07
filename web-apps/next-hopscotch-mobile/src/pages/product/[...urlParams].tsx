import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar, ProductNamePrice } from '@hs/components';
import { IProductProps, IProductDetails } from '@/types';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { httpService, cookiesService, productDetailsService } from '@hs/services';
import { useState } from 'react';
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/product/94829348/test',
    ],
    fallback: true,
  };
}

const getProductDetails = <P, R>(): Promise<R> => {
  const params = { currentTime: new Date().getTime() };
  // return httpService.get<R>({ url: `/api/product/${productId}`, params });
  return httpService.get<R>({ url: '/api/product/948332', params });
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('ProductDetail', getProductDetails);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Product: NextPage = () => {
  const router = useRouter();
  const urlParams = router.query as unknown as IProductProps;
  const [productId, ignoredName] = [...(urlParams.urlParams || [])];
  // const [quantity, setQuantity] = useState<number>(0);
  // const showNewPromo = _self._AbTestService.isOnNewPromo();
  // const SHOW_RFYP = true;

  const { data: productDetails, isSuccess: isProductDetailsSuccess } = useQuery(
    ['ProductDetail', productId],
    () => productDetailsService.getProductDetails(productId),
    {
      staleTime: Infinity,
      enabled: productId !== undefined,
    },
  );

  // getProductDetails

  const setDetails = () => {
    // _self.setAttrObject();
    // _self.productDetail.simpleSkus = _.sortBy(_self.productDetail.simpleSkus, function (skus) {
    //   return !skus.availableQuantity > 0;
    // });
    // if(!this.product){
    // _self.selectSku(_self.productDetail.simpleSkus);
    // }
    // _self.productDetail.hasSamePrice = _.chain(_self.productDetail.simpleSkus).map('retailPrice').uniq().value().length == 1;
    // _self.productDetail.productName = _self.productDetail.simpleSkus[0].productName;
    // TODO(parth): Check if this condition holds true. Might not be for SKUs where size is one, but multiple skus exist
    // _self.productDetail.isOneSize = _self.productDetail.simpleSkus.length == 1 && (_self.productDetail.simpleSkus[0].attributes.size.toLowerCase() == _self.configService.products.ONE_SIZE || _self.productDetail.simpleSkus[0].attributes.size.toLowerCase() == _self.configService.products.ONESIZE);
  };

  if (isProductDetailsSuccess) {
    const respone = (productDetails && productDetails.data) || {};
    if (productDetails && productDetails.action === 'success') {
      const originalRetailPrice = respone.retailPrice;
      // const productDetail = respone;
      const getProductDesc = (htmlText: string) => {
        let descText = '';
        try {
          const productDescription = htmlText.replace(/<(?:.|\n)*?>/gm, '');
          const description = productDescription.split('FEATURES');
          if (description && description.length) {
            descText = description[0];
          }
        } catch (e) {}
        return descText;
      };
      const brandName = productDetails.brandName;
      debugger;
      productDetails.productName = productDetails.simpleSkus[0].productName;
      // const price = productDetail.retailPrice;
      // const defaultTitle = `Shop Online ${productName} at ₹${price}`;
      // const description = `Buy ${productName} online in India at ₹${price}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`;
      // const keywords = [];
      // keywords.push(productName.replace(/-|:|_/gi, ' '));
      // keywords.push('online shopping for ' + productName.replace(/-|:|_/gi, ' '));
    }
  }

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
        {productDetails && productDetails.action === 'success' && (
          <div>
            <NavBar count={productDetails && productDetails.quantity}></NavBar>
            <ProductNamePrice
              {...{
                name: productDetails.name,
                retailPrice: productDetails.retailPrice,
                retailPriceMax: productDetails.retailPriceMax,
              }}
            ></ProductNamePrice>
            <p>Product Id: {productId}</p>
            <p>Product Name: {ignoredName}</p>
          </div>
        )}
      </main>
      <pre>{JSON.stringify(productDetails, null, 4)}</pre>
    </div>
  );
};

export default Product;
