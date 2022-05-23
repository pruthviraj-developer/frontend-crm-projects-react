import {
  ISimpleSkusEntityProps,
  IProductDetailsAttrsEntity,
} from 'product/types';
export const getSimpleSkus = (simpleSkus: ISimpleSkusEntityProps[]) => {
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
