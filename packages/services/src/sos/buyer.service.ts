import { httpService } from '../http';
// import queryString from 'query-string';
import { CarouselImageUpload, ImageUploadRes } from './Ibuyer.service';

const getVendorList = <T>(): Promise<T> => {
  const url = '/crm-api/intranet/getvendor';
  return httpService.get<T>({ url });
};

const getVendorDetails = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/vender-details';
  return httpService.get<R>({ url, params });
};

const getTableData = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/msku-service/get';
  return httpService.get<R>({ url, params });
};

const getProductDetails = <P, R>(params: P): Promise<R> => {
  const url = '/crm-api/intranet/list';
  return httpService.get<R>({ url, params });
};

const postData = <P, R>(
  params: Record<symbol, unknown>,
  data: P
): Promise<R> => {
  const url = '/crm-api/intranet/bulk-uploader-service/post';
  // queryString.stringifyUrl({
  //   url: '/crm-api/intranet/bulk-uploader-service/post',
  //   query: { ...params },
  // });
  return httpService.post<R>({ url, data, params });
};

const imageUpload = ({
  file,
}: CarouselImageUpload): Promise<ImageUploadRes> => {
  const url =
    '/crm-api/intranet/boutique_banner/upload/cutout=Y?imageType=bannerImage';
  const data = new FormData();
  data.append('imageFile', file);
  return httpService.fileUpload<ImageUploadRes>({ url, data });
};

export const buyerService = {
  getVendorList,
  getVendorDetails,
  getTableData,
  getProductDetails,
  postData,
  imageUpload,
};
