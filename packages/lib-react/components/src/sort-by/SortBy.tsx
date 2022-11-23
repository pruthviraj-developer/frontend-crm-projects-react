import React, { FC } from 'react';
import { SortByWrapper, SortByTitle, SortingOption } from './StyledSortBy';
import { IPlpSortByProps } from './ISortBy';
import { IPlpSortingOptionsEntityProps } from '@hs/framework';
export const SortBy: FC<IPlpSortByProps> = ({
  title,
  updateSortParameters,
  sortingOptions,
}: IPlpSortByProps) => {
  return (
    <SortByWrapper>
      <SortByTitle>{title}</SortByTitle>

      {sortingOptions &&
        sortingOptions.map(
          (option: IPlpSortingOptionsEntityProps, index: number) => (
            <SortingOption
              key={index}
              className={option.isSelected ? 'selected' : ''}
              onClick={() => {
                updateSortParameters(index, option);
              }}
            >
              {option.sortName}
            </SortingOption>
          )
        )}
    </SortByWrapper>
  );
};
