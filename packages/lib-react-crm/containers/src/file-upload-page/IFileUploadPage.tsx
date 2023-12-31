import { FileType } from '@hs-crm/components';
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
  downloadOption?: FileDownloadOption[];
  sideBar?: FileUploadSideBarOption[];
  validationSchema?: unknown;
  buttonLabel?: string;
  disableSubmit?: boolean;
  disableUpload?: boolean;
}

export interface FileUploadSideBarOption {
  name: string;
  label: string;
  type?: 'select' | 'input' | 'autocomplete';
  resetField?: string;
  options?: FileUploadListOption[];
  key?: string;
  disableInput?: boolean;
}

export interface FileDownloadOption {
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
