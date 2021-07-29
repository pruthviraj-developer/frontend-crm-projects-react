import { FileUploadListOption } from '@hs/containers';

interface currency {
  currencyCode: string;
  display: string;
  id: string;
}

export type ListType = FileUploadListOption[];

export interface ReasonList {
  reasonList: ListType;
}

export interface VendorList {
  vendorList: ListType;
}

export interface CurrencyList {
  currencyList: currency[];
}

export interface BrandList {
  brandList: ListType;
}

export interface InstockList {
  inStockList: ListType;
}

export interface UploadScreenProps {
  header: string;
}
