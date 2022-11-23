import {
  IPlpUpdateSortParameters,
  IPlpSortingOptionsEntityProps,
} from '@hs/framework';

export interface IPlpSearchAndSortDetailsProps {
  title: string;
  screenName?: string;
  totalRecords?: number;
  sortingOptions?: IPlpSortingOptionsEntityProps[];
  updateSortParameters: IPlpUpdateSortParameters;
}
