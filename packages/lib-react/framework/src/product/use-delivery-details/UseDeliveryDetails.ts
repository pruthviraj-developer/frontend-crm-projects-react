import { IDeliveryDetailsProps } from './IUseDeliveryDetails';

export const useDeliveryDetails = ({
  selectedSku,
  productDetails,
}: IDeliveryDetailsProps) => {
  let skuInternationalPreOrderInfo = '';
  let skuInternationalPreOrderAction = '';
  let { eddPrefix, eddTextColor, eddColor, edd: deliveryMsg } = productDetails;
  const isSkuInternational =
    (selectedSku && selectedSku.isInternationalPreorder) || false;
  const isProductInternational =
    productDetails.isInternationalPreorder || false;
  const productInternationalPreOrderInfo = isProductInternational
    ? productDetails.preorderInfo
    : '';

  const productInternationalPreOrderAction = isProductInternational
    ? productDetails.preorderAction
    : '';

  if (isSkuInternational && selectedSku) {
    skuInternationalPreOrderInfo = selectedSku.preorderInfo;
    skuInternationalPreOrderAction = selectedSku.preorderAction;
  }
  if (selectedSku) {
    eddPrefix = selectedSku.eddPrefix;
    eddTextColor = selectedSku.eddTextColor;
    eddColor = selectedSku.eddColor;
    deliveryMsg = selectedSku.deliveryMsg;
  }

  return {
    deliveryDetails: productDetails.deliveryMessages || [],
    isSkuInternational,
    skuInternationalPreOrderInfo,
    skuInternationalPreOrderAction,
    isProductInternational,
    productInternationalPreOrderInfo,
    productInternationalPreOrderAction,
    eddColor,
    eddTextColor,
    eddPrefix,
    deliveryMsg,
  };
};
