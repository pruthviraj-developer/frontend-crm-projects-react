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
  const updatedDeliveryMessages = [];

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

  if (selectedSku && productData?.deliveryMessages) {
    updatedDeliveryMessages.push(...productData?.deliveryMessages);
  }

  if (
    selectedSku &&
    productData.showSizePickerDropdown &&
    productData.isReturnInfoDifferentForSKUs
  ) {
    updatedDeliveryMessages.push(selectedSku.deliveryMessage);
  }

  const showInternationaPreorder = () => {
    return selectedSku ? isSkuInternational : isProductInternational;
  };

  return {
    deliveryMessages: selectedSku?.deliveryMessage
      ? updatedDeliveryMessages
      : productData.deliveryMessages || [],
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
