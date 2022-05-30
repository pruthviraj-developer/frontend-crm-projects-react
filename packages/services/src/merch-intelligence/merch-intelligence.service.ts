import { httpService } from '../http';

const getTableData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/msku-service/get';
  return httpService.get<R>({ url, params });
};

const getMskus = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/msku-service/post?action=merchPlatformSetup';
  return httpService.post<R>({ url, data });
};

const getProgressData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/msku-service/get';
  return httpService.get({
    url,
    params: { action: 'saleAssortmentInfo', ...params },
  });
};

const getChartsData = <P, R>(params: P): Promise<R> => {
  const url = `/crm-api/intranet/msku-service/get`;
  return httpService.get({
    url,
    params: { action: 'merchPlatformAttributeBifurcation', ...params },
  });
};

const postDashboardData = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/intranet/msku-service/post?action=changeStatusKeepOrCull';
  return httpService.post<R>({ url, data });
};

const getCarouselData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/msku-service/get';
  return httpService.get({
    url,
    params: { action: 'merchPlatformDashboard', ...params },
  });
};

const getMSKUProductListing = <P , R>(params?: P): Promise<R> => {
  const url = `/crm-api/intranet/msku-service/get`;
return httpService.get<R>({ url,params });
};

const getMSKUList = <P , R>(params?: P): Promise<R> => {
const url =
  '/crm-api/intranet/msku-service/get';
return httpService.get<R>({ url, params });
};

const updateMskuProductStatus = <P, R>(data: P): Promise<R> => {
const url =
  '/crm-api/intranet/msku-service/post?action=changeStatusKeepOrCull';
return httpService.post<R>({ url, data });
}


export const merchIntelligenceService = {
  getTableData,
  getMskus,
  getProgressData,
  getChartsData,
  postDashboardData,
  getCarouselData,
  getMSKUProductListing,
  getMSKUList,
  updateMskuProductStatus
};
