import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar } from '@hs/components';
import { IProductProps, IProductDetails } from '@/types';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { httpService, cookiesService } from '@hs/services';

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
  const data: any = useQuery<IProductDetails>('ProductDetail', getProductDetails);
  // const {
  //   data: IProductDetails,
  //   isSuccess: isBrandSuccess,
  //   isFetching: isBrandFetching,
  // } = useQuery(['ProductDetail'], () => getProductDetails, { staleTime: Infinity, retry: false });
  // const showNewPromo = _self._AbTestService.isOnNewPromo();
  // const SHOW_RFYP = true;
  const originalRetailPrice = data.retailPrice;
  const productDetail = data;
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
  const brandName = productDetail.brandName;
  const productName = productDetail.simpleSkus[0].productName;
  const price = productDetail.retailPrice;
  const defaultTitle = `Shop Online ${productName} at ₹${price}`;
  const description = `Buy ${productName} online in India at ₹${price}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`;
  const keywords = [];
  keywords.push(productName.replace(/-|:|_/gi, ' '));
  keywords.push('online shopping for ' + productName.replace(/-|:|_/gi, ' '));

  // const setDetails = () => {
  //   var _self = this;
  //   // _self.setAttrObject();
  //   _self.productDetail.simpleSkus = _.sortBy(_self.productDetail.simpleSkus, function (skus) {
  //     return !skus.availableQuantity > 0;
  //   });
  //   if (!this.product) {
  //     _self.selectSku(_self.productDetail.simpleSkus);
  //   }
  //   _self.productDetail.hasSamePrice =
  //     _.chain(_self.productDetail.simpleSkus).map('retailPrice').uniq().value().length == 1;
  //   _self.productDetail.productName = _self.productDetail.simpleSkus[0].productName;
  //   // TODO(parth): Check if this condition holds true. Might not be for SKUs where size is one, but multiple skus exist
  //   _self.productDetail.isOneSize =
  //     _self.productDetail.simpleSkus.length == 1 &&
  //     (_self.productDetail.simpleSkus[0].attributes.size.toLowerCase() == _self.configService.products.ONE_SIZE ||
  //       _self.productDetail.simpleSkus[0].attributes.size.toLowerCase() == _self.configService.products.ONESIZE);
  // };

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
        <NavBar></NavBar>
        <p>Product Id: {productId}</p>
        <p>Product Name: {ignoredName}</p>
      </main>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Product;
