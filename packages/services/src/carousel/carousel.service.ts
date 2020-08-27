import { httpService } from '../http';
import {
  ImageUploadRes,
  SortList,
  CarouselImageUpload,
  tableData,
  tableParams,
  CloneHeroCarousel,
  NonHeroCarousel,
  List,
} from './Icarousel.service';

const getTableData = (params: tableParams): Promise<tableData> => {
  const url = 'api/carouselservice/pagecarousel/list';
  return httpService.get({ url, params });
};

const getNonHeroCarouselData = <R>(id: string): Promise<R> => {
  const url = `api/carouselservice/pagecarousel/${id}`;
  return httpService.get<R>({ url });
};

const deleteNonHeroCarouselData = (id: string): Promise<NonHeroCarousel> => {
  const url = `api/carouselservice/pagecarousel/${id}`;
  return httpService.delete<NonHeroCarousel>({ url });
};

const updateNonHeroCarouselData = (id: string): Promise<NonHeroCarousel> => {
  const url = `api/carouselservice/pagecarousel/publish/${id}`;
  return httpService.put<NonHeroCarousel>({ url });
};

const createNonHeroCarousel = (
  data: CloneHeroCarousel
): Promise<NonHeroCarousel> => {
  const url = 'api/carouselservice/carousel';
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

const getSortList = (): Promise<SortList> => {
  const url = 'api/carouselservice/carousel/setup';
  return httpService.get<SortList>({ url });
};

const getPlpList = (): Promise<List> => {
  const url = 'api/carouselservice/fetchlist';
  const params = { type: 'plp' };
  return httpService.get<List>({ url, params });
};

const getSpList = (): Promise<List> => {
  const url = 'api/carouselservice/fetchlist';
  const params = { type: 'sp' };
  return httpService.get<List>({ url, params });
};
const getBoutiqueList = (): Promise<List> => {
  const url = 'api/carouselservice/fetchlist';
  const params = { type: 'boutique' };
  return httpService.get<List>({ url, params });
};

const postPageCarousel = <P, R>(data: P): Promise<R> => {
  const url = 'api/carouselservice/pagecarousel';
  return httpService.post<R>({ url, data });
};
export const carouselService = {
  createNonHeroCarousel,
  deleteNonHeroCarouselData,
  getSortList,
  getNonHeroCarouselData,
  getTableData,
  imageUpload,
  updateNonHeroCarouselData,
  getPlpList,
  getSpList,
  getBoutiqueList,
  postPageCarousel,
};
