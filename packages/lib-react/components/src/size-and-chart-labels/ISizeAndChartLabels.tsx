export interface ISizeAndChartLabelsProps {
  isOneSize: boolean;
  hasSizeChart: boolean;
  qtyLeft: number;
  simpleSkus: Array<Record<string, string>>;
  onSizeChartClick: () => void;
}
