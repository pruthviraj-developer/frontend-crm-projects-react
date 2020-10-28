import { httpService } from '../http';
import {
  merchandisersDataObject,
  merchandisersFiltersObject,
} from './Imerchandisers.service';

const getTableData = (): Promise<merchandisersDataObject> => {
  const url = '/v1/sos/merchplatform/dashboard';
  return httpService.get({ url });
};

const getFiltersData = (): Promise<merchandisersFiltersObject> => {
  const url = '/v1/sos/merchplatform/filters';
  return httpService.get({ url });
};

export const merchandisersService = {
  getTableData,
  getFiltersData,
};
