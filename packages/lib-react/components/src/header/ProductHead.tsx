import { IHeadProps } from './IHeader';
import Head from 'next/head';
import React from 'react';

export const ProductHead = ({
  productName,
  retailPrice,
  schema,
  canonicalUrl,
  url,
  discovery,
}: IHeadProps) => {
  const keyword = productName?.replace(/-|:|_/gi, ' ');
  const description = `Buy ${productName} online in India at ₹${retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`;
  const pattern = /-{2,}|(\s)|[+]/g;
  const isNoIndexPage = (url && pattern.test(url)) || discovery;
  return (
    <Head>
      <title>{`Shop Online ${productName} at ₹${retailPrice}`}</title>
      <meta name="description" content={description} />
      {isNoIndexPage && <meta name="robots" content="noindex" />}
      {!isNoIndexPage && <link rel="canonical" href={canonicalUrl} />}
      {!isNoIndexPage && <meta name="twitter:url" content={canonicalUrl} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta
        property="og:title"
        content={`Shop Online ${productName} at ₹${retailPrice}`}
      />
      <meta
        name="twitter:title"
        content={`Shop Online ${productName} at ₹${retailPrice}`}
      />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta itemProp="description" content={description} />
      <meta
        name="keywords"
        content={`${keyword},online shopping for ${keyword}`}
      />
      <script
        id="schemaScript"
        key="productSchema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
    </Head>
  );
};
