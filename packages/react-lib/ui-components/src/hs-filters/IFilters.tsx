export interface FileUploadListOption {
  display: string;
  id?: string | number;
  currencyCode?: string;
  key?: string | number;
  value: string | number;
}

export interface FileUploadSideBarOption {
  isSelect?: boolean;
  name: string;
  label: string;
  type?: string;
  resetField?: string;
  options?: FileUploadListOption[];
  key?: string;
}
