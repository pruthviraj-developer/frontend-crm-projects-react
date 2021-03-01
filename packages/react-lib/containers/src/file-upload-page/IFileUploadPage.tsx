import { FileType } from '@hs/components';
import { FormikHelpers, FormikValues } from 'formik';

export type SubmitHelper = FormikHelpers<FileUploadState>;

export interface DropDownValuesWithType {
  name: string;
  values: FileUploadListOption;
}

export interface FileUploadPageProps {
  initialValues: FileUploadState;
  multiple?: boolean;
  acceptType?: Array<string>;
  onSubmit: (
    values: FileUploadState,
    { setSubmitting, setErrors, setStatus, resetForm }: SubmitHelper
  ) => void;
  onExport?: (action?: string) => void;
  onDropDownChange?: (obj: DropDownValuesWithType) => void;
  downloadOption?: FiledownloadOption[];
  sideBar?: FileUploadSideBarOption[];
  validationSchema?: unknown;
}

export interface FileUploadSideBarOption {
  isSelect?: boolean;
  name: string;
  label: string;
  type?: string;
  resetField?: string;
  options?: FileUploadListOption[];
  key?: string;
}

export interface FiledownloadOption {
  label?: string;
  action?: string;
}

export interface FileUploadListOption {
  display: string;
  id: string | number;
  currencyCode?: string;
}
export interface FileUploadState extends FormikValues {
  file?: FileType;
  resetInput?: boolean;
}
