import { ISimpleSkusEntityProps } from 'types';

export interface ICustomSizePicker {
  isSelected: boolean;
  selectedSkuId?: string;
  sizeListUpfront: string;
  simpleSkus: ISimpleSkusEntityProps[];
}
