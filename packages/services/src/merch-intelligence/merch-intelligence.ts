import { httpService } from '../http';

const getTableData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/bulk-uploader-service/get';
  return httpService.get<R>({ url, params });
};

const getMskus = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/intranet/bulk-uploader-service/post?action=merchPlatformSetup';
  return httpService.post<R>({ url, data });
};

const getProgressData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/bulk-uploader-service/get';
  return httpService.get({
    url,
    params: { action: 'saleAssortmentInfo', ...params },
  });
};

const getChartsData = <P, R>(params: P): Promise<R> => {
  const url = `/crm-api/intranet/bulk-uploader-service/get`;
  return httpService.get({
    url,
    params: { action: 'merchPlatformAttributeBifurcation', ...params },
  });
};

const postDashboardData = <P, R>(data: P): Promise<R> => {
  const url =
    '/crm-api/intranet/bulk-uploader-service/post?action=changeStatusKeepOrCull';
  return httpService.post<R>({ url, data });
};

const getCarouselData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/bulk-uploader-service/get';
  return httpService.get({
    url,
    params: { action: 'merchPlatformDashboard', ...params },
  });
};

export const merchIntelligenceService = {
  getTableData,
  getMskus,
  getProgressData,
  getChartsData,
  postDashboardData,
  getCarouselData,
};
