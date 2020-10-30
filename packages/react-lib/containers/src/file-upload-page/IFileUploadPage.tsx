import { FileType } from '@hs/components';

export interface FileUploadPageProps {
  multiple?: boolean;
  acceptType?: Array<string>;
  onSubmit?: (values: FileUploadState) => void;
}

export interface FileUploadState {
  file?: FileType;
  remark: string;
  reason: string;
}
