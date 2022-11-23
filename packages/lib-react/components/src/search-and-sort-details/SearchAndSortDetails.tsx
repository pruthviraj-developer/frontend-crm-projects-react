import React, { FC } from 'react';
import { IPlpSearchAndSortDetailsProps } from './ISearchAndSortDetails';
import { productListService } from '@hs/services';
import { SortBy } from '../sort-by';
import {
  SearchAndSortDetailsWrapper,
  SearchResultsTitleWrapper,
  SearchResultsLabel,
  SearchResultsForTitle,
} from './StyledSearchAndSortDetails';

export const SearchAndSortDetails: FC<IPlpSearchAndSortDetailsProps> = ({
  title,
  updateSortParameters,
  screenName,
  totalRecords,
  sortingOptions,
}: IPlpSearchAndSortDetailsProps) => {
  return (
    <SearchAndSortDetailsWrapper>
      <SearchResultsTitleWrapper>
        <SearchResultsLabel>
          Showing {productListService.getFormattedPrice(totalRecords)} results
          for
        </SearchResultsLabel>
        <SearchResultsForTitle>{screenName}</SearchResultsForTitle>
      </SearchResultsTitleWrapper>
      <SortBy
        {...{
          title,
          sortingOptions,
          updateSortParameters,
        }}
      />
    </SearchAndSortDetailsWrapper>
  );
};
