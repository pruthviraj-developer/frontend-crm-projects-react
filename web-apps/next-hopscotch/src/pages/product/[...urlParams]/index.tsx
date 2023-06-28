import Error from 'next/error';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import type { GetServerSideProps } from 'next';
import { IProductDetails } from '@hs/framework';
import { QueryClient, dehydrate } from 'react-query';
import { productDetailsService } from '@hs/services';
import { ProductPage } from '@/components/product-page/ProductPage';
import { NextPageWithLayout, IProductProps, IProductError } from '@/types';
const LayoutMobile = dynamic(() => import('@/components/layout/mobile'), {
  ssr: true,
});
const LayoutDesktop = dynamic(() => import('@/components/layout/desktop'), {
  ssr: true,
});
export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    cookie = null,
    'x-nv-security-magic': magicHeader = null,
    'X-Nv-True-Client-Ip': TrueClientIPAddress = null,
    'X-True-Client-Ip': ClientIPAddress = null,
    'X-nv-true-client-ip': TrueClientIPAddressLowerCase = null,
    'x-true-client-ip': ClientIPAddressLowerCase = null,
  } = context.req.headers;
  const queryClient = new QueryClient();
  const productId = context.params?.urlParams?.[0] || '';
  const isMobile =
    context.req.headers['x-nv-device'] === 'sp' ||
    context.req.headers['x-nv-device'] === 'app' ||
    context.req.headers['x-nv-device'] === 'ot';
  const baseUrl = process.env.WEB_HOST as string;
  let url = context.resolvedUrl?.split('?')?.[0];
  url = url?.indexOf(baseUrl) !== -1 ? url : `${baseUrl}${url}`;
  let error: IProductError | boolean = false;
  let from_screen: unknown = 'direct';
  const queryParams = context.query;
  if (queryParams.from_screen) {
    from_screen = queryParams.from_screen;
  } else if (queryParams.utm_source) {
    from_screen = queryParams.utm_source;
  }
  // console.log(ClientIPAddress);
  // console.log(TrueClientIPAddress);
  console.log('device type');
  console.log(context.req.headers['x-nv-device']);
  try {
    await queryClient.fetchQuery<IProductDetails>(
      ['ProductDetail', productId],
      () =>
        productDetailsService.getProductDetails(productId, baseUrl, {
          cookie,
          'x-nv-security-magic': magicHeader,
          'device-type': isMobile ? 'mobile' : 'computer',
          'from-screen': from_screen,
        }),
      {
        staleTime: Infinity,
      },
    );
  } catch (err: any) {
    if (err) {
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
      from_screen,
      error,
      ClientIPAddress,
      TrueClientIPAddress,
      ClientIPAddressLowerCase,
      TrueClientIPAddressLowerCase,
    },
  };
};
const Product: NextPageWithLayout<IProductProps> = ({
  productId,
  isMobile,
  url,
  from_screen,
  error,
  ClientIPAddress,
  TrueClientIPAddress,
  ClientIPAddressLowerCase,
  TrueClientIPAddressLowerCase,
}: IProductProps) => {
  if (error) {
    const err = error as IProductError;
    return <Error statusCode={err?.statusCode} title={err?.message} />;
  }
  return (
    <ProductPage
      key={productId}
      {...{
        productId,
        isMobile,
        url,
        from_screen,
        ClientIPAddress,
        ClientIPAddressLowerCase,
        TrueClientIPAddress,
        TrueClientIPAddressLowerCase,
      }}
    ></ProductPage>
  );
};

export default Product;

Product.getLayout = function getLayout(page: ReactElement) {
  if (page.props.isMobile) return <LayoutMobile>{page}</LayoutMobile>;
  else return <LayoutDesktop>{page}</LayoutDesktop>;
};
