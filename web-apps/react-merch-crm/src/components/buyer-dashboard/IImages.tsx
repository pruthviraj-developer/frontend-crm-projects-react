export interface ImageUploadRes {
  status: boolean;
  modelName?: string;
  errorMsg?: string;
  imageResponse: ImageResponse;
  action: string;
  imageURLPrefix: string;
}

export interface ImageArea {
  imageType: string;
  width: number;
  height: number;
}

export interface ImageResponse {
  id?: number;
  modelName: string;
  imageId: string;
  imageUrl: string;
  version: number;
  imageAreas: ImageArea[];
}

export type IPid = { pid: string };

export interface UpdateImageUrls {
  action: string;
  message: string;
  params?: null;
  statusCode: number;
  data?: null;
}

export interface UploadImageProps {
  header: string;
}
