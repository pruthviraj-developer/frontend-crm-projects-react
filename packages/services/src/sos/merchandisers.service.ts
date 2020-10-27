import { httpService } from '../http';
import { tableRowsV2 } from '@hs/components';
import { merchandisersFiltersObject } from './Imerchandisers.service';

const getTableData = (): Promise<tableRowsV2> => {
  const url = '/crm-api/intranet/procurement/sosdashboard/get';
  return httpService.post({ url });
};

const getFiltersData = (): Promise<merchandisersFiltersObject> => {
  const url = '/crm-api/assortment-plan-api/util/filters';
  return httpService.post({ url });
};

export const merchandisersService = {
  getTableData,
  getFiltersData,
};
