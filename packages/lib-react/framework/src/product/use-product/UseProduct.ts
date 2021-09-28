import { ProductProps } from './IUseProduct';

export const useProduct = ({ productData }: ProductProps) => {
  const {
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
    brandDescription,
    brandName,
    moreInfo,
  } = productData;
  return {
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
