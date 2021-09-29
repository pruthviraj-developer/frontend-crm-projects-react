import { IProductFormProps } from './IUseSelectedProduct';

export const useSelectedProduct = ({
  selectedSku,
  productData,
}: IProductFormProps) => {
  const {
    regularPrice,
    discount,
    availableQuantity: qtyLeft,
    isPresale,
    finalSale,
    skuId: selectedSkuId,
  } = selectedSku || {};

  const rPrice = selectedSku && selectedSku.retailPrice;
  const retailPrice = productData.isfirst
    ? productData.retailPrice || rPrice
    : rPrice;

  const deliveryMsg =
    productData.isDefault && productData.edd
      ? productData.edd.split('Get it ').join('')
      : selectedSku && selectedSku.deliveryMsg;

  return {
    deliveryMsg,
    discount,
    finalSale,
    isPresale,
    qtyLeft,
    retailPrice,
    retailPriceMax: productData.retailPriceMax,
    regularPrice,
    selectedSku: productData.isfirst ? undefined : selectedSku,
    selectedSkuId,
  };
};
