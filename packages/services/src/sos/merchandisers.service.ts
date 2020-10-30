import { httpService } from '../http';
import {
  merchandisersDataObject,
  merchandisersDropDownObject,
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

const getSubCategories = (params: {
  'category-id': string;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = '/v1/sos/sub-category';
  return httpService.get({ url, params });
};

export const merchandisersService = {
  getTableData,
  getFiltersData,
  getSubCategories,
};
