export interface uploadRouteParam {
  screenType: string;
}

export interface bulkUploadProps {
  header: string;
  uploadAction: string;
  downloadOption: FiledownloadOption[];
}
export interface FiledownloadOption {
  label?: string;
  action?: string;
}
