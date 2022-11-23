import { useMemo } from 'react';
import { IUseProductListProps } from '../../types';
export const useSort = (productListData: IUseProductListProps) => {
  const productsList = productListData?.pages?.[0];
  const selectedSortOption = useMemo(() => {
    const selected: Record<string, number | undefined> = {};
    const selectedSortingOption = productsList?.sortingOptions.find(
      (selectedSort) => selectedSort.isSelected
    );
    return selectedSortingOption || selected;
  }, [productsList]);

  return {
    selectedSort: { orderRule: selectedSortOption.orderRule },
    selectedSortOption,
  };
};
