import axios, { AxiosRequestConfig, AxiosError } from 'axios';
const httpHeaders = {
  'api-version': 'v1.8',
  'client-auth-method': 'v1',
  'client-id': 'web-client/3.0',
  'secret-key': 'SdeF21dn1ll23ms1AEcn223Ln039kds',
  Accept: 'application/json, text/javascript, */*; q=0.01',
  'device-id': '',
  'install-id': '',
  'Content-Type': 'application/json'
};
export type IHttpService = Pick<
  AxiosRequestConfig,
  'url' | 'data' | 'params' | 'headers'
>;

const err = {
  action: 'failure',
  message: 'login required',
};

const processRequest = <P = any>(
  requestConfig: AxiosRequestConfig
): Promise<P> => {
  return axios(requestConfig)
    .then(function (response) {
      if (
        response.data &&
        response.data.action &&
        response.data.action.toLowerCase() === 'failure'
      )
        return Promise.reject(response.data);
      if (response.status && response.status >= 200 && response.status < 300)
        return response.data;
      throw Error(response.statusText) as AxiosError;
    })
    .catch(function (error: AxiosError) {
      if (error.response && 401 === error.response.status) {
        return Promise.reject(err);
      } else if (error.response && error.response.status >= 500) {
        return Promise.reject(error.response || {});
      } else if (error.message === 'Network Error') {
        return Promise.reject(error);
      } else {
        const errorMessage = error.response?.data;
        if (errorMessage) {
          return Promise.reject(errorMessage);
        }
        return Promise.reject(error);
      }
    });
};
const get = <T>({ url, params, headers }: IHttpService): Promise<T> => {
  const reqConfig: AxiosRequestConfig = {
    method: 'get',
    url,
    headers: { ...httpHeaders, ...headers },
    params: params,
  };
  return processRequest(reqConfig);
};
const post = <T>({ url, params, data }: IHttpService): Promise<T> => {
  const reqConfig: AxiosRequestConfig = {
    method: 'post',
    url,
    headers: { ...httpHeaders },
    params,
    data,
  };
  return processRequest(reqConfig);
};
const deleteApi = <T>({ url, params, data }: IHttpService): Promise<T> => {
  const reqConfig: AxiosRequestConfig = {
    method: 'delete',
    url,
    headers: { ...httpHeaders },
    params,
    data,
  };
  return processRequest(reqConfig);
};
const put = <T>({ url, params, data }: IHttpService): Promise<T> => {
  const reqConfig: AxiosRequestConfig = {
    method: 'put',
    url,
    headers: { ...httpHeaders },
    params,
    data,
  };
  return processRequest(reqConfig);
};
const patch = ({ url, params, data }: IHttpService) => {
  const reqConfig: AxiosRequestConfig = {
    method: 'patch',
    url,
    headers: { ...httpHeaders },
    params,
    data,
  };
  return processRequest(reqConfig);
};
const fileUpload = <T>({ url, params, data }: IHttpService): Promise<T> => {
  const reqConfig: AxiosRequestConfig = {
    method: 'post',
    url,
    headers: { ...httpHeaders, 'Content-Type': 'multipart/form-data' },
    params,
    data,
  };
  return processRequest<T>(reqConfig);
};
export const httpService = {
  get,
  post,
  put,
  delete: deleteApi,
  patch,
  fileUpload,
};
