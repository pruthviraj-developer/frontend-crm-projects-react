import { IProductFormProps } from './IUseSelectedProduct';

export const useSelectedProduct = ({ sku, productInfo }: IProductFormProps) => {
  let {
    regularPrice,
    discount,
    availableQuantity: qtyLeft,
    isPresale,
    finalSale,
    skuId: selectedSkuId,
  } = sku || {};

  let rPrice = sku && sku.retailPrice;
  const retailPrice = productInfo.isfirst
    ? productInfo.retailPrice || rPrice
    : rPrice;

  const deliveryMsg =
    productInfo.isDefault && productInfo.edd
      ? productInfo.edd.split('Get it ').join('')
      : sku && sku.deliveryMsg;

  return {
    deliveryMsg,
    discount,
    finalSale,
    isPresale,
    qtyLeft,
    retailPrice,
    retailPriceMax: productInfo.retailPriceMax,
    regularPrice,
    selectedSku: productInfo.isfirst ? undefined : sku,
    selectedSkuId,
  };
};
