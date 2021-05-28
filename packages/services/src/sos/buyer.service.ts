import { httpService } from '../http';

const getVendorList = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/getvendor';
  return httpService.get<T>({ url });
};

export const buyerService = {
  getVendorList,
};
