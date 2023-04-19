import { httpService } from '../http';
import {
  templateDownloadParam,
  templateDownloadRes,
  bulkUploadParams,
  bulkUploadRes,
  eddVendorDownloadRes,
  eddVendorUpload,
  eddVendorUploadRes,
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

const eddVendorTemplate = (): Promise<eddVendorDownloadRes> => {
  const url = '/crm-api/intranet/vendoredd/downloadexcel';
  return httpService.get<eddVendorDownloadRes>({ url });
};

const eddVendorFileUpload = ({
  file,
}: eddVendorUpload): Promise<eddVendorUploadRes> => {
  const data = new FormData();
  if (file) {
    data.append('file', file);
  }
  const url = '/crm-api/intranet/vendoredd/uploadexcel';
  return httpService.fileUpload<eddVendorUploadRes>({ url, data, params: '' });
};

export const bulkUploadService = {
  downloadTemplate,
  bulkUpload,
  eddVendorTemplate,
  eddVendorFileUpload,
};
