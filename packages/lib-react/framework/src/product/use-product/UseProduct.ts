import { ISkuAttributes } from 'product/types';
import { ProductProps } from './IUseProduct';

export const useProduct = ({ productData }: ProductProps) => {
  const simpleSkus = productData.simpleSkus || [];
  for (let i = 0; i < simpleSkus.length; i++) {
    const attrs = simpleSkus[i].attrs || [];
    const attributes: ISkuAttributes | any = {};
    for (let j = 0; j < attrs.length; j++) {
      attributes[attrs[j].name.toLowerCase()] = attrs[j].value;
    }
    simpleSkus[i].attributes = attributes;
  }

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
