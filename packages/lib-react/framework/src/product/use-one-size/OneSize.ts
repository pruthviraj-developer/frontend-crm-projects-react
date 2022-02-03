import { IProductDetailsAttrsEntity } from 'product/types';
import { IOneSizeProps } from './IUseOneSize';

const SIZE = 'size';
const ONE_SIZE = 'one size';
const ONESIZE = 'onesize';

export const useOneSize = ({ productData }: IOneSizeProps) => {
  const simpleSkus = productData && productData.simpleSkus;
  if (simpleSkus && simpleSkus.length) {
    if (simpleSkus.length === 1) {
      const findSize = (list: IProductDetailsAttrsEntity[]) => {
        const attribute = list.find((data) => data.name.toLowerCase() === SIZE);
        return attribute ? attribute.value.toLowerCase() : '';
      };

      const isOneSize = [ONESIZE, ONE_SIZE].includes(
        findSize(simpleSkus[0].attrs || [])
      );
      return { isOneSize };
    }
  }
  return { isOneSize: false };
};
