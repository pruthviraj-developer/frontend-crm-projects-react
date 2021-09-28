import { httpService } from '../http';
import {
  templateDownloadParam,
  templateDownloadRes,
  bulkUploadParams,
  bulkUploadRes,
} from './Ibulk.upload.service';

const downloadTemplate = (
  params: templateDownloadParam,
  delay = 1
): Promise<templateDownloadRes> => {
  const url = '/crm-api/intranet/msku-service/get';
  return httpService
    .get<templateDownloadRes>({ url, params })
    .then(async (response) => {
      if (!response.data.is_available && delay < 100) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        return await downloadTemplate(params, delay + 2);
      }
      return response;
    });
};

const bulkUpload = ({
  file,
  params,
}: bulkUploadParams): Promise<bulkUploadRes> => {
  const data = new FormData();
  if (file) {
    data.append('file', file);
  }
  const url = '/crm-api/intranet/msku-service/multipart';
  return httpService.fileUpload<bulkUploadRes>({ url, data, params });
};

export const bulkUploadService = {
  downloadTemplate,
  bulkUpload,
};
