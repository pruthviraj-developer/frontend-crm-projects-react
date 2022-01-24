export interface ISizeComponentProps {
  productName: string;
  id: number;
  response: ISizeChartProps;
}

export interface ISizeChartProps {
  action: string;
  sizeChartDTOList: ISizeChartDTOListEntityProps[];
}

export interface ISizeChartDTOListEntityProps {
  displayAge: boolean;
  illustrationImageUrl: string;
  lengthUnit: string;
  weightUnit: string;
  notesList?: string[] | null;
  cueImageUrlList?: string[] | null;
  sizeChartParameterValueDTOList: SizeChartParameterValueDTOListEntity[];
  parameterNamesList?: string[] | null;
  parameterMeasureTypeList: string[];
  importantInfo: string;
}

export interface SizeChartParameterValueDTOListEntity {
  valueList: string[] | any;
}
