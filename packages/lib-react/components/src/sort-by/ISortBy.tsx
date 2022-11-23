import {
  IPlpUpdateSortParameters,
  IPlpSortingOptionsEntityProps,
} from '@hs/framework';

export interface IPlpSortByProps {
  title: string;
  sortingOptions?: IPlpSortingOptionsEntityProps[];
  updateSortParameters: IPlpUpdateSortParameters;
}
