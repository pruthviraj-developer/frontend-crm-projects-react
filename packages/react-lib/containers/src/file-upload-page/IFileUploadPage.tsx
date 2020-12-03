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
  onExport?: () => void;
  onDropDownChange?: (obj: DropDownValuesWithType) => void;
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
}

export interface FileUploadListOption {
  display: string;
  id: string | number;
}
export interface FileUploadState extends FormikValues {
  file?: FileType;
  resetInput?: boolean;
}
