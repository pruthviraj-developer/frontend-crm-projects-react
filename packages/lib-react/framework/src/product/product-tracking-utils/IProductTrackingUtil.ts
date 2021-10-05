import { IProductDetails, ISimpleSkusEntityProps } from 'product/types';

export interface IProductTrackingProps {
  selectedSku?: ISimpleSkusEntityProps;
  productDetails: IProductDetails;
}
