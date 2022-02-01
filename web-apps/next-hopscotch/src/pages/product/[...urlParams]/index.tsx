import Error from 'next/error';
import { productDetailsService } from '@hs/services';
import { NextPageWithLayout, IProductProps } from '@/types';
import type { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import { ProductPage } from '@/components/product-page/ProductPage';
import { IProductDetails } from '@hs/framework';
const LayoutMobile = dynamic(() => import('@/components/layout/mobile'), {
  ssr: true,
});
const LayoutDesktop = dynamic(() => import('@/components/layout/desktop'), {
  ssr: true,
});
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookie, 'x-nv-security-magic': magicHeader } = context.req.headers;
  const queryClient = new QueryClient();
  const productId = context.params?.urlParams?.[0] || '';
  const isMobile = context.req.headers['x-nv-device'] === 'sp';
  const baseUrl = process.env.WEB_HOST;
  const url = `${baseUrl}${context.resolvedUrl?.split('?')?.[0]}`;
  let error: IProductDetails | boolean = false;
  try {
    const data = await queryClient.fetchQuery<IProductDetails>(
      ['ProductDetail', productId],
      () => productDetailsService.getProductDetails(productId, baseUrl, { cookie, 'x-nv-security-magic': magicHeader }),
      {
        staleTime: Infinity,
      },
    );
  } catch (err) {
    error = err as IProductDetails;
    context.res.statusCode = 404;
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      url,
      isMobile,
      error,
    },
  };
};
const Product: NextPageWithLayout<IProductProps> = ({ productId, isMobile, url, error }: IProductProps) => {
  if (error ) {
    const err = error as IProductDetails;
    return <Error statusCode={404} title={err?.message} />;
  }
  return <ProductPage {...{ productId, isMobile, url }}></ProductPage>;
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  if (page.props.isMobile) return <LayoutMobile>{page}</LayoutMobile>;
  else return <LayoutDesktop>{page}</LayoutDesktop>;
};
