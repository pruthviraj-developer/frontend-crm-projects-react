import { ImageListType, ResolutionValidationType } from './IImageUpload';

export interface MultipleImageUploadProps {
  previewHeight?: number;
  previewWidth?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  resolutionValidationType?: ResolutionValidationType;
  defaultImageUrls?: Array<string>;
  onSubmit?: (imageUrls: string[], imageToUpload?: ImageListType) => void;
}
