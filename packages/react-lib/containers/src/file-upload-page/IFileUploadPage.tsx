import { FileType } from '@hs/components';
import { FormikValues } from 'formik';

export interface FileUploadPageProps {
  initialValues: FileUploadState;
  multiple?: boolean;
  acceptType?: Array<string>;
  onSubmit?: (values: FileUploadState) => void;
  onExport?: () => void;
  sideBar?: FileUploadSideBarOption[];
  validationSchema?: unknown;
}

export interface FileUploadSideBarOption {
  isSelect?: boolean;
  name: string;
  label: string;
  options?: FileUploadListOption[];
}

export interface FileUploadListOption {
  display: string;
  id: string | number;
}
export interface FileUploadState extends FormikValues {
  file?: FileType;
}
