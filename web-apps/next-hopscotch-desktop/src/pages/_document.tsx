import Document, { Html, Head, Main, NextScript } from 'next/document';
// import Script from 'next/script';
import { GTM_ID } from '@/components/google-tag-manager';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#ed54a4" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#ed54a4" />
          <meta property="fb:app_id" content="501471509943731" />
          <meta property="og:site_name" content="Hopscotch.India" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@Hopscotchindia" />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:app:country" content="IN" />
          <meta name="twitter:app:name:iphone" content="Hopscotch" />
          <meta name="twitter:app:id:iphone" content="945949424" />
          <meta name="twitter:app:id:googleplay" content="in.hopscotch.android" />
          <meta name="msapplication-TileImage" content="images/icon-144.png" />
          <meta name="msapplication-TileColor" content="#ed54a4" />
          <meta name="apple-mobile-web-app-title" content="Hopscotch"></meta>
          {/* Google Tag Manager - Global base code */}
          <script
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
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              !function(){var n=window.analytics=window.analytics||[];if(!n.initialize)if(n.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{n.invoked=!0,window.analytics.methods=["identify","track","trackLink","trackForm","trackClick","trackSubmit","page","pageview","ab","alias","ready","group","on","once","off"],window.analytics.factory=function(n){return function(){var a=Array.prototype.slice.call(arguments);return a.unshift(n),window.analytics.push(a),window.analytics}};for(var a=0;a<window.analytics.methods.length;a++){var t=window.analytics.methods[a];window.analytics[t]=window.analytics.factory(t)}var i="${process.env.ANALYTIC_HOST}";n.load=function(n){if(!document.getElementById("analytics-js")){window.a=window.analytics;var a=document.createElement("script");a.async=!0,a.id="analytics-js",a.type="text/javascript",a.src=i+"/analytics.min.js",a.addEventListener("load",function(a){"function"==typeof n&&n(a)},!1);var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(a,t)}},n.SNIPPET_VERSION="4.1.0",n.load(function(){var n=new XMLHttpRequest;n.open("GET",i+"/config.json"),n.onload=function(){if(200===n.status){let i;try{i=JSON.parse(n.responseText),i=JSON.parse(atob(i.data))}catch(n){return void console.log("Json parsing failed")}for(window.analytics.initialize(i);window.a.length>0;){var a=window.a.shift(),t=a.shift();window.analytics[t]&&window.analytics[t].apply(window.analytics,a)}window.analytics.page()}else console.log("Request failed.  Returned status of "+n.status)},n.send()})}}();
              `,
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <div id="root">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
