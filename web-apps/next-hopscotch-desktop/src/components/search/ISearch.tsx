import { ISearchResourceProps } from '@/types';

export interface ISearch {
  close?: () => void;
  resource?: ISearchResourceProps;
  searchText?: string;
}
