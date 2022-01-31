import { ISimpleSkusEntityProps } from 'types';

export interface ICustomSizePicker {
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
  selectedSku: ISimpleSkusEntityProps;
  simpleSkus: ISimpleSkusEntityProps[];
}
