import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { NavBar } from '@hs/components';

const Product: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <div>
      <Head>
        <title>Product details</title>
        <meta
          name="description"
          content="'Online shopping store for kids & baby products. Buy kids clothes, footwear, toys at hopscotch.in . &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan India shipping.'"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar></NavBar>
        <p>Product Id: {productId}</p>
      </main>
    </div>
  );
};

export default Product;
