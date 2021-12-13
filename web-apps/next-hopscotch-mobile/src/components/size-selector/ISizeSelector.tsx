import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorProps {
  pinCode?: string;
  showAddToCart: boolean;
  onSizeChartClick: () => void;
  simpleSkus: ISimpleSkusEntityProps[];
  selectedSku: ISimpleSkusEntityProps;
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
  closePopup: () => void;
  addProductToCart: () => void;
}
