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

export type tableList = {
  id?: number;
  title?: string;
  sorts?: string[];
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
  createdOn?: Date;
  updatedBy?: string;
  updatedOn?: Date;
  active?: boolean;
};

export type tableData = {
  action?: string;
  totalRecords?: number;
  pageSize?: number;
  pageNo?: number;
  records?: tableList[];
};

export interface CbtIdPosition {
  cbtId: number;
  cbtPosition: number;
}

export type CloneHeroCarousel = {
  id?: string;
  title?: string;
  sorts?: number[];
  startDate?: Date;
  endDate?: Date;
  cbtCount?: number;
  transition?: number;
  transitionEffect?: string;
  platform?: string[];
  cbtIdPosition?: CbtIdPosition[];
};

export interface NonHeroCarouselMessageDetail {
  code?: any;
  messageType?: any;
  messageUIType: string;
  message: string;
  actionText: string;
  actionLink?: any;
  actionTextRight?: any;
  actionLinkRight?: any;
  title?: any;
  redirectLink?: any;
  value: string;
  backgroundApi?: any;
}

export interface NonHeroCarousel {
  action?: string;
  messageDetail?: NonHeroCarouselMessageDetail;
  dialog?: any;
  messageBars?: any;
}

export type CloneHeroCarouselWithId = {
  id: string;
  type: string;
};

export type tableParams = { pageSize: number; pageNo: number };

export type SortList = SortListOption[];
export interface SortListOption {
  id: string | number;
  value: string | number | undefined;
}

export type List = ListOption[];
export interface ListOption {
  id: string;
  name: string | number | undefined;
}
