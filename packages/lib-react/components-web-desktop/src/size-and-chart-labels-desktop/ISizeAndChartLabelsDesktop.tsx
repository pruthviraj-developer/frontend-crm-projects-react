import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeAndChartLabelsDesktopProps {
  isOneSize: boolean;
  hasSizeChart: boolean;
  qtyLeft?: number;
  simpleSkus: ISimpleSkusEntityProps[];
  onSizeChartClick: () => void;
}
