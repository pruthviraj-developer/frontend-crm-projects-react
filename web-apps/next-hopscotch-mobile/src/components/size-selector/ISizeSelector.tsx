import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorProps {
  showRfypCue: boolean;
  pinCode?: string;
  showAddToCart: boolean;
  onSizeChartClick: () => void;
  simpleSkus: ISimpleSkusEntityProps[];
  selectedSku: ISimpleSkusEntityProps;
  onSizeSelect: (args: ISimpleSkusEntityProps) => void;
}
