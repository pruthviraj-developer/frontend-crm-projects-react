import { IHeadProps } from '@/types';
import Head from 'next/head';

export const ProductHead = ({ productName, retailPrice }: IHeadProps) => {
  const keyword = productName?.replace(/-|:|_/gi, ' ');
  return (
    <Head>
      <title>{`Shop Online ${productName} at ₹${retailPrice}`}</title>
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
    </Head>
  );
};
