import { useMemo } from 'react';
import { ProductProps } from './IUseProduct';
import { ISimpleSkusEntityProps } from 'product/types';
import { getSimpleSkus } from '../get-simple-skus/GetSimpleSkus';
const getDefaultSku = (skuList: ISimpleSkusEntityProps[]) => {
  let selectedSku = skuList[0];
  for (let i = 0; i < skuList.length; i++) {
    const sku = skuList[i];
    if (sku.availableQuantity > 0) {
      selectedSku = sku;
      break;
    }
  }
  return selectedSku;
};

export const useProduct = ({ productData, selectedSku }: ProductProps) => {
  const simpleSkus = useMemo(
    () => getSimpleSkus(productData.simpleSkus),
    [productData]
  );
  const defaultSku = useMemo(() => getDefaultSku(simpleSkus), [productData]);
  const {
    productDesc,
    showShippingInfo,
    shippingReturnInfo,
    shippingReturnInfoForSku,
    isReturnable,
    preOrderDescription,
    productLevelAttrList,
    moreInfo,
    retailPriceMax,
    wishlistId,
    quantity,
  } = productData;
  const retailPrice = selectedSku?.retailPrice || productData.retailPrice;
  const skuData: ISimpleSkusEntityProps = selectedSku || defaultSku;
  const { regularPrice, discount, isPresale, finalSale } = skuData;
  const qtyLeft = skuData.availableQuantity,
    size = skuData.attributes.size;
  const showRfypCue = !!simpleSkus.find((sku) => !(sku.availableQuantity > 0));
  const isProductSoldOut = !(skuData.availableQuantity > 0);
  return {
    productName: skuData.productName,
    productDesc,
    showShippingInfo,
    shippingReturnInfo,
    shippingReturnInfoForSku,
    isReturnable,
    preOrderDescription,
    productLevelAttrList,
    showRfypCue,
    moreInfo,
    isProductSoldOut,
    simpleSkus,
    retailPrice,
    regularPrice,
    discount,
    qtyLeft,
    size,
    isPresale,
    finalSale,
    retailPriceMax,
    wishlistId,
    selectedSkuId: selectedSku && selectedSku.skuId,
    defaultSku,
    hasSizeChart: productData.hasSizeChart,
    isTile: productData.isTile,
    tileAction: productData.tileAction,
    quantity,
  };
};
