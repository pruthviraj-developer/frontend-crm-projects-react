import React, { FC, useState, useEffect } from 'react';
import { ISearch } from './ISearch';
import { SearchWrapper, SearchField, SearchForm, CloseIcon, SearchList, List } from './StyledSearch';
import { IconClose } from '@hs/icons';
import { useDebounce } from '@hs/framework';

const Search: FC<ISearch> = ({ close }: ISearch) => {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    debugger;
  };

  const [searchBy, setsSarchBy] = useState<string>('');
  const debouncedValue = useDebounce(searchBy, 500);

  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsSarchBy(e.target.value);
  };
  return (
    <SearchWrapper>
      <SearchField>
        <SearchForm
          onSubmit={(e) => {
            return submitForm(e);
          }}
          noValidate
        >
          <input
            auto-complete="off"
            type="text"
            name="search"
            onChange={handleOnChange}
            placeholder="Search for products"
          />
          <CloseIcon onClick={close} icon={IconClose} />
        </SearchForm>
        <SearchList>
          <List>Recent Searches</List>
          <List>test</List>
          <List>white k95</List>
          <List>Barbi girl</List>
          <List>Dream big</List>
        </SearchList>
      </SearchField>
    </SearchWrapper>
  );
};

export default Search;
