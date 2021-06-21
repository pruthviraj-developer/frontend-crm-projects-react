import { httpService } from '../http';
import {
  merchandisersDataObject,
  merchandisersDropDownObject,
  merchandisersFiltersObject,
  merchandisersOptionalFormFilters,
  downloadTemplateObject,
  downloadTemplateUrlObject,
  downloadTemplateUrlObjectKey,
} from './Imerchandisers.service';

const getTableData = (): Promise<merchandisersDataObject> => {
  const url = '/crm-api/intranet/merchplatform/dashboard';
  return httpService.get<merchandisersDataObject>({ url });
};

const getTableDataWithFilters = (
  data: merchandisersOptionalFormFilters
): Promise<merchandisersDataObject> => {
  const url = '/crm-api/intranet/merchplatform/summary';
  return httpService.post<merchandisersDataObject>({ url, data });
};

const getFiltersData = (): Promise<merchandisersFiltersObject> => {
  const url = '/crm-api/intranet/merchplatform/filters';
  return httpService.get<merchandisersFiltersObject>({ url });
};

const getSubCategories = (params: {
  'category-id': string;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = '/crm-api/intranet/merchplatform/sub-category';
  return httpService.get<Array<merchandisersDropDownObject>>({ url, params });
};

const getProductTypes = (params: {
  'sub-category-ids': Array<number | string | undefined>;
}): Promise<Array<merchandisersDropDownObject>> => {
  const url = `/crm-api/intranet/merchplatform/product-type?sub-category-ids=[${params[
    'sub-category-ids'
  ].join(',')}]`;
  return httpService.get<Array<merchandisersDropDownObject>>({ url });
};

const downloadTemplate = (
  data: merchandisersOptionalFormFilters
): Promise<downloadTemplateObject> => {
  const url = '/crm-api/intranet/merchplatform/export';
  return httpService.post<downloadTemplateObject>({ url, data });
};

const getTemplateDownloadLink = (
  params: downloadTemplateUrlObjectKey,
  delay = 1
): Promise<downloadTemplateUrlObject> => {
  const url = '/crm-api/intranet/propodownload/getsheet';
  return httpService
    .get<downloadTemplateUrlObject>({ url, params })
    .then(async (response) => {
      if (!response.isAvailable && delay < 100) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        return await getTemplateDownloadLink(params, delay + 2);
      }
      return response;
    });
};

export const merchandisersService = {
  getTableData,
  getTableDataWithFilters,
  getFiltersData,
  getProductTypes,
  getTemplateDownloadLink,
  getSubCategories,
  downloadTemplate,
};
