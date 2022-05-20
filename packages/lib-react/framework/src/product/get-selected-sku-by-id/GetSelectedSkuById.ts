import { useMemo } from 'react';
import { ISimpleSkusEntityProps } from 'product/types';
import { getSimpleSkus } from '../get-simple-skus/GetSimpleSkus';
import { IGetSelectedSkuByIdProps } from './IGetSelectedSkuById';

const getSelectedSku = (
  simpleSkus?: ISimpleSkusEntityProps[],
  skuid?: string
) => {
  let selectedSku;
  const skus = getSimpleSkus(simpleSkus || []);
  for (let i = 0; i < skus.length; i++) {
    const sku = skus[i];
    if (skuid && skuid.toUpperCase() === sku.skuId.toUpperCase()) {
      selectedSku = sku;
      break;
    }
  }
  return selectedSku;
};

export const getSelectedSkuById = ({
  simpleSkus,
  skuid,
}: IGetSelectedSkuByIdProps) => {
  const selectedSku = useMemo(() => getSelectedSku(simpleSkus, skuid), [skuid]);
  return selectedSku ? selectedSku : undefined;
};
