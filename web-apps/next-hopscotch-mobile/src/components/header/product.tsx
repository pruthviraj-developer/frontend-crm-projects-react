import { IHeadProps } from '@/types';
import Head from 'next/head';

export const ProductHead = ({ productName, retailPrice, schema, canonicalUrl }: IHeadProps) => {
  const keyword = productName?.replace(/-|:|_/gi, ' ');
  const pattern = /-{2,}|(\s)|[+]/g;
  const isNoIndexPage = canonicalUrl && pattern.test(canonicalUrl);
  return (
    <Head>
      <title>{`Shop Online ${productName} at ₹${retailPrice}`}</title>
      {isNoIndexPage && <meta name="robots" content="noindex" />}
      {!isNoIndexPage && <link rel="canonical" href={canonicalUrl} />}
      {!isNoIndexPage && <meta name="twitter:url" content={canonicalUrl} />}

      <meta property="og:url" content={canonicalUrl} />
      <meta
        name="description"
        content={`Buy ${productName} online in India at ₹${retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`}
      />
      <meta property="og:title" content={`Shop Online ${productName} at ₹${retailPrice}`} />
      <meta
        property="og:description"
        content={`Buy ${productName} online in India at ₹${retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`}
      />
      <meta name="keywords" content={`${keyword},online shopping for ${keyword}`} />
      <script
        id="schemaScript"
        key="productSchema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
    </Head>
  );
};
