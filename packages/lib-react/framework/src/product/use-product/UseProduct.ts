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
export const useProduct = ({ productData }: ProductProps) => {
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
    isPresale,
    preOrderDescription,
    productLevelAttrList,
    showBrandDetails,
    brandDescription,
    brandName,
    moreInfo,
  } = productData;
  return {
    productName: simpleSkus[0] && simpleSkus[0].productName,
    productDesc,
    showShippingInfo,
    shippingReturnInfo,
    shippingReturnInfoForSku,
    simpleSkus,
    isReturnable,
    isPresale,
    preOrderDescription,
    productLevelAttrList,
    showBrandDetails,
    showBrandInfo: showBrandDetails && brandDescription ? true : false,
    brandDescription,
    brandName,
    moreInfo,
  };
};
