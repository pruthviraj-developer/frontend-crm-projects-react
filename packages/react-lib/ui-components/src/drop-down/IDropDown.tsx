export interface DropDownProps {
  placeholder: string;
  showList?: false | true;
  isMultiselect?: boolean;
  selectedObject?: Record<string, unknown> | string;
  selectedObjects?: Array<Record<string, unknown>>;
  onSingleSelect?: (event: Record<string, unknown>) => void;
  onMultiSelect?: (event: Array<Record<string, unknown>>) => void;
  options?: Array<Record<string, unknown>> | Array<string>;
  disabled?: false | true;
  objName?: string;
  objKey?: string;
  menuWidth?: number;
}