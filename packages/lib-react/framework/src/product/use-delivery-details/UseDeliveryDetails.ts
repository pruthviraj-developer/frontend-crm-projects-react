import { IDeliveryDetailsProps } from './IUseDeliveryDetails';

export const useDeliveryDetails = ({
  selectedSku,
  productDetails,
}: IDeliveryDetailsProps) => {
  const isSku = selectedSku ? true : false;
  const isSkuInternational = isSku
    ? selectedSku?.isInternationalPreorder
    : false;
  const eddPrefix = isSku ? selectedSku?.eddPrefix : productDetails.eddPrefix;
  const eddTextColor = isSku
    ? selectedSku?.eddTextColor
    : productDetails.eddTextColor;
  const eddColor = isSku ? selectedSku?.eddColor : productDetails.eddColor;
  const deliveryMsg = isSku ? selectedSku?.deliveryMsg : productDetails.edd;
  const isProductInternational = productDetails.isInternationalPreorder
    ? productDetails.isInternationalPreorder
    : false;

  const skuInternationalPreOrderInfo = isSkuInternational
    ? selectedSku?.preorderInfo
    : '';
  const skuInternationalPreOrderAction = isSkuInternational
    ? selectedSku?.preorderAction
    : '';

  const productInternationalPreOrderInfo = isProductInternational
    ? productDetails.preorderInfo
    : '';

  const productInternationalPreOrderAction = isProductInternational
    ? productDetails.preorderAction
    : '';

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
