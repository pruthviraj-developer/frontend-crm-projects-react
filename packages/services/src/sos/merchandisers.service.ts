import { httpService } from '../http';
import {
  merchandisersDataObject,
  merchandisersDropDownObject,
  merchandisersFiltersObject,
  merchandisersExcelForm,
} from './Imerchandisers.service';

const getTableData = (): Promise<merchandisersDataObject> => {
  const url = '/v1/merchplatform/dashboard';
  return httpService.get({ url });
};

const getFiltersData = (): Promise<merchandisersFiltersObject> => {
  const url = '/v1/merchplatform/filters';
  return httpService.get({ url });
};

const getSubCategories = (params: {
  'category-id': string;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = '/v1/merchplatform/sub-category';
  return httpService.get({ url, params });
};

const getProductTypes = (params: {
  'sub-category-ids': Array<number>;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = `/v1/merchplatform/product-type?sub-category-ids=[${params[
    'sub-category-ids'
  ].join(',')}]`;
  return httpService.get({ url });
};

const downloadTemplate = (
  data: merchandisersExcelForm
): Promise<Array<merchandisersDropDownObject>> => {
  const url = '/v1/merchplatform/export';
  return httpService.post<Array<merchandisersDropDownObject>>({ url, data });
};

export const merchandisersService = {
  getTableData,
  getFiltersData,
  getProductTypes,
  getSubCategories,
  downloadTemplate,
};
