import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { globalStyles } from '@/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import GoogleTagManager from '@/components/google-tag-manager/GoogleTagManager';
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <>
      {globalStyles}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GoogleTagManager>
            <Component {...pageProps} />
          </GoogleTagManager>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
