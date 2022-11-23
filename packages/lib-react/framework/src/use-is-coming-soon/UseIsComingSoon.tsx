import { useMemo } from 'react';
import { timeService } from '@hs/services';
import { IUseProductListProps, IPlpSalePlanDetailProps } from '../types';
export const useIsComingSoon = (productListData: IUseProductListProps) => {
  const salePlanDetail: IPlpSalePlanDetailProps | undefined =
    productListData?.pages?.[0]?.salePlanDetail;
  const isComingSoon = useMemo(
    () =>
      salePlanDetail?.startDate
        ? new Date(salePlanDetail.startDate).getTime() >
          timeService.getCurrentTime()
          ? true
          : false
        : false,
    [salePlanDetail?.startDate]
  );
  return {
    isComingSoon,
  };
};
