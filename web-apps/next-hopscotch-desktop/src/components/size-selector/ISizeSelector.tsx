import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorProps {
  goToProductRecommendation: (a: string) => void;
  showRFYP?: boolean | null;
  showAddToCart: boolean;
  simpleSkus: ISimpleSkusEntityProps[];
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
  selectedSku: ISimpleSkusEntityProps;
}
