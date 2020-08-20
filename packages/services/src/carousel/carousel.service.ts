import { httpService } from '../http';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

type IHttpService = Pick<AxiosRequestConfig, 'url' | 'data' | 'params'>;
const get = ({ url, params }: IHttpService): AxiosPromise<any> => {
  return httpService.get({ url, params });
};
const post = ({ url, params, data }: IHttpService): AxiosPromise<any> => {
  return httpService.post({ url, params, data });
};
const deleteApi = ({ url, params, data }: IHttpService): AxiosPromise<any> => {
  return httpService.delete({ url, params, data });
};
const patch = ({ url, params, data }: IHttpService): AxiosPromise<any> => {
  return httpService.patch({ url, params, data });
};
const put = ({ url, params, data }: IHttpService): AxiosPromise<any> => {
  return httpService.put({ url, params, data });
};
const fileUpload = ({ url, params, data }: IHttpService) => {
  return httpService.fileUpload({ url, params, data });
};
export const carouselService = {
  get,
  post,
  put,
  delete: deleteApi,
  patch,
  fileUpload,
};
