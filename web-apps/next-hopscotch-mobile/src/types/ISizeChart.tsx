export interface ISizeComponentProps {
  productName: string;
  id: number;
  response: ISizeChartProps;
}

export interface ISizeChartProps {
  action: string;
  sizeChartDTOList: ISizeChartDTOListEntityProps[] | null;
}

export interface ISizeChartDTOListEntityProps {
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
  valueList?: string[] | null;
}
