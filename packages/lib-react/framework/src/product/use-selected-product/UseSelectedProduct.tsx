import { IProductFormProps } from './IUseSelectedProduct';

export const useSelectedProduct = ({
  selectedSku,
  productData,
}: IProductFormProps) => {
  const { skuId: selectedSkuId } = selectedSku || {};
  const deliveryMsg =
    productData.isDefault && productData.edd
      ? productData.edd.split('Get it ').join('')
      : selectedSku && selectedSku.deliveryMsg;
  return {
    deliveryMsg,
    retailPriceMax: productData.retailPriceMax,
    selectedSkuId,
  };
};
