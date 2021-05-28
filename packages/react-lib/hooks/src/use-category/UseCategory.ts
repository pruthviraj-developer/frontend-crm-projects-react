import { useQuery } from 'react-query';
import { reorderService } from '@hs/services';
import { IProductTypes, ISubCategory, IUseCategoryProps } from './IUseCategory';

export const useCategory = ({
  category_id,
  sub_category_ids,
}: IUseCategoryProps) => {
  const {
    data: subCategoryList,
    isSuccess: isSubCatLoaded,
    isFetching: isSubCatFetching,
    error: subCatError,
  } = useQuery<ISubCategory, Record<string, string>>(
    ['subCategories', category_id],
    () => reorderService.getSubCategories({ ids: category_id }),
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
    () => reorderService.getProductTypes({ ids: sub_category_ids }),
    {
      staleTime: Infinity,
      retry: false,
      enabled: sub_category_ids !== undefined && sub_category_ids?.length > 0,
    }
  );
  return {
    subCategoryList,
    isSubCatLoaded,
    isSubCatFetching,
    subCatError,
    pTList,
    isPTSuccess,
    isPTFetching,
    pTError,
  };
};
