export interface templateDownloadRes {
  action: string;
  data: templateDownloadResType;
}
export interface templateDownloadResType {
  is_available: boolean;
  url: string;
  message: string;
  sheetKey?: string;
}

export interface eddVendorDownloadRes {
  action: string;
  data: eddTemplateResType;
}
export interface eddTemplateResType {
  isAvailable: boolean;
  url: string;
  message?: string;
}
export interface bulkUploadParamsType {
  action: string;
}

export interface bulkUploadResType {
  action: string;
  error_message: string[];
  success_message: string[];
}

export interface bulkUploadParams {
  file?: string | Blob;
  params: bulkUploadParamsType;
}
export interface bulkUploadRes {
  action: string;
  data: bulkUploadResType;
}

export interface templateDownloadParam {
  action?: string;
  sheetKey?: string;
}

export interface eddVendorUpload {
  file?: string | Blob;
}

export interface eddVendorUploadRes {
  action: string;
  data: eddVendorUploadResType;
}

export interface eddVendorUploadResType {
  messages: string[];
}
