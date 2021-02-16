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
  const url = '/crm-api/intranet/bulk-uploader-service/multipart';
  return httpService
    .get<templateDownloadRes>({ url, params })
    .then(async (response) => {
      if (!response.is_available && delay < 7) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        return await downloadTemplate(params, delay + 2);
      }
      return response;
    });
};

const bulkUpload = ({
  data,
  params,
}: bulkUploadParams): Promise<bulkUploadRes> => {
  const url = '/crm-api/intranet/bulk-uploader-service/multipart';
  return httpService.post<bulkUploadRes>({ url, data, params });
};

export const bulkUploadService = {
  downloadTemplate,
  bulkUpload,
};
