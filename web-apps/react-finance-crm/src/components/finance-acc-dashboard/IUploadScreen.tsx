import { FileUploadListOption } from '@hs-crm/containers';
import { FileType } from '@hs-crm/components';
import { FormikValues } from 'formik';

export type ListType = FileUploadListOption[];

export interface ReasonList {
  reasonList: ListType;
}

export interface IDropDownOptions {
  display: string;
  id: string | number;
}

export interface IDropDownChangeType {
  name: string;
  values: IDropDownOptions;
}

export interface FileUploadState extends FormikValues {
  file?: FileType;
  resetInput?: boolean;
}

export interface IFileUploadResponse {
  action: string;
  message: Array<string>;
  recordExist: boolean;
  statusCode?: number;
}
