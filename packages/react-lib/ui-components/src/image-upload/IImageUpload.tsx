export interface ImageType {
  dataURL: string;
  file: File;
  key?: string;
  onUpdate?: () => void;
  onRemove?: () => void;
}

export type ImageListType = Array<ImageType>;

export interface ImageUploadCoreProps {
  children?: (props: ExportInterface) => React.ReactNode;
  defaultValue?: ImageListType;
  onChange?: (value: ImageListType) => void;
  multiple?: boolean;
  maxNumber?: number;
  acceptType?: Array<string>;
  maxFileSize?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  resolutionValidationType?: ResolutionValidationType;
  onError?: (errors: ErrorsType, files?: ImageListType) => void;
}

export interface ExportInterface {
  imageList: ImageListType;
  onImageUpload: () => void;
  onImageRemoveAll: () => void;
  errors: Record<string, unknown>;
}

export type ErrorsType = {
  maxFileSize: boolean;
  maxNumber: boolean;
  acceptType: boolean;
  resolution: boolean;
};

export type ResolutionValidationType = 'absolute' | 'less' | 'more' | 'ratio';

export interface ImageUploadProps {
  previewHeight?: number;
  previewWidth?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  resolutionValidationType?: ResolutionValidationType;
  onChange?: (value: ImageListType) => void;
}
