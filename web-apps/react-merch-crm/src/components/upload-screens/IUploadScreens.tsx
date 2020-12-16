import { FileUploadListOption } from '@hs/containers';

export type ListType = FileUploadListOption[];

export interface ReasonList {
  reasonList: ListType;
}

export interface VendorList {
  vendorList: ListType;
}

export interface BrandList {
  brandList: ListType;
}

export interface InstockList {
  inStockList: ListType;
}
