import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar } from '@hs/components';
import { IProductProps } from '@/types';
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

export function getColors() {
  return httpService.get({ url: '/api/product/948332' });
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('Colors', getColors);

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
  const { data } = useQuery('Colors', getColors);
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
