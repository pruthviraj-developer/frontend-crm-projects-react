export interface IOptionType {
  display: string;
  key: string | number;
}

export interface DataType {
  display: string;
  key: string;
  fieldType?: string | any;
  multiSelect?: boolean;
  options?: IOptionType[] | any;
  limitTags?: number;
}

export interface FilterProps {
  data: DataType[];
  postSubmit?: (value: Record<string, unknown>) => void;
  onChange?: any;
}

export interface IFilterPropsType {
  filter: DataType;
  selectedFilter?: any;
  setSelectedFilter?: any;
  onChange?: any;
}

export interface IDatetype {
  [key: string]: Date | null;
}
