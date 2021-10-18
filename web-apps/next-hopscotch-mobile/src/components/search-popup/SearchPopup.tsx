import React, { FC, useEffect, useState } from 'react';
import { ISearchPopupProps } from './ISearchPopup';
import { SearchPopupWrapper } from './StyledSearchPopup';
import Search from '../search/Search';
import { productDetailsService } from '@hs/services';
import { IResourceProps } from '@/types';

const SearchPopup: FC<ISearchPopupProps> = ({ close }: ISearchPopupProps) => {
  const [resource, setResource] = useState<IResourceProps>();
  useEffect(() => {
    (async () => {
      try {
        const response: IResourceProps = await productDetailsService.getResouce();
        if (response.action === 'success') {
          const brands = response.brands || [];
          const categories = response.categories;
          if (!brands || !categories || !brands.length || !categories.length) {
            return;
          }
          setResource(response);
        }
      } finally {
      }
    })();
  }, []);
  return (
    <SearchPopupWrapper>
      <Search close={close} resource={resource} />
    </SearchPopupWrapper>
  );
};
export default SearchPopup;
