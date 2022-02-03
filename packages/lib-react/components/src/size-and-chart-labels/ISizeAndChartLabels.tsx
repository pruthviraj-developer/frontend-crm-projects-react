import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeAndChartLabelsProps {
  isOneSize: boolean;
  hasSizeChart: boolean;
  qtyLeft?: number;
  simpleSkus: ISimpleSkusEntityProps[];
  onSizeChartClick: () => void;
}
