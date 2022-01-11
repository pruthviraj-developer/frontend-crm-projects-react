import Document, { Html, Head, Main, NextScript } from 'next/document';
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
          <meta property="og:image" content="https://static.hopscotch.in/web2/images/assets/hopscotch_typeface.png" />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/favicon.ico" />
          <script src="/n7/n7HD.js" async></script>
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
