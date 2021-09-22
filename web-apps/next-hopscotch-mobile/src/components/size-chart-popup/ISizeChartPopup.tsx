export interface ISizeChartPopup {
  onClickClose: () => void;
  setLength: (arg0: number, arg1: string) => void;
  setWeight: (arg0: number, arg1: string) => void;
  sizeChartData: SizeChartDTOListEntity[];
  productName: string;
  chartTableData: SizeChartParameterValueDTOListEntity | any;
  showWeightBlock: Array<boolean>;
  showLengthBlock: Array<boolean>;
  isLengthActive: Array<string>;
  isWeightActive: Array<string>;
}

export interface SizeChartDTOListEntity {
  displayAge: boolean;
  illustrationImageUrl: string;
  lengthUnit: string;
  weightUnit: string;
  notesList?: string[] | null;
  cueImageUrlList?: string[] | null;
  sizeChartParameterValueDTOList?: SizeChartParameterValueDTOListEntity[] | null;
  parameterNamesList?: string[] | null;
  parameterMeasureTypeList?: string[] | null;
  importantInfo: string;
}

export interface SizeChartParameterValueDTOListEntity {
  valueList: string[];
}
