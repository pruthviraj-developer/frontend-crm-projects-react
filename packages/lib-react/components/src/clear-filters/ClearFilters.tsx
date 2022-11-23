import React, { FC } from 'react';
import { IClearFilterProps } from './IClearFilters';
import {
  ClearFilterWrapper,
  FilterNoResult,
  Message,
  ViewAll,
} from './StyledClearFilters';

import { IconFilterNoResult } from '@hs/icons';

export const ClearFilters: FC<IClearFilterProps> = ({
  clearFilters,
}: IClearFilterProps) => {
  return (
    <ClearFilterWrapper>
      <FilterNoResult icon={IconFilterNoResult} />
      <Message> Oh no! Too many filters.</Message>
      <ViewAll onClick={clearFilters}>View all items</ViewAll>
    </ClearFilterWrapper>
  );
};
