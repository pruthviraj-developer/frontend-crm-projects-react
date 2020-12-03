import { httpService } from '../http';
import { MerchStatusChangeType } from './Imerch.statuschange.service';
import {
  downloadTemplateUrlObject,
  downloadTemplateUrlObjectKey,
  brandIdparams
} from './Imerchandisers.service';
const markNonProcurable = ({
  file,
  params,
}: MerchStatusChangeType): Promise<any> => {
  const url = `/crm-api/intranet/nonproc`;
  const data = new FormData();
  if (file) {
    data.append('file', file);
  }
  return httpService.fileUpload<any>({ url, data, params });
};

const markNonProcCurrentVendor = ({
  file,
  params,
}: MerchStatusChangeType): Promise<any> => {
  const url = `/crm-api/intranet/nonproc/currentvendor`;
  const data = new FormData();
  if (file) {
    data.append('file', file);
  }
  return httpService.fileUpload<any>({ url, data, params });
};

const getReasonList = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/getreasonlist';
  return httpService.get<T>({ url });
};


const getVendorList = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/getvendor';
  return httpService.get<T>({ url });
};

const getBrandsList = <T>(params:brandIdparams): Promise<T> => {
  const url = '/crm-api/intranet/getbrandbyvendor';
  return httpService.get<T>({ url, params });
};

const getInstockList = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/getinstocklist';
  return httpService.get<T>({ url });
};

const getTemplateDownloadLink = (
  params: downloadTemplateUrlObjectKey
): Promise<downloadTemplateUrlObject> => {
  const url = '/crm-api/intranet/merchplatform/downloadexcel';
  return httpService.get<downloadTemplateUrlObject>({ url, params });
};

export const merchStatusChangeService = {
  markNonProcurable,
  markNonProcCurrentVendor,
  getReasonList,
  getVendorList,
  getBrandsList,
  getInstockList,
  getTemplateDownloadLink,
};
