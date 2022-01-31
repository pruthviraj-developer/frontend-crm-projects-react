import React from 'react';
export interface FilterPanOptionType {
  display: string;
  key: string | number;
}

export interface FilterPanDataType {
  display: string;
  key: string;
  fieldType?: 'InputText' | 'DatePicker' | 'SelectBox';
  multiSelect?: boolean;
  options?: FilterPanOptionType[] | any;
  limitTags?: number;
  isString?: boolean;
  customCss?: React.CSSProperties;
}

export interface FilterPanProps {
  data: FilterPanDataType[];
  postSubmit?: (value: Record<string, unknown>) => void;
  onChange: (e: FilterPanOnChangePropsType) => void;
}

export interface FilterPanOptionPropsType {
  filter: FilterPanDataType;
  selectedFilter?: any;
  setSelectedFilter?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface FilterPanOnChangePropsType {
  [key: string]: Array<string> | string;
}
