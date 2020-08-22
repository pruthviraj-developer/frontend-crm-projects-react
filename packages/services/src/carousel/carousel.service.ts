import { httpService } from '../http';
import {
  ImageUploadRes,
  SortList,
  CarouselImageUpload,
} from './Icarousel.service';

const getSortList = (): Promise<SortList> => {
  const url = 'api/carouselservice/carousel/setup';
  return httpService.get<SortList>({ url });
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
  getSortList,
  imageUpload,
};
