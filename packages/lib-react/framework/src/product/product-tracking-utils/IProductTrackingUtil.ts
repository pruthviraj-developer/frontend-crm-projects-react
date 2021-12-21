import { IProductDetails, ISimpleSkusEntityProps } from 'product/types';

export interface IProductTrackingProps {
  selectedSku?: ISimpleSkusEntityProps;
  productData: IProductDetails;
}

export interface IProductSchema {
  defaultSku?: ISimpleSkusEntityProps;
  productData: IProductDetails;
  url: string;
}
