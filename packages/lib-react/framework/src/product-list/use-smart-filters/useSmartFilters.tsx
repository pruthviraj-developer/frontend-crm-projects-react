import { useMemo } from 'react';
import {
  IProductListAppliedSmartFilters,
  IUseProductListProps,
} from '../../types';
export const useSmartFilters = (productListData: IUseProductListProps) => {
  const smartFilters = useMemo(() => {
    const appliedFilters =
      productListData?.pages?.[0]?.smartFilter.appliedSmartFilters;
    if (appliedFilters && appliedFilters.length) {
      const filters: Record<string, string | boolean | number> = {
        smartFilterType: '',
        smartFilterValue: '',
        smartFilterSequence: '',
      };
      for (let index = 0; index < appliedFilters.length; index++) {
        const filterElement: IProductListAppliedSmartFilters =
          appliedFilters[index];
        const filterVal = filterElement.filterValue
          ? filterElement.filterValue
          : filterElement.name;
        filters.smartFilterValue = filters.smartFilterValue
          ? filters.smartFilterValue + ',' + filterVal
          : filterVal;
        filters.smartFilterType = filters.smartFilterType
          ? filters.smartFilterType + ',' + filterElement.sectionType
          : filterElement.sectionType;
        filters.smartFilterSequence = filters.smartFilterSequence
          ? filters.smartFilterSequence + '::' + filterElement.sectionType
          : filterElement.sectionType;

        filters[filterElement.sectionType] = filterVal;
      }
      filters['smartFiltersApplied'] = (
        filters.smartFilterSequence as string
      ).split('::').length;
      return filters;
    }
    return {};
  }, [productListData]);
  return {
    smartFilters,
  };
};
