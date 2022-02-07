import { ISearchResourceProps } from './ISearchResource';

export interface ISearch {
  close?: () => void;
  resource?: ISearchResourceProps;
  searchText?: string;
  isFormSubmit?: boolean;
}
