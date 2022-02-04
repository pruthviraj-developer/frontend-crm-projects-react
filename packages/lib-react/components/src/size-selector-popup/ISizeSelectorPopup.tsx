import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorPopupProps {
  pinCode?: string;
  addProductToCart: () => void;
  closePopup: () => void;
  onSizeChartClick: () => void;
  simpleSkus: ISimpleSkusEntityProps[];
  selectedSku: ISimpleSkusEntityProps;
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
}
