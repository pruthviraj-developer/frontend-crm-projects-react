export interface IDeliveryDetailsProps {
  deliveryDetails: DetailProps[];
  selectedSku?: Record<string, string>; // parent SimpleSkusEntity props
  productDetail: Record<string, string>; // parent IProductDetails props
}

export interface DetailProps {
  action: string;
  msg: string;
  type: number;
}
