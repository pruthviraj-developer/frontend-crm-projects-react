import { httpService } from '../http';
import {
  merchandisersDataObject,
  merchandisersDropDownObject,
  merchandisersFiltersObject,
  merchandisersExcelForm,
  downloadTemplateObject,
  downloadTemplateUrlObject,
  downloadTemplateUrlObjectKey,
} from './Imerchandisers.service';

const getTableData = (): Promise<merchandisersDataObject> => {
  const url = '/crm-api/intranet/merchplatform/dashboard';
  return httpService.get({ url });
};

const getFiltersData = (): Promise<merchandisersFiltersObject> => {
  const url = '/crm-api/intranet/merchplatform/filters';
  return httpService.get({ url });
};

const getSubCategories = (params: {
  'category-id': string;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = '/crm-api/intranet/merchplatform/sub-category';
  return httpService.get({ url, params });
};

const getProductTypes = (params: {
  'sub-category-ids': Array<number>;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = `/crm-api/intranet/merchplatform/product-type?sub-category-ids=[${params[
    'sub-category-ids'
  ].join(',')}]`;
  return httpService.get({ url });
};

const downloadTemplate = (
  data: merchandisersExcelForm
): Promise<downloadTemplateObject> => {
  const url = '/crm-api/intranet/merchplatform/export';
  return httpService.post<downloadTemplateObject>({ url, data });
};

const getTemplateDownloadLink = (
  params: downloadTemplateUrlObjectKey
): Promise<downloadTemplateUrlObject> => {
  const url = '/crm-api/intranet/propodownload/getsheet';
  return httpService.get<downloadTemplateUrlObject>({ url, params });
};

export const merchandisersService = {
  getTableData,
  getFiltersData,
  getProductTypes,
  getTemplateDownloadLink,
  getSubCategories,
  downloadTemplate,
};
