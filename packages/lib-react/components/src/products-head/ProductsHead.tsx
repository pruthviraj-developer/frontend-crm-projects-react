import { IProductsHeadProps } from './IHeader';
import Head from 'next/head';
import React from 'react';

export const ProductsHead = ({
  canonicalUrl,
  canonicalStatus,
  robotIndex = 'noindex',
  title = 'Kids Fashion Online | Baby Products Online in India at Hopscotch.in',
  description = 'Online shopping store for kids & baby products. Buy kids clothes, footwear, toys at hopscotch.in . &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.',
  keywords = [
    'Hopscotch',
    'Daily',
    'Babies',
    'Kids',
    'Moms',
    'Apparel',
    'Shoes',
    'Toys',
    'Bags',
    'Books & Stationery',
    'Personal Care',
    'Home & Kitchen',
    'Moms & Maternity',
    'Party Supplies & Gifts',
  ],
}: IProductsHeadProps) => {
  const list = [
    {
      name: 'robots',
      content: robotIndex,
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: keywords.toString(),
    },
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:url',
      content: canonicalUrl,
    },
    {
      name: 'og:description',
      content: description,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:url',
      content: canonicalUrl,
    },
    {
      name: 'twitter:description',
      content: description,
    },
  ];

  return (
    <Head>
      <title>{title}</title>
      {list.map((data, index: number) => (
        <meta key={index} name={data.name} content={data.content} />
      ))}
      <meta itemProp="description" content={description} />
      {canonicalStatus && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
};
