import { useQuery } from 'react-query';
import { reorderService , commonService } from '@hs/services';
import {
  IProductTypes,
  ISubCategory,
  IUseCategoryProps,
  OptionType,
} from './IUseCategory';

export const useCategory = ({
  category_id,
  sub_category_ids,
}: IUseCategoryProps) => {
  const {
    data: categoryList,
    isSuccess: isCategoryLoaded,
    error: categoryError,
  } = useQuery<OptionType[]>('category', commonService.getCategory, {
    staleTime: Infinity,
  });

  const {
    data: subCategoryData,
    isSuccess: isSubCatLoaded,
    isFetching: isSubCatFetching,
    error: subCatError,
  } = useQuery<ISubCategory, Record<string, string>>(
    ['subCategories', category_id],
    () => commonService.getSubCategory(category_id)),
    {
      staleTime: Infinity,
      retry: false,
      enabled: category_id !== '',
    }
  );

  const {
    data: pTList,
    isSuccess: isPTSuccess,
    isFetching: isPTFetching,
    error: pTError,
  } = useQuery<IProductTypes, Record<string, string>>(
    ['productsList', sub_category_ids],
    () => commonService.getProductTypes(sub_category_ids),
    {
      staleTime: Infinity,
      retry: false,
      enabled: sub_category_ids !== undefined && sub_category_ids?.length > 0,
    }
  );
  return {
    categoryList,
    isCategoryLoaded,
    categoryError,
    subCategoryList: subCategoryData?.sub_cat,
    isSubCatLoaded,
    isSubCatFetching,
    subCatError,
    pTList,
    isPTSuccess,
    isPTFetching,
    pTError,
  };
};
