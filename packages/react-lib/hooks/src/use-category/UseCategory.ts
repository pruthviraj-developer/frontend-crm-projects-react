import { useQuery } from 'react-query';
import { commonService } from '@hs/services';
import { IUseCategoryProps, OptionType } from './IUseCategory';

export const useCategory = ({
  categoryId,
  subCategoryId,
}: IUseCategoryProps) => {
  const {
    data: categoryList,
    isSuccess: isCategoryLoaded,
    isLoading: isCategoryListLoading,
    error: categoryError,
  } = useQuery<OptionType[]>('category', commonService.getCategory, {
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
    () => commonService.getSubCategory(categoryId),
    {
      staleTime: Infinity,
      retry: false,
      enabled: categoryId !== undefined,
    }
  );

  const {
    data: pTList,
    isSuccess: isPTSuccess,
    isFetching: isPTFetching,
    isLoading: isPTLoading,
    error: pTError,
  } = useQuery<OptionType[], Record<string, string>>(
    ['productsList', subCategoryId],
    () => commonService.getProductTypes(subCategoryId),
    {
      staleTime: Infinity,
      retry: false,
      enabled: subCategoryId !== undefined,
    }
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
