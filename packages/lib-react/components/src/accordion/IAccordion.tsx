export interface IAccordianProps {
  productData: any; // parent product props
  skuAttributes?: ISkuAttributes[];
  sku: any; // parent product form sku
}

export interface ISkuAttributes {
  closure: string;
  gender: string;
  colour: string;
  'from age': string;
  hbt: string;
  'hem length': string;
  neckline: string;
  occasion: string;
  print: string;
  season: string;
  size: string;
  sleeves: string;
  taste: string;
  'to age': string;
  'units per sets': string;
}
