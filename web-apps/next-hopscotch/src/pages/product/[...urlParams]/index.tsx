import Error from 'next/error';
import { productDetailsService } from '@hs/services';
import { NextPageWithLayout, IProductProps, IProductError } from '@/types';
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
  const { cookie = null, 'x-nv-security-magic': magicHeader = null } = context.req.headers;
  const queryClient = new QueryClient();
  const productId = context.params?.urlParams?.[0] || '';
  const isMobile = context.req.headers['x-nv-device'] === 'sp';
  const baseUrl = process.env.WEB_HOST;
  const url = `${baseUrl}${context.resolvedUrl?.split('?')?.[0]}`;
  let error: IProductError | boolean = false;
  try {
    const data = await queryClient.fetchQuery<IProductDetails>(
      ['ProductDetail', productId],
      () => productDetailsService.getProductDetails(productId, baseUrl, { cookie, 'x-nv-security-magic': magicHeader }),
      {
        staleTime: Infinity,
      },
    );
  } catch (err: any) {
    console.log('err.status', err.status);
    if (err && err.status != 500) {
      error = {
        statusCode: 404,
        message: (err as IProductDetails).message,
      };
      context.res.statusCode = 404;
    } else {
      error = {
        statusCode: err.status as number,
        message: err.data.message,
      };
      context.res.statusCode = err.status as number;
    }
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
  if (error) {
    const err = error as IProductError;
    return <Error statusCode={err?.statusCode} title={err?.message} />;
  }
  return <ProductPage {...{ productId, isMobile, url }}></ProductPage>;
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  if (page.props.isMobile) return <LayoutMobile>{page}</LayoutMobile>;
  else return <LayoutDesktop>{page}</LayoutDesktop>;
};
