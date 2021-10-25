import React, { useState } from 'react';
import { globalStyles, productCarouselStyles } from '@/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import GoogleTagManager from '@/components/google-tag-manager/GoogleTagManager';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { AppPropsWithLayout } from '@/types';

import { LoginProvider } from '@hs/framework';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      }),
  );
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      {globalStyles}
      {productCarouselStyles}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GoogleTagManager>
            <LoginProvider>{getLayout(<Component {...pageProps} />)}</LoginProvider>
          </GoogleTagManager>
        </Hydrate>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <ToastContainer
        style={{ fontFamily: 'inherit' }}
        autoClose={2250}
        closeOnClick={false}
        draggable={false}
        newestOnTop={true}
      />
    </>
  );
}
export default MyApp;
