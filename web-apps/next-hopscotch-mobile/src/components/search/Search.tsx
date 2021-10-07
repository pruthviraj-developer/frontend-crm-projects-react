import React, { FC, useState, useEffect } from 'react';
import { ISearch, IRecentSearchesProps, IResoucreProps } from './ISearch';
import { SearchWrapper, SearchField, SearchForm, CloseIcon, SearchList, List } from './StyledSearch';
import { IconClose } from '@hs/icons';
import { useDebounce, useReadLocalStorage } from '@hs/framework';
import { productDetailsService } from '@hs/services';

const Search: FC<ISearch> = ({ close }: ISearch) => {
  const [searchBy, setsSarchBy] = useState<string>('');
  const debouncedValue = useDebounce(searchBy, 500);
  const searches: any = useReadLocalStorage(['recentSearches']);
  const suggestions = [];
  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsSarchBy(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const resouces: IResoucreProps = await productDetailsService.getResouce();
        console.log(JSON.stringify(resouces));
      } catch (error) {}
    })();
  }, []);

  return (
    <SearchWrapper>
      <SearchField>
        <SearchForm
          onSubmit={(e) => {
            return submitForm(e);
          }}
          noValidate
          autoComplete={'off'}
        >
          <input type="text" name="search" onChange={handleOnChange} placeholder="Search for products" />
          <CloseIcon onClick={close} icon={IconClose} />
        </SearchForm>
        <SearchList>
          {searches && searches.get('recentSearches') && suggestions.length === 0 ? (
            <>
              <List>Recent Searches</List>
              {searches.get('recentSearches').map((data: IRecentSearchesProps) => {
                return <List>{data.term || data.name}</List>;
              })}
            </>
          ) : (
            ''
          )}
        </SearchList>
      </SearchField>
    </SearchWrapper>
  );
};

export default Search;
