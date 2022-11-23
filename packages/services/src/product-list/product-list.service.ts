import { httpService } from '../http-demand';
const getProductList = <P, R>(
  params: P,
  baseURL = '',
  headers = {}
): Promise<R> => {
  let url = `/api/products/v4`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({
    url,
    params,
    headers,
  });
};

const getSeoHtmlDescription = <P, R>(
  productListId: P,
  params = {},
  baseURL = '',
  headers = {}
): Promise<R> => {
  let url = `/api/plp/${productListId}/description`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({
    url,
    params,
    headers,
  });
};

const getProudctUrl = (
  product: Record<string, string>,
  isComingSoon: boolean
) => {
  const queryParameters = ''; //tracking parameters
  const getLowerCaseUrl = (url: string) => {
    if (url) {
      if (url.indexOf('?') > -1) {
        const tempUrlArr = url.split('?');
        tempUrlArr[0] = tempUrlArr[0].toLowerCase();
        return tempUrlArr.join('?');
      }
      return url.toLowerCase();
    }
    return '';
  };

  const getDashedParameter = (product: Record<string, string>): string => {
    let dashSeparatedUrlProductName = '';
    dashSeparatedUrlProductName += product.name || product.productName;
    dashSeparatedUrlProductName = dashSeparatedUrlProductName
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return dashSeparatedUrlProductName;
  };

  const getProductDashedUrl = (product: Record<string, string>): string =>
    `/product/${product.id || product.productId}/${getDashedParameter(
      product
    )}`;

  const getQueryStringParameters = () => {
    return queryParameters.length ? '?' + queryParameters : '';
  };

  if (product.isTile) {
    if (product?.tileAction && product.tileAction?.indexOf('?') > -1) {
      return getLowerCaseUrl(product.tileAction) + '&' + queryParameters;
    } else {
      return product?.tileAction && product.tileAction.length
        ? product.tileAction.toLowerCase() + getQueryStringParameters()
        : '';
    }
  } else {
    return isComingSoon
      ? ''
      : `${getProductDashedUrl(
          product
        ).toLowerCase()}${getQueryStringParameters()}`;
  }
};

const getFormattedPrice = (price?: number) => {
  return price && price.toLocaleString('en-IN');
};

const getSmartFiltersTrackingData = (
  data: Record<string, string>,
  productList: any
) => {
  const smartFiltersObject = productList.smartFilter;
  let sf_count = 0,
    sf_position = 0,
    sf_segment_order = 0,
    sf_segment_position = 0;
  const sf_applied = [];
  for (let i = 0; i < smartFiltersObject.smartFilterSections.length; i++) {
    sf_count +=
      smartFiltersObject.smartFilterSections[i].smartFilterTiles.length;
  }
  for (let i = 0; i < smartFiltersObject.smartFilterSections.length; i++) {
    sf_segment_position = 0;
    for (
      let j = 0,
        smartFilterTiles =
          smartFiltersObject.smartFilterSections[i].smartFilterTiles;
      j < smartFilterTiles.length;
      j++
    ) {
      sf_position++;
      sf_segment_position++;
      if (smartFilterTiles[j].name === data.name) {
        j = smartFilterTiles.length;
        i = smartFiltersObject.smartFilterSections.length;
      }
    }
    sf_segment_order++;
  }
  for (let i = 0; i < smartFiltersObject.appliedSmartFilters.length; i++) {
    sf_applied.push(smartFiltersObject.appliedSmartFilters[i].name);
  }

  const segmentData = {
    sf_name: data.name,
    sf_count: sf_count,
    sf_position: sf_position,
    plp_type: 'Product listing',
    sf_segment: data.sectionType,
    sf_segment_order: sf_segment_order,
    feed_size: productList?.totalRecords,
    sf_segment_position: sf_segment_position,
    sf_rule: smartFiltersObject.smartFilterRule,
    product_listing_name: productList?.screenName,
    sf_applied: sf_applied.length ? sf_applied : null,
  };
  return segmentData;
};

const getPlpRoutes = <P, R>(params: P): Promise<R> => {
  const url = 'https://static.hopscotch.in/department_plp_routes.json';
  return httpService.get<R>({
    url,
    params,
  });
};

export const productListService = {
  getPlpRoutes,
  getProudctUrl,
  getProductList,
  getFormattedPrice,
  getSmartFiltersTrackingData,
  getSeoHtmlDescription,
};
