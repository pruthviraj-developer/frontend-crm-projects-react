import { FileDownloadOption } from '@hs/containers';

export interface bulkUploadProps {
  header: string;
  uploadAction: string;
  downloadOption: FileDownloadOption[];
}
