import { ISimpleSkusEntityProps } from 'types';

export interface IProductNamePricePropsDesktop {
  productName?: string;
  retailPrice?: number;
  retailPriceMax?: number;
  selectedSku?: ISimpleSkusEntityProps;
  regularPrice?: number;
  discount?: number;
  isProductSoldOut: boolean;
}
