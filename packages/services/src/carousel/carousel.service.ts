import { httpService } from '../http';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { ImageUploadRes } from './Icarousel.service';

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

type CarouselImageUpload = {
  file: File;
  maxHeight?: number;
  maxWidth?: number;
};

const imageUpload = ({
  file,
}: CarouselImageUpload): Promise<ImageUploadRes> => {
  const url = `api/intranet/boutique_banner/upload/cutout=Y?imageType=bannerImage`;
  const data = new FormData();
  data.append('imageFile', file);
  return httpService.fileUpload<ImageUploadRes>({ url, data });
};

export const carouselService = {
  get,
  post,
  put,
  delete: deleteApi,
  patch,
  imageUpload,
};
