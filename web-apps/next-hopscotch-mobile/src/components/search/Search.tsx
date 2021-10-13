import React, { FC, useState, useEffect } from 'react';
import { ISearch, IRecentSearchesProps, IEulerAutoSuggestionsProps, IEulerSuggestionsEntity } from './ISearch';
import { SearchWrapper, SearchField, SearchForm, CloseIcon, SearchList, List } from './StyledSearch';
import { IconClose } from '@hs/icons';
import { useDebounce, useReadLocalStorage } from '@hs/framework';
import { productDetailsService } from '@hs/services';

const RECENT_SEARCH = 'RecentSearch';
const BRAND_SUGGESTION = 'BrandSuggestion';
const KEYWORD = 'Keyword';
const CATEGORY_SUGGESTION = 'CategorySuggestion';

const Search: FC<ISearch> = ({ close }: ISearch) => {
  const [searchBy, setSearchBy] = useState<string>('');
  const [suggestions, setSuggestions] = useState<IEulerSuggestionsEntity[]>([]);
  const keyWord = useDebounce(searchBy, 500);
  const recentSearches: any = useReadLocalStorage(['recentSearches']);
  useEffect(() => {
    if (keyWord.length) {
      recentSearches.delete('recentSearches');
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

  const selectAndSearch = (
    data: IEulerSuggestionsEntity,
    recent: string | null,
    suggestionIndex: number,
    options: any,
  ) => {
    let searchObj = Object.assign({}, data, { recent: recent }, options);
    let q:any = {};
    let { id, name, type } = searchObj;
    let params: any = {
      resetFunnel: true,
      funnel_tile: name,
      funnel_section: '',
    };
    let extraSegdata: any = {
      from_location: 'Search icon',
    };
    if (keyWord) {
      extraSegdata.keyword = keyWord;
      extraSegdata.length = keyWord.length;
    }
    if (Number.isInteger(suggestionIndex) && suggestionIndex > -1) {
      extraSegdata.suggestion_index = suggestionIndex + 1;
    }
    extraSegdata = Object.assign({}, searchObj.trackingData, extraSegdata);
    params.extraSegdata = JSON.stringify(extraSegdata);
    if (
      recentSearches.length >= 5 &&
      recentSearches.filter( (e:any) {
        return e.name == name;
      }) < 1
    ) {
      recentSearches.pop();
      recentSearches.unshift(searchObj);
      // LocalStorageService.setData('recentSearches', recentSearches);
    } else if (
      recentSearches.filter((e:any) {
        return e.name == name;
      }) < 1
    ) {
      recentSearches.unshift(searchObj);
      // LocalStorageService.setData('recentSearches', _self.recentSearches);
    }
    if (searchObj.search_params || searchObj.actionURI) {
      if (searchObj.actionURI) {
        params.hplp = null;
      } else {
        let stringyfiedSearchParams;
        if (typeof searchObj.search_params === 'string') {
          stringyfiedSearchParams = searchObj.search_params;
        } else {
          stringyfiedSearchParams = Object.keys(searchObj.search_params)
            .map((key) => key + '=' + searchObj.search_params[key])
            .join('&');
        }
        q = Object.assign({}, q, {
          searchParams: btoa(stringyfiedSearchParams),
        });
        params.hplp = name;
      }
      params.hsection = recent === 'recent' ? RECENT_SEARCH : extraSegdata.section;
      params.funnel_section = recent === 'recent' ? RECENT_SEARCH : extraSegdata.section;
      _self._SegmentService.setUniversal('Server autocomplete');
    } else {
      if (type !== 'keyword') {
        _self._SegmentService.setUniversal('Client autocomplete');
      }
      if (type === 'brands') {
        q.filterQuery = 'brandId=' + id;
        q.brandId = id;
        params.hsection = recent === 'recent' ? RECENT_SEARCH : BRAND_SUGGESTION;
        params.hplp = name;
        params.funnel_section = BRAND_SUGGESTION;
      } else if (type === 'keyword') {
        q.filterQuery = 'keyWord=' + name;
        q.keyWord = name;
        params.hsection = _self._recentSearch ? RECENT_SEARCH : KEYWORD;
        params.hplp = name;
        params.orderRule = 3;
        params.funnel_section = recent === 'recent' ? RECENT_SEARCH : KEYWORD;
      } else if (type === 'productTypeList') {
        q.filterQuery = 'productTypeId=' + id;
        q.productTypeId = id;
        params.hsection = recent === 'recent' ? RECENT_SEARCH : CATEGORY_SUGGESTION;
        params.hplp = name;
        params.funnel_section = params.hsection;
      } else {
        productDetailsService.getSubCategorys(id).then(function (categoryIds) {
          q.filterQuery = 'subCategorys=' + id + categoryIds;
        });
        params.hsection = recent === 'recent' ? RECENT_SEARCH : CATEGORY_SUGGESTION;
        params.hplp = name;
      }
    }

    if (params.resetFunnel && !params.funnel) {
      params.funnel = 'Search';
    }
    params.section = params.hsection;
    params.subSection = params.hsubSection;
    params.plp = params.hplp;

    //Clear Search CTR
    // _self._CtrService.clearSearchCTR();

    // _self._$timeout(function () {
      q.searchBy = searchObj.search_params ? searchObj.term : name;
      const qparams:any = {};
      qparams.q = q.toJSON();
        // _self.$state.go('search', qparams);
    // }, 10);
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
          {recentSearches && recentSearches.get('recentSearches') && suggestions && suggestions.length === 0 ? (
            <>
              <List>Recent Searches</List>
              {recentSearches.get('recentSearches').map((data: IRecentSearchesProps, index: number) => {
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
