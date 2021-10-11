import { IProductDetails, ISimpleSkusEntityProps } from 'product/types';
export interface ProductProps {
  productData: IProductDetails;
  sku?: ISimpleSkusEntityProps;
}
