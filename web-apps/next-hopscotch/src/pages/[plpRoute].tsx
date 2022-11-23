import Error from 'next/error';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import type { GetServerSideProps } from 'next';
import { productListService } from '@hs/services';
import { IProductListingData } from '@hs/framework';
import { QueryClient, dehydrate } from 'react-query';
import { ProductListingPage } from '@/components/product-listing-page';
import { NextPageWithLayout, IProductListingProps, IProductListingError, IPlpRoutesProps } from '@/types';

const LayoutMobile = dynamic(() => import('@/components/layout/mobile'), {
  ssr: true,
});
const LayoutDesktop = dynamic(() => import('@/components/layout/desktop'), {
  ssr: true,
});
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookie = null, 'x-nv-security-magic': magicHeader = null } = context.req.headers;
  const queryClient = new QueryClient();
  const urlParams = context.params as unknown as Record<string, string>;
  const isMobile = false;
  const res: IPlpRoutesProps = await queryClient.fetchQuery(['plpRoutes'], productListService.getPlpRoutes);
  const plpRoutes = res.routesData || {};
  const routeObject = plpRoutes[urlParams.plpRoute] || {};
  // context.req.headers['x-nv-device'] === 'sp';
  const baseUrl = process.env.WEB_HOST as string;
  let url = context.resolvedUrl?.split('?')?.[0];
  url = url?.indexOf(baseUrl) !== -1 ? url : `${baseUrl}${url}`;
  let error: IProductListingError | boolean = false;
  let totalPages = 1;
  let queryParams: any = {};
  if (!plpRoutes[urlParams.plpRoute]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { id: productListId, pageHeading: productListName } = routeObject.params;
  try {
    const data = await queryClient.fetchInfiniteQuery<IProductListingData>(
      ['ProductList', productListId, queryParams],
      ({ pageParam = 1 }) =>
        productListService.getProductList(
          {
            id: productListId,
            pageNo: pageParam,
            pageSize: 72,
            ...queryParams,
          },
          baseUrl,
          {
            cookie,
            'x-nv-security-magic': magicHeader,
          },
        ),
      {
        getNextPageParam: (_lastpage, _allPages) => 1,
      },
    );
    totalPages = Math.ceil(data.pages[0].totalRecords / 72);
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
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      url,
      error,
      isMobile,
      plpRoutes,
      totalPages,
      queryParams,
      productListId,
      productListName,
      showPopularSearch: true,
      plpRoute: urlParams?.plpRoute,
    },
  };
};

const ProductListing: NextPageWithLayout<IProductListingProps> = ({
  url,
  error,
  isMobile,
  plpRoute,
  plpRoutes,
  totalPages,
  queryParams,
  productListId,
  productListName,
  showPopularSearch,
}: IProductListingProps) => {
  if (error) {
    const err = error as IProductListingError;
    return <Error statusCode={err?.statusCode} title={err?.message} />;
  }
  return (
    <ProductListingPage
      {...{
        url,
        error,
        isMobile,
        plpRoute,
        plpRoutes,
        totalPages,
        queryParams,
        productListId,
        productListName,
        showPopularSearch,
      }}
    />
  );
};

export default ProductListing;

ProductListing.getLayout = function getLayout(page: ReactElement) {
  if (page.props.isMobile) return <LayoutMobile>{page}</LayoutMobile>;
  else return <LayoutDesktop>{page}</LayoutDesktop>;
};
