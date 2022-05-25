import Script from 'next/script';
import React, { useState } from 'react';
import { globalStyles } from '@/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import GoogleTagManager from '@/components/google-tag-manager/GoogleTagManager';
import DataManager from '@/components/data-manager/DataManager';
import { GTM_ID } from '@/components/google-tag-manager';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { AppPropsWithLayout } from '@/types';

import { LoginProvider, UserInfoProvider, CartItemQtyProvider, TrackingDataProvider, COOKIE_DATA } from '@hs/framework';
import { cookiesService, deviceService } from '@hs/services';
import axios, { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

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
  const DEVICE_ID = useMemo(() => {
    /*
     * Function taken from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     * to generate UUID from client side
     */
    const VISITOR_ID = cookiesService.getCookies(COOKIE_DATA.VISITOR_ID);
    return VISITOR_ID && VISITOR_ID != 'undefined' ? VISITOR_ID : deviceService.getDeviceId();
  }, []);

  axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      // Do something before request is sent
      config.headers['device-id'] = DEVICE_ID;
      config.headers['hs-persistent-ticket'] = cookiesService.getCookies(COOKIE_DATA.PERSISTENT_TICKET) || '';
      config.headers['experiments'] = cookiesService.getCookies(COOKIE_DATA.EXPERIMENTS) || '';
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Script
        id="ga-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
              `,
        }}
      />
      <Script
        id="segment-script"
        strategy="beforeInteractive"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              !function(){var n=window.analytics=window.analytics||[];if(!n.initialize)if(n.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{n.invoked=!0,window.analytics.methods=["identify","track","trackLink","trackForm","trackClick","trackSubmit","page","pageview","ab","alias","ready","group","on","once","off"],window.analytics.factory=function(n){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(n),window.analytics.push(a),window.analytics}};for(var a=0;a<window.analytics.methods.length;a++){var t=window.analytics.methods[a];window.analytics[t]=window.analytics.factory(t)}var i="${process.env.ANALYTIC_HOST}";n.load=function(n){if(!document.getElementById("analytics-js")){window.a=window.analytics;var a=document.createElement("script");a.async=!0,a.id="analytics-js",a.type="text/javascript",a.src=i+"/analytics.min.js",a.addEventListener("load",function(a){"function"==typeof n&&n(a)},!1);var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(a,t)}},n.SNIPPET_VERSION="4.1.0",n.load(function(){var n=new XMLHttpRequest;n.open("GET",i+"/config.json"),n.onload=function(){if(200===n.status){let i;try{i=JSON.parse(n.responseText),i=JSON.parse(atob(i.data))}catch(n){return void console.log("Json parsing failed")}for(window.analytics.initialize(i);window.a.length>0;){var a=window.a.shift(),t=a.shift();window.analytics[t]&&window.analytics[t].apply(window.analytics,a)}window.analytics.page()}else console.log("Request failed.  Returned status of "+n.status)},n.send()})}}();
              `,
        }}
      />
      {globalStyles}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserInfoProvider>
            <GoogleTagManager>
              <TrackingDataProvider>
                <DataManager>
                  <CartItemQtyProvider>
                    <LoginProvider>{getLayout(<Component {...pageProps} />)}</LoginProvider>
                  </CartItemQtyProvider>
                </DataManager>
              </TrackingDataProvider>
            </GoogleTagManager>
          </UserInfoProvider>
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
