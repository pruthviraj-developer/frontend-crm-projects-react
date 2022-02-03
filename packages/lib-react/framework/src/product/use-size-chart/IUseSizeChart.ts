export interface ISizeChartProps {
  action?: string;
  sizeChartDTOList?: SizeChartDTOListEntity[];
  displayType?: IDisplayType;
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
  valueList: string[];
}

export interface IDisplayType {
  index: number;
  unit: string;
  type: string;
}
