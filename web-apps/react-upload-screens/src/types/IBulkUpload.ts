import { FileDownloadOption } from '@hs-crm/containers';

export interface bulkUploadProps {
  header: string;
  uploadAction: string;
  downloadOption: FileDownloadOption[];
}
