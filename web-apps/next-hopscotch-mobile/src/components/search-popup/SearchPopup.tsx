import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ISearchPopupProps } from './ISearchPopup';
import { SearchPopupWrapper } from './StyledSearchPopup';
import { Search } from '../search';
import { productDetailsService } from '@hs/services';
import { ISearchResourceProps } from '@/types';

const SearchPopup: FC<ISearchPopupProps> = ({ close }: ISearchPopupProps) => {
  const [resource, setResource] = useState<ISearchResourceProps>();
  const { data: response } = useQuery<ISearchResourceProps>(['resourceData'], () =>
    productDetailsService.getResouce<ISearchResourceProps>(),
  );
  useEffect(() => {
    if (response?.action === 'success') {
      const brands = response.brands || [];
      const categories = response.categories;
      if (!brands || !categories || !brands.length || !categories.length) {
        return;
      }
      setResource(response);
    }
  }, [response]);
  return (
    <SearchPopupWrapper>
      <Search close={close} resource={resource} />
    </SearchPopupWrapper>
  );
};
export default SearchPopup;
