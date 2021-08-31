import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar } from '@hs/components';
import { IProductProps } from '@/types';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { reorderService } from '@hs/services';
// // Next.js pre-renders a page on each request if async `getServerSideProps` is exported from that page.
// // 👀 https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
// export async function getServerSideProps() {
//   // `QueryCache` manages the state, caching, lifecycle and everything related to fetching, revalidating of the queries.
//   // 👀 https://react-query.tanstack.com/docs/api#querycache
//   const queryCache = new QueryCache();

//   // The next line should be uncommented if we want to use approach 1. `posts` will contain all the data that the API endpoint returns.
//   // const posts = await getPosts();

//   // `prefetchQuery` is an asynchronous function that can fetch and cache a query response before it is needed or rendered with `useQuery`.
//   // 👀 https://react-query.tanstack.com/docs/api#querycacheprefetchquery
//   await queryCache.prefetchQuery('posts', getPosts);

//   return {
//     props: {
//       // `dehydrate` creates a frozen representation of a `queryCache` that can later be hydrated with `useHydrate`, `hydrate` or `Hydrate`.
//       // 👀 https://react-query.tanstack.com/docs/api#hydrationdehydrate
//       dehydratedState: dehydrate(queryCache),

//       // The next line should be uncommented if we want to use approach 1.
//       // posts,
//     },
//   };
// }

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/product/94829348/test',
    ],
    fallback: true,
  };
}

export async function getColors() {
  return await reorderService.getColors();
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
    </div>
  );
};

export default Product;
