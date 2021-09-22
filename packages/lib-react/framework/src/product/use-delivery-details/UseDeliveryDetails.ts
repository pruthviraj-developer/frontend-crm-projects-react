import { IDeliveryDetailsProps } from './IUseDeliveryDetails';

export const useDeliveryDetails = ({
  selectedSku,
  productDetails,
}: IDeliveryDetailsProps) => {
  return {
    deliveryDetails: productDetails.deliveryMessages || [],
    sku: selectedSku || undefined,
    productDetails,
  };
};
