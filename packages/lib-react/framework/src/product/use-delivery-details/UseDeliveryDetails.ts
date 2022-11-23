import { IDeliveryDetailsProps } from './IUseDeliveryDetails';

export const useDeliveryDetails = ({
  selectedSku,
  productData,
}: IDeliveryDetailsProps) => {
  let selectedSkuPreOrderInfo;
  let selectedSkuPreOrderAction;
  let { eddPrefix, eddTextColor, eddColor, edd: deliveryMsg } = productData;
  const isSkuInternational =
    (selectedSku && selectedSku.isInternationalPreorder) || false;
  const isProductInternational = productData.isInternationalPreorder || false;
  const productPreOrderInfo = productData.preorderInfo;
  const productPreOrderAction = productData.preorderAction;
  if (isSkuInternational && selectedSku) {
    selectedSkuPreOrderInfo = selectedSku.preorderInfo;
    selectedSkuPreOrderAction = selectedSku.preorderAction;
  }
  if (selectedSku) {
    eddPrefix = selectedSku.eddPrefix;
    eddTextColor = selectedSku.eddTextColor;
    eddColor = selectedSku.eddColor;
    deliveryMsg = selectedSku.deliveryMsg;
  }

  const showInternationaPreorder = () => {
    return selectedSku ? isSkuInternational : isProductInternational;
  };

  return {
    deliveryMessages: productData.deliveryMessages || [],
    preOrderInfo: selectedSkuPreOrderInfo || productPreOrderInfo,
    preOrderAction: selectedSkuPreOrderAction || productPreOrderAction,
    eddColor,
    eddTextColor,
    eddPrefix,
    deliveryMsg,
    pinCode: productData.pinCode || productData.pincode,
    isEddDifferentForSKUs: productData.isEddDifferentForSKUs,
    showInternationaPreorder: showInternationaPreorder(),
  };
};
