export interface IProductListingProps {
  url: string;
  urlPath?: string;
  queryParams: any;
  plpRoute?: string;
  isMobile: boolean;
  totalPages: number;
  productListId: string;
  productListName: string;
  funnelAndSectionParams?: Record<string, string>;
  showPopularSearch?: boolean;
  plpRoutes?: Record<string, IPlpRoutesListProps>;
  error?: IProductListingError | boolean;
}

export interface IProductListingError {
  statusCode: number;
  message?: string;
}

export interface IPlpRoutesProps {
  routesData: Record<string, IPlpRoutesListProps>;
}
export interface IPlpRoutesListProps {
  url: string;
  params: IPlpParamProps;
}
export interface IPlpParamProps {
  id: string;
  pageHeading: string;
  pageTitle: string;
  description: string;
}
