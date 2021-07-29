export interface ImageArea {
  imageType: string;
  width: number;
  height: number;
}

export interface ImageResponse {
  id?: any;
  modelName: string;
  imageId: string;
  imageUrl: string;
  version: number;
  imageAreas: ImageArea[];
}

export interface ImageUploadRes {
  status: boolean;
  modelName?: any;
  errorMsg?: any;
  imageResponse: ImageResponse;
  action: string;
  imageURLPrefix: string;
}

export interface CarouselImageUpload {
  file: File;
  maxHeight?: number;
  maxWidth?: number;
}
