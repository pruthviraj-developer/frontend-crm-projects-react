import { httpService } from '../http';
import { List } from './IproductList.service';

const getPlpList = (): Promise<List> => {
  const url = 'api/categorytree/product/plp';
  return httpService.get<List>({ url });
};

const getSpList = (): Promise<List> => {
  const url = 'api/categorytree/fetch-boutique-tiles';
  const params = { type: 'sp' };
  return httpService.get<List>({ url, params });
};
const getBoutiqueList = (): Promise<List> => {
  const url = 'api/categorytree/fetch-boutique-tiles';
  const params = { type: 'boutique' };
  return httpService.get<List>({ url, params });
};

export const productListService = {
  getPlpList,
  getSpList,
  getBoutiqueList,
};
