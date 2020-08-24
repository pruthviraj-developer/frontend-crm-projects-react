import { httpService } from '../http';
import {
  ImageUploadRes,
  SortList,
  CarouselImageUpload,
  CloneHeroCarouselWithId,
  tableData,
  CloneHeroCarousel,
  NonHeroCarousel,
} from './Icarousel.service';

const getSortList = (): Promise<SortList> => {
  const url = 'api/carouselservice/carousel/setup';
  return httpService.get<SortList>({ url });
};

const getTableData = (): Promise<tableData> => {
  const url = 'api/carouselservice/carousel/list';
  return httpService.get<tableData>({ url });
};

const getNonHeroCarouselData = (
  id: string
): Promise<CloneHeroCarouselWithId> => {
  const url = `carouselservice/carousel/${id}`;
  return httpService.get<CloneHeroCarouselWithId>({ url });
};

const deleteNonHeroCarouselData = (id: string): Promise<NonHeroCarousel> => {
  const url = `carouselservice/carousel/${id}`;
  return httpService.delete<NonHeroCarousel>({ url });
};

const updateNonHeroCarouselData = (id: string): Promise<NonHeroCarousel> => {
  const url = `carouselservice/carousel/${id}`;
  return httpService.put<NonHeroCarousel>({ url });
};

const createNonHeroCarousel = (
  data: CloneHeroCarousel
): Promise<NonHeroCarousel> => {
  const url = 'api/carouselservice/carousel/list';
  return httpService.post<NonHeroCarousel>({ url, data });
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
  createNonHeroCarousel,
  deleteNonHeroCarouselData,
  getSortList,
  getNonHeroCarouselData,
  getTableData,
  imageUpload,
  updateNonHeroCarouselData,
};
