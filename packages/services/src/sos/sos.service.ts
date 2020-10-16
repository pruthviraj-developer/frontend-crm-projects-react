import { httpService } from '../http';
import {
  sosTableData,
  sosTableParams,
} from './Isos.service';

const getTableData = (params: sosTableParams): Promise<sosTableData> => {
  const url = '/crm-api/intranet/procurement/sosdashboard/get';
  return httpService.get({ url,  params });
};

const postTableData = (): Promise<sosTableData> => {
  const url = '/intranet/procurement/sosdashboard/get';
  return httpService.post({ url });
};


// const updateSos = (data:any): Promise<sosTableData> => {
//   const url = '/intranet/procurement/sosdashboard/get';
//   return httpService.post({ url, data });
// };

export const sosService = {
  getTableData,
  postTableData,
  // updateSos
};
