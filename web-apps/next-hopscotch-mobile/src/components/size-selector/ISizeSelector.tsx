import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorProps {
  showRfypCue: boolean;
  pinCode?: string;
  showAddToCart: boolean;
  onSizeChartClick: () => void;
  simpleSkus: ISimpleSkusEntityProps[];
  selectedSku: ISimpleSkusEntityProps;
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
  goToProductRecommendation: (args: string) => void;
  closePopup: () => void;
}
