export interface FileUploadProps {
  multiple?: boolean;
  acceptType?: Array<string>;
  maxNumber?: number;
  maxFileSize?: number;
  onChange?: (value: FileListType) => void;
}

export type sizeValidationType = 'absolute' | 'less' | 'more';

export interface FileType {
  dataURL: string;
  file: File;
  key?: string;
}

export type FileListType = Array<FileType>;

export type FileErrorsType = {
  maxFileSize: boolean;
  maxNumber: boolean;
  acceptType: boolean;
};
