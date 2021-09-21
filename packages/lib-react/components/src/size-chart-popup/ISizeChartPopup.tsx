export interface ISizeChartPopup {
  onClickClose: () => void;
  setLength: (number, string) => void;
  setWeight: (number, string) => void;
  sizeChartData: SizeChartDTOListEntity[];
  productName: string;
  chartTableData: IChartTablePropsEntity;
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
  sizeChartParameterValueDTOList?:
    | SizeChartParameterValueDTOListEntity[]
    | null;
  parameterNamesList?: string[] | null;
  parameterMeasureTypeList?: string[] | null;
  importantInfo: string;
}

export interface SizeChartParameterValueDTOListEntity {
  valueList?: string[] | null;
}

export type IChartTableProps = IChartTablePropsEntity[] | null;

export interface IChartTablePropsEntity {
  valueList?: string[] | null;
}
