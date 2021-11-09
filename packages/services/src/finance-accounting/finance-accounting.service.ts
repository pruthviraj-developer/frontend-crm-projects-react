import { httpService } from '../http';
import {
  downloadTemplateUrlObject,
  downloadTemplateUrlObjectKey,
} from '../sos/Imerchandisers.service';

interface IParams {
  pageNo: number;
  pageSize: number;
}

interface IFileParams {
  shipmentId: string;
  override: boolean;
  validate: boolean;
}

interface IFileType {
  customDutyTemplate?: string | Blob;
  params: IFileParams;
}

interface IShipmentIdFileUploadType {
  createShipmentIdTemplate?: string | Blob;
}

const getFilterData = <R>(): Promise<R> => {
  const url = '/crm-api/intranet/customduty/filterdata';
  return httpService.get<R>({ url });
};

const getDashboardData = <P, R>(params: IParams, data: P): Promise<R> => {
  const url = `/crm-api/intranet/show/customduty/details/${params.pageNo}/${params.pageSize}`;
  return httpService.post<R>({ url, data });
};

const getValidStatus = ({
  customDutyTemplate,
  params,
}: IFileType): Promise<any> => {
  const url = '/crm-api/intranet/upload/customduty';
  const data = new FormData();
  if (customDutyTemplate) {
    data.append('customDutyTemplate', customDutyTemplate);
  }
  return httpService.fileUpload<any>({ url, data, params });
};

const postFileData = ({
  customDutyTemplate,
  params,
}: IFileType): Promise<any> => {
  const url = '/crm-api/intranet/upload/customduty';
  const data = new FormData();
  if (customDutyTemplate) {
    data.append('customDutyTemplate', customDutyTemplate);
  }
  return httpService.fileUpload<any>({ url, data, params });
};

const getTemplateDownloadLink = (
  params: downloadTemplateUrlObjectKey
): Promise<downloadTemplateUrlObject> => {
  const url = '/crm-api/intranet/download/customduty/template';
  return httpService.get<downloadTemplateUrlObject>({ url, params });
};

const postShipmentIdData = ({
  createShipmentIdTemplate,
}: IShipmentIdFileUploadType): Promise<any> => {
  const url = '/crm-api/intranet/create/shipmentid';
  const data = new FormData();
  if (createShipmentIdTemplate) {
    data.append('createShipmentIdTemplate', createShipmentIdTemplate);
  }
  return httpService.fileUpload<any>({ url, data });
};
export const financeAccountingService = {
  getFilterData,
  getDashboardData,
  getValidStatus,
  postFileData,
  getTemplateDownloadLink,
  postShipmentIdData,
};
