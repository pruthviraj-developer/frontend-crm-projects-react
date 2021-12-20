import { IHeadProps } from '@/types';
import Head from 'next/head';

export const ProductHead = ({ productName, retailPrice, schema }: IHeadProps) => {
  const keyword = productName?.replace(/-|:|_/gi, ' ');
  const description = `Buy ${productName} online in India at ₹${retailPrice}. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.`;
  return (
    <Head>
      <title>{`Shop Online ${productName} at ₹${retailPrice}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`Shop Online ${productName} at ₹${retailPrice}`} />
      <meta property="og:description" content={description} />
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
