import React from 'react';

export interface DatePickerComponentPropsType {
  selectedDate?: string;
  setSelectedDate?: any;
  display: string;
  keyName: string;
  customCss?: React.CSSProperties;
}
