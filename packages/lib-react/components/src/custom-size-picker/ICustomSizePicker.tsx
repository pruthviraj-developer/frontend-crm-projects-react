export interface ICustomSizePicker {
  isSelected: boolean;
  selectedSkuId?: string;
  sizeListUpfront: string;
  simpleSkus: any; // parent SimpleSkusEntity props
  skuAttributes?: ISkuAttributes[];
}

export interface ISkuAttributes {
  closure?: string;
  gender?: string;
  colour?: string;
  'from age'?: string;
  hbt?: string;
  'hem length'?: string;
  neckline?: string;
  occasion?: string;
  print?: string;
  season?: string;
  size?: string;
  sleeves?: string;
  taste?: string;
  'to age'?: string;
  'units per sets'?: string;
  year?: string;
}
