import { httpService } from '../http';

const getTableData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/model/list';
  return httpService.post<R>({ url, data });
};

const runData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/model/run';
  return httpService.post<R>({ url, data });
};

const deactivateData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/model/deactivate';
  return httpService.post<R>({ url, data });
};

const getModelData = <P, R>(params?: P): Promise<R> => {
  const url = '/crm-api/intranet/model';
  return httpService.get<R>({ url, params });
};

const postModelData = <P, R>(data: P): Promise<R> => {
  const url = '/crm-api/intranet/model';
  return httpService.post<R>({ url, data });
};
export const recommendationService = {
  getTableData,
  deactivateData,
  runData,
  getModelData,
  postModelData,
};
