import { httpService } from '../http';
import { MerchStatusChangeType } from './Imerch.statuschange.service';

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

const getInstockList = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/getinstocklist';
  return httpService.get<T>({ url });
};

export const merchStatusChangeService = {
  markNonProcurable,
  markNonProcCurrentVendor,
  getReasonList,
  getInstockList,
};
