export interface ISizeChartPopupDesktop {
  onClickClose: () => void;
  setLength: (arg0: number, arg1: string) => void;
  setWeight: (arg0: number, arg1: string) => void;
  sizeChartData: ISizeChartDTOListEntityDesktop[];
  productName: string;
  chartTableData: ISizeChartParameterValueDTOListEntityDesktop | any;
  showWeightBlock: Array<boolean>;
  showLengthBlock: Array<boolean>;
  isLengthActive: Array<string>;
  isWeightActive: Array<string>;
}

export interface ISizeChartDTOListEntityDesktop {
  displayAge: boolean;
  illustrationImageUrl: string;
  lengthUnit: string;
  weightUnit: string;
  notesList?: string[] | null;
  cueImageUrlList?: string[] | null;
  sizeChartParameterValueDTOList?:
    | ISizeChartParameterValueDTOListEntityDesktop[]
    | null;
  parameterNamesList?: string[] | null;
  parameterMeasureTypeList?: string[] | null;
  importantInfo: string;
}

export interface ISizeChartParameterValueDTOListEntityDesktop {
  valueList: string[];
}
