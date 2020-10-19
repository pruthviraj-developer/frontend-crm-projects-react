import { httpService } from '../http';
import {
  sosTableData,
  sosTableParams,
  updateSosParams,
  sosErrorMessage,
} from './Isos.service';

const getTableData = (data: sosTableParams): Promise<sosTableData> => {
  const url = '/crm-api/intranet/procurement/sosdashboard/get';
  return httpService.post({ url, data });
};

const updateSos = (data: updateSosParams): Promise<sosErrorMessage> => {
  const url = '/crm-api/intranet/procurement/sosdashboard/action';
  return httpService.post({ url, data });
};

export const sosService = {
  getTableData,
  updateSos,
};
