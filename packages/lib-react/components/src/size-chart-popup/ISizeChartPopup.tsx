export interface ISizeChartPopup {
  onClickClose: () => void;
  sizeChartData: SizeChartDTOListEntity[];
  productName: string;
  chartTableData: IChartTablePropsEntity;
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
