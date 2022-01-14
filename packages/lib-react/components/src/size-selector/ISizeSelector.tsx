import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorProps {
  goToProductRecommendation: (a: string) => void;
  showRFYP?: boolean;
  showAddToCart: boolean;
  simpleSkus: ISimpleSkusEntityProps[];
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
  selectedSku?: ISimpleSkusEntityProps;
  isAddtoCartClicked?: boolean;
  canOpenDropDown: boolean;
  onDropDownClose: () => void;
}
