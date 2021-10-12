import { ISimpleSkusEntityProps, IProductDetails } from 'product/types';

export interface IDeliveryDetailsProps {
  selectedSku?: ISimpleSkusEntityProps;
  productData: IProductDetails;
}
