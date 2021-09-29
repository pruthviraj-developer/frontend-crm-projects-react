import { IProductDetails, ISimpleSkusEntityProps } from 'product/types';

export interface IProductFormProps {
  selectedSku?: ISimpleSkusEntityProps;
  productData: IProductDetails;
}
