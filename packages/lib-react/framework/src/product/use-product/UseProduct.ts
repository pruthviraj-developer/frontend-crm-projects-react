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

export const useProduct = ({ productData, sku }: ProductProps) => {
  const simpleSkus = useMemo(
    () => getSimpleSkus(productData.simpleSkus),
    [productData]
  );
  const {
    productDesc,
    showShippingInfo,
    shippingReturnInfo,
    shippingReturnInfoForSku,
    isReturnable,
    preOrderDescription,
    productLevelAttrList,
    showBrandDetails,
    brandDescription,
    brandName,
    moreInfo,
    retailPriceMax,
    wishlistId,
  } = productData;

  let defaultParameters = {};
  let selectedSku = undefined,
    retailPrice = undefined,
    regularPrice = undefined,
    discount = undefined,
    qtyLeft = undefined,
    size = undefined,
    isPresale = undefined,
    finalSale = undefined,
    showRfypCue = false,
    isfirst = false,
    isProductSoldOut = false;
  let isDefault: boolean | undefined = false;
  const updateProductDetail = (
    sku: ISimpleSkusEntityProps,
    isfirst: boolean,
    defaultOne?: boolean
  ) => {
    isDefault = defaultOne;
    if (!sku) {
      return;
    }

    if (!isfirst) {
      // this.selectedSkuId = sku.skuId;
      // this.showSizeSelectorOption = false;
      selectedSku = sku;
      retailPrice = sku.retailPrice;
    } else {
      // this.showSizeSelectorOption = true;
      retailPrice = productData.retailPrice || sku.retailPrice;
    }

    regularPrice = sku.regularPrice;
    discount = sku.discount;
    qtyLeft = sku.availableQuantity;
    size = sku.attributes.size;
    isPresale = sku.isPresale;
    finalSale = sku.finalSale;
  };

  if (sku) {
    updateProductDetail(sku, false, false);
  } else {
    const selectSku = (skuList: ISimpleSkusEntityProps[]) => {
      for (let i = 0; i < skuList.length; i++) {
        const sku = skuList[i];
        if (sku.availableQuantity > 0) {
          isProductSoldOut = false;
          if (skuList.length > 1) {
            isfirst = true;
            isDefault = true;
            updateProductDetail(sku, isfirst, isDefault);
          } else {
            isfirst = false;
            isDefault = true;
            updateProductDetail(sku, isfirst, isDefault);
          }
          return;
        }
      }
      isfirst = false;
      isProductSoldOut = true;
      updateProductDetail(skuList[0], isfirst);
    };
    selectSku(simpleSkus);
    showRfypCue = !!simpleSkus.find((sku) => !(sku.availableQuantity > 0));
    defaultParameters = {
      ...productData,
      isfirst,
      isDefault,
      isProductSoldOut,
    };
  }

  return {
    productName: simpleSkus[0] && simpleSkus[0].productName,
    productDesc,
    showShippingInfo,
    shippingReturnInfo,
    shippingReturnInfoForSku,
    isReturnable,
    preOrderDescription,
    productLevelAttrList,
    showBrandDetails,
    showBrandInfo: showBrandDetails && brandDescription ? true : false,
    showRfypCue,
    brandDescription,
    brandName,
    moreInfo,
    ...defaultParameters,
    simpleSkus,
    selectedSku,
    retailPrice,
    regularPrice,
    discount,
    qtyLeft,
    size,
    isPresale,
    finalSale,
    retailPriceMax,
    wishlistId,
    selectedSkuId: sku && sku.skuId,
  };
};
