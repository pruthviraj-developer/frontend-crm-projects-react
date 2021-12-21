import React, { FC, useState, useEffect, useCallback } from 'react';
import { ISearch, IRecentSearchesProps, IEulerAutoSuggestionsProps, IEulerSuggestionsEntity } from './ISearch';
import { SearchWrapper, SearchField, SearchForm, CloseIcon, SearchList, List } from './StyledSearch';
import { IconClose } from '@hs/icons';
import { useDebounce, useLocalStorage } from '@hs/framework';
import { productDetailsService } from '@hs/services';
import { useRouter } from 'next/router';

const RECENT_SEARCH = 'RecentSearch';
const BRAND_SUGGESTION = 'BrandSuggestion';
const KEYWORD = 'Keyword';
const CATEGORY_SUGGESTION = 'CategorySuggestion';

const Search: FC<ISearch> = ({ close, resource }: ISearch) => {
  // let _recentSearch: boolean = true;
  const router = useRouter();
  const [searchBy, setSearchBy] = useState<string>('');
  const [suggestions, setSuggestions] = useState<IEulerSuggestionsEntity[]>([]);
  const keyWord = useDebounce(searchBy, 500);
  // const readRecentSearchesFromLocalStorage: any = useReadLocalStorage(['recentSearches']);
  const [recentSearchData, setRecentSearchData] = useLocalStorage<any>('recentSearches', []);
  const [recentSearches, setRecentSearches] = useState(recentSearchData);

  const getSuggestions = useCallback(() => {
    (async () => {
      try {
        const response: IEulerAutoSuggestionsProps = await productDetailsService.getEulerAutoSuggestions(keyWord);
        if (response.action === 'success') {
          setSuggestions(response.suggestions);
        }
      } finally {
      }
    })();
  }, [keyWord]);

  useEffect(() => {
    // _recentSearch = true;
    if (keyWord.length) {
      setRecentSearches([]);
      setSuggestions([]);
      if (resource) {
        const brands = resource.brands || [];
        const categories = resource.categories;
        const subCategories =
          categories &&
          categories
            .map(function (each: any) {
              if (each.subCategory) {
                for (let i = 0; i < each.subCategory.length; i++) {
                  each.subCategory[i].parentName = each.name;
                }
                return each.subCategory;
              }
              return null;
            })
            .flat()
            .filter(Boolean);
        const productTypeList =
          subCategories &&
          subCategories
            .map(function (each: any) {
              if (each.productTypeList) {
                for (let i = 0; i < each.productTypeList.length; i++) {
                  each.productTypeList[i].parentName = each.parentName;
                }
                return each.productTypeList;
              }
              return null;
            })
            .flat()
            .filter(Boolean);
        const stringContains = (each: any) => {
          return each.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
        };

        const getFilteredArray = (list: any, type: string, parent?: string) => {
          return list.filter(stringContains).map(function (each: any) {
            const getLabel = () => {
              const parentName = parent ? ' in ' + (each.parentName || parent) : '';
              return each.name + parentName;
            };
            return {
              label: getLabel(),
              id: each.id,
              name: each.name,
              type,
            };
          });
        };

        const suggestions = []
          .concat(getFilteredArray(productTypeList, 'productTypeList', 'product'))
          .concat(getFilteredArray(subCategories, 'subCategories', 'categories'))
          .concat(getFilteredArray(categories, 'categories'))
          .concat(getFilteredArray(brands, 'brands', 'Brands'));
        setSuggestions(suggestions);
        return;
      }
      getSuggestions();
    }
  }, [keyWord, resource, getSuggestions]);

  const getSubCategorys = (categoryId: number) => {
    const categories = (resource && resource.categories) || [];
    if (categories && categories.length) {
      const categoryList = categories.filter((category) => category.id === categoryId);
      if (categoryList[0] && categoryList[0].hasOwnProperty('subCategory')) {
        const reduceValue = (initial: any, subCategory: any) => initial + ',' + subCategory.id;
        return categoryList[0] && categoryList[0].subCategory && categoryList[0].subCategory.reduce(reduceValue, '');
      }
      return '';
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    // _recentSearch = false;
    getSuggestions();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBy(e.target.value);
  };

  const selectAndSearch = (
    data: IEulerSuggestionsEntity | IRecentSearchesProps,
    recent: string | null,
    suggestionIndex: number,
    options: any,
  ) => {
    const searchObj = Object.assign({}, data, { recent: recent }, options);
    let q: any = {};
    const { id, name, type } = searchObj;
    const params: any = {
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
      recentSearchData.length >= 5 &&
      recentSearchData.filter((e: any) => {
        return e.name == name;
      }).length < 1
    ) {
      setRecentSearchData([searchObj, ...recentSearchData.slice(0, 4)]);
    } else if (
      recentSearchData.filter((e: any) => {
        return e.name == name;
      }).length < 1
    ) {
      setRecentSearchData([searchObj, ...recentSearchData]);
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
      // _self._SegmentService.setUniversal('Server autocomplete');
    } else {
      // if (type !== 'keyword') {
      //   console.log('Client autocomplete');
      //   // _self._SegmentService.setUniversal('Client autocomplete');
      // }
      if (type === 'brands') {
        q.filterQuery = 'brandId=' + id;
        q.brandId = id;
        params.hsection = recent === 'recent' ? RECENT_SEARCH : BRAND_SUGGESTION;
        params.hplp = name;
        params.funnel_section = BRAND_SUGGESTION;
      } else if (type === 'keyword') {
        q.filterQuery = 'keyWord=' + name;
        q.keyWord = name;
        // params.hsection = _recentSearch ? RECENT_SEARCH : KEYWORD;
        params.hsection = RECENT_SEARCH;
        // END As we are not using keyboard arrows
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
        const categoryIds = getSubCategorys(id);
        q.filterQuery = 'subCategorys=' + id + categoryIds;
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

    q.searchBy = searchObj.search_params ? searchObj.term : name;
    const qparams = { ...params };
    qparams.q = JSON.stringify(q);
    router.push({
      pathname: searchObj.actionURI || '/search',
      query: qparams,
    });
    // console.log(qparams);
  };

  const getHighlightSearchText = (word: string, suggestion: string) => {
    let highlightText = suggestion;
    if (suggestion.includes('<b>') || suggestion.includes('<p>')) {
      highlightText = suggestion;
    } else {
      try {
        const str = new RegExp(word, 'gi');
        highlightText = suggestion.replace(str, (w) => {
          return '<em>' + w + '</em>';
        });
        highlightText = '<p>' + highlightText + '</p>';
      } catch (error) {
        //TBD
      }
    }
    return highlightText;
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
          {recentSearches && recentSearches.length && suggestions && suggestions.length === 0 ? (
            <>
              <List>Recent Searches</List>
              {recentSearches.map((data: IRecentSearchesProps, index: number) => {
                return (
                  <List
                    key={index}
                    onClick={() => {
                      selectAndSearch(data, 'recent', index, null);
                    }}
                    dangerouslySetInnerHTML={{ __html: data.term || data.name }}
                  />
                );
              })}
            </>
          ) : suggestions && suggestions.length > 0 ? (
            suggestions.map((data: IEulerSuggestionsEntity, index: number) => {
              return (
                <List
                  key={index}
                  onClick={() => {
                    selectAndSearch(data, null, index, null);
                  }}
                  dangerouslySetInnerHTML={{ __html: data.displayName || getHighlightSearchText(keyWord, data.label) }}
                />
              );
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
