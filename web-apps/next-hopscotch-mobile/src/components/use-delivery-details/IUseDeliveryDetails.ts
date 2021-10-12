import { ISimpleSkusEntityProps, IProductDetails } from 'product/types';

export interface IDeliveryDetailsProps {
  selectedSku?: ISimpleSkusEntityProps; // parent SimpleSkusEntity props
  productData: IProductDetails; // parent IProductDetails props
}
