export interface fileDownloadRes {
  action: string;
  data: fileDownloadResType;
}

export interface fileDownloadResType {
  is_available: boolean;
  url: string;
  message: string;
  sheetKey?: string;
}

export interface fileDownloadParam {
  action?: string;
  sheetKey?: string;
}
