import { IProductDetailsAttrsEntity } from 'product/types';
import { IOneSizeProps, ISkuAttributes } from './IOneSize';

const SIZE = 'size';
const ONE_SIZE = 'one size';
const ONESIZE = 'onesize';

export const useOneSize = ({ productData }: IOneSizeProps) => {
  const simpleSkus = productData && productData.simpleSkus;
  const skuAttributes: ISkuAttributes[] = [];
  if (simpleSkus && simpleSkus.length) {
    for (let i = 0; i < simpleSkus.length; i++) {
      const attrs = simpleSkus[i].attrs || [];
      const attributes: ISkuAttributes | any = {};
      for (let j = 0; j < attrs.length; j++) {
        attributes[attrs[j].name.toLowerCase()] = attrs[j].value;
      }
      skuAttributes.push(attributes);
    }
    if (simpleSkus.length === 1) {
      const findSize = (list: IProductDetailsAttrsEntity[]) => {
        const attribute = list.find((data) => data.name.toLowerCase() === SIZE);
        return attribute ? attribute.value.toLowerCase() : '';
      };

      const isOneSize = [ONESIZE, ONE_SIZE].includes(
        findSize(simpleSkus[0].attrs || [])
      );
      return {
        isOneSize,
        productName: simpleSkus[0].productName,
        skuAttributes,
      };
    }
    return {
      isOneSize: false,
      productName: simpleSkus[0].productName,
      skuAttributes,
    };
  }
  return { isOneSize: false, productName: undefined, skuAttributes };
};
