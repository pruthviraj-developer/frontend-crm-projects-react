import React, { FC } from 'react';
import {
  ViewMoreWrpper,
  ViewMoreButton,
  ViewMoreText,
  LoaderMask,
  Loading,
  Mask,
} from './StyledViewMore';
import { IViewMoreProps } from './IViewMore';
export const ViewMore: FC<IViewMoreProps> = ({
  loadingMore,
  viewMore,
  remainingProductCount,
}: IViewMoreProps) => {
  return (
    <ViewMoreWrpper>
      <ViewMoreButton
        loading={loadingMore}
        onClick={loadingMore ? undefined : viewMore}
      >
        <ViewMoreText loading={loadingMore}>
          View {remainingProductCount} more products
        </ViewMoreText>
        {loadingMore ? (
          <Loading>
            <LoaderMask>
              <Mask />
            </LoaderMask>
          </Loading>
        ) : (
          <></>
        )}
      </ViewMoreButton>
    </ViewMoreWrpper>
  );
};
