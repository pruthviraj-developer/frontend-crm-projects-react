export interface templateDownloadRes {
  is_available: boolean;
  url: string;
  message: string;
}

export interface bulkUploadParam {
  file?: string | Blob;
}

export interface bulkUploadRes {
  action: string;
  error_messages: string[];
  success_messages: string[];
}

export interface templateDownloadParam {
  action: string;
}
