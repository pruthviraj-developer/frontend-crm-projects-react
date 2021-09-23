import { IDeliveryDetailsProps } from './IUseDeliveryDetails';

export const useDeliveryDetails = ({
  selectedSku,
  productData,
}: IDeliveryDetailsProps) => {
  let skuInternationalPreOrderInfo = '';
  let skuInternationalPreOrderAction = '';
  let { eddPrefix, eddTextColor, eddColor, edd: deliveryMsg } = productData;
  const isSkuInternational =
    (selectedSku && selectedSku.isInternationalPreorder) || false;
  const isProductInternational = productData.isInternationalPreorder || false;
  const productInternationalPreOrderInfo = isProductInternational
    ? productData.preorderInfo
    : '';

  const productInternationalPreOrderAction = isProductInternational
    ? productData.preorderAction
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
    deliveryDetails: productData.deliveryMessages || [],
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
