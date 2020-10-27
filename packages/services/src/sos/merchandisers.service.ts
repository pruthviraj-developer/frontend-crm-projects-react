import { httpService } from '../http';
import {
  merchandisersArrayObject,
  merchandisersFiltersObject,
} from './Imerchandisers.service';

const getTableData = (): Promise<merchandisersArrayObject> => {
  const url = '/crm-api/v1/sos/merchplatform/dashboard';
  return httpService.get({ url });
};

const getFiltersData = (): Promise<merchandisersFiltersObject> => {
  const url = '/crm-api/v1/sos/merchplatform/filters';
  return httpService.get({ url });
};

export const merchandisersService = {
  getTableData,
  getFiltersData,
};
