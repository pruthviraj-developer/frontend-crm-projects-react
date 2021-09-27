import { ProductProps } from './IUseProduct';

export const useProduct = ({ productData }: ProductProps) => {
  let {
    productDesc,
    showShippingInfo,
    shippingReturnInfo,
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
    simpleSkus,
    isReturnable,
    isPresale,
    preOrderDescription,
    productLevelAttrList,
    showBrandDetails,
    brandDescription,
    brandName,
    moreInfo,
  };
};
