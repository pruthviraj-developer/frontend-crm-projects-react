import React, { FC, useState, useEffect } from 'react';
import {
  ISearch,
  IRecentSearchesProps,
  IEulerAutoSuggestionsProps,
  IEulerSuggestionsEntity,
  IResoucreProps,
} from './ISearch';
import { SearchWrapper, SearchField, SearchForm, CloseIcon, SearchList, List } from './StyledSearch';
import { IconClose } from '@hs/icons';
import { useDebounce, useReadLocalStorage } from '@hs/framework';
import { productDetailsService } from '@hs/services';

const Search: FC<ISearch> = ({ close }: ISearch) => {
  const [searchBy, setSearchBy] = useState<string>('');
  const [suggestions, setSuggestions] = useState<IEulerSuggestionsEntity[]>([]);
  const keyWord = useDebounce(searchBy, 500);
  const searches: any = useReadLocalStorage(['recentSearches']);
  useEffect(() => {
    if (keyWord.length) {
      searches.delete('recentSearches');
      (async () => {
        try {
          const response: IEulerAutoSuggestionsProps = await productDetailsService.getEulerAutoSuggestions(keyWord);
          if (response.action === 'success') {
            setSuggestions(response.suggestions);
            return;
          }
          setSuggestions([]);
        } catch (error) {
          setSuggestions([]);
        }
      })();
    }
  }, [keyWord]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBy(e.target.value);
  };

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
          {searches && searches.get('recentSearches') && suggestions && suggestions.length === 0 ? (
            <>
              <List>Recent Searches</List>
              {searches.get('recentSearches').map((data: IRecentSearchesProps, index: number) => {
                return <List key={index} dangerouslySetInnerHTML={{ __html: data.term || data.name }}></List>;
              })}
            </>
          ) : suggestions && suggestions.length > 0 ? (
            suggestions.map((data: IEulerSuggestionsEntity, index: number) => {
              return <List key={index} dangerouslySetInnerHTML={{ __html: data.displayName || data.term }}></List>;
            })
          ) : (
            ''
          )}
        </SearchList>
      </SearchField>
    </SearchWrapper>
  );
};

export default Search;
