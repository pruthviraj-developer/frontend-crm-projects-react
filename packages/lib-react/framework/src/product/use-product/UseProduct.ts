import {
  IProductDetailsAttrsEntity,
  ISimpleSkusEntityProps,
} from 'product/types';
import { useMemo } from 'react';
import { ProductProps } from './IUseProduct';
const getSimpleSkus = (simpleSkus: ISimpleSkusEntityProps[]) => {
  const retValue = [
    ...simpleSkus.filter((val) => val.availableQuantity > 0),
    ...simpleSkus.filter((val) => val.availableQuantity == 0),
  ];
  for (let i = 0; i < retValue.length; i++) {
    const attrs = retValue[i].attrs || [];
    const attributes = attrs?.reduce(
      (obj: Record<string, string>, item: IProductDetailsAttrsEntity) => (
        (obj[item.name.toLowerCase().replace(/[^0-9a-zA-Z]+|\s+/, '_')] =
          item.value),
        obj
      ),
      {}
    );
    retValue[i].attributes = attributes;
  }
  return retValue;
};

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
  };
};
