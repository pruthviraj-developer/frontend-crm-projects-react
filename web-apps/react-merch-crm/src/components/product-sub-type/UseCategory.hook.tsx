import { useQuery } from 'react-query';
import { productSubtypeService } from '@hs/services';
import { OptionType } from './IDashboard';

export interface IUseCategoryProps {
  categoryId?: string | number;
  subCategoryId?: string | number;
}

export const useCategory = ({ categoryId, subCategoryId }: IUseCategoryProps) => {
  const {
    data: categoryList,
    isSuccess: isCategoryLoaded,
    isLoading: isCategoryListLoading,
    error: categoryError,
  } = useQuery<OptionType[]>('category', productSubtypeService.getCategory, {
    staleTime: Infinity,
  });

  const {
    data: subCategoryList,
    isSuccess: isSubCatLoaded,
    isFetching: isSubCatFetching,
    isLoading: isSubCategoryListLoading,
    error: subCatError,
  } = useQuery<OptionType[], Record<string, string>>(
    ['subCategories', categoryId],
    () => productSubtypeService.getSubCategory(categoryId),
    {
      staleTime: Infinity,
      retry: false,
      enabled: categoryId !== '',
    },
  );

  const {
    data: pTList,
    isSuccess: isPTSuccess,
    isFetching: isPTFetching,
    isLoading: isPTLoading,
    error: pTError,
  } = useQuery<OptionType[], Record<string, string>>(
    ['productsList', subCategoryId],
    () => productSubtypeService.getProductType(subCategoryId),
    {
      staleTime: Infinity,
      retry: false,
      enabled: subCategoryId !== '',
    },
  );
  return {
    categoryList,
    isCategoryLoaded,
    isCategoryListLoading,
    categoryError,
    subCategoryList,
    isSubCategoryListLoading,
    isSubCatLoaded,
    isSubCatFetching,
    subCatError,
    pTList,
    isPTSuccess,
    isPTFetching,
    isPTLoading,
    pTError,
  };
};
