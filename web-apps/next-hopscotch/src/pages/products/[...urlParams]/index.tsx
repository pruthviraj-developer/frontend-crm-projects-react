import Error from 'next/error';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import type { GetServerSideProps } from 'next';
import { productListService } from '@hs/services';
import { IProductListingData } from '@hs/framework';
import { QueryClient, dehydrate } from 'react-query';
import { ProductListingPage } from '@/components/product-listing-page';
import { NextPageWithLayout, IProductListingProps, IProductListingError } from '@/types';

const LayoutMobile = dynamic(() => import('@/components/layout/mobile'), {
  ssr: true,
});
const LayoutDesktop = dynamic(() => import('@/components/layout/desktop'), {
  ssr: true,
});
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookie = null, 'x-nv-security-magic': magicHeader = null } = context.req.headers;
  const queryClient = new QueryClient();
  const urlParams = context.params;
  const productListId = urlParams?.urlParams?.[0] || '';
  const productListName = urlParams?.urlParams?.[1] || '';
  const isMobile = false;
  // context.req.headers['x-nv-device'] === 'sp';

  const baseUrl = process.env.WEB_HOST as string;
  const urlPath = context.resolvedUrl?.split('?')?.[0];
  const url = urlPath?.indexOf(baseUrl) !== -1 ? urlPath : `${baseUrl}${urlPath}`;
  let error: IProductListingError | boolean = false;
  let totalPages = 1;
  let queryParams: any = {};
  let funnelAndSectionParams: any = {};
  if (context.query.q) {
    queryParams = JSON.parse(context.query.q as any);
    if (queryParams['fromSmartFilter'] && queryParams.smartFilterSequence) {
      const smartFilterSequence = queryParams.smartFilterSequence.split('::');
      const smartFilterValue = queryParams.smartFilterValue.split(',');
      if (smartFilterSequence.length > 1) {
        for (let index = 0; index < smartFilterSequence.length; index++) {
          const element = smartFilterSequence[index];
          queryParams[element] = smartFilterValue[index];
        }
        queryParams.smartFiltersApplied = smartFilterSequence.length;
      } else {
        queryParams.smartFiltersApplied = 1;
        queryParams[queryParams.smartFilterSequence] = queryParams.smartFilterValue;
      }
    }
  } else {
    funnelAndSectionParams = context.query;
    delete funnelAndSectionParams.urlParams;
    // <-- start -->
    // code for id and path in products config code
    // console.log('context.query', context.query);
    // const getValue = (data: string, paramValue: string) => {
    //   const values = data ? data.split(',') : [];
    //   console.log('values', values);
    //   for (let index = 0; index < values.length; index++) {
    //     if (values[index] != paramValue) {
    //       return values[index];
    //     }
    //   }
    // };

    // if (funnelAndSectionParams.id === productListId && funnelAndSectionParams.path === productListName) {
    //   delete funnelAndSectionParams.id;
    //   delete funnelAndSectionParams.path;
    // } else {
    //   const id = getValue(funnelAndSectionParams.id, productListId);
    //   if (id) {
    //     funnelAndSectionParams.id = id;
    //   } else {
    //     delete funnelAndSectionParams.id;
    //   }
    //   const path = getValue(funnelAndSectionParams.path, productListName);
    //   if (path) {
    //     funnelAndSectionParams.path = path;
    //   } else {
    //     delete funnelAndSectionParams.path;
    //   }
    // }
    // <-- end -->
  }

  for (const property in queryParams) {
    if (typeof queryParams[property] === 'string' || queryParams[property] instanceof String) {
      queryParams[property] = queryParams[property].replace(/~~/g, '~');
    }
  }

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
      urlPath,
      error,
      isMobile,
      totalPages,
      queryParams,
      productListId,
      productListName,
      funnelAndSectionParams,
      showPopularSearch: true,
    },
  };
};
const ProductListing: NextPageWithLayout<IProductListingProps> = ({
  url,
  error,
  urlPath,
  isMobile,
  totalPages,
  queryParams,
  productListId,
  productListName,
  funnelAndSectionParams,
  showPopularSearch,
}: IProductListingProps) => {
  if (error) {
    const err = error as IProductListingError;
    return <Error statusCode={err?.statusCode} title={err?.message} />;
  }
  return (
    <ProductListingPage
      {...{
        productListId,
        productListName,
        isMobile,
        url,
        urlPath,
        error,
        queryParams,
        totalPages,
        funnelAndSectionParams,
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
