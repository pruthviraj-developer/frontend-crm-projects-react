import React, { FC } from 'react';
import { RecommendedMatching } from '../recommended-matching';
import {
  IRecommendedProductsProps,
  IRecommendMatchingDetailListEntity,
} from './IRecommendedProducts';
import {
  RecommendedProductsWrapper,
  RecommendedProductsTitle,
  RecommendedMatchingWrapper,
} from './StyledRecommendedProducts';
export const RecommendedProducts: FC<IRecommendedProductsProps> = ({
  section,
  showmatching,
  recommended,
  id,
  pid,
}: IRecommendedProductsProps) => {
  console.log(id);
  console.log(pid);
  return (
    <RecommendedProductsWrapper>
      <RecommendedProductsTitle>{recommended.title}</RecommendedProductsTitle>
      {showmatching && recommended.matching && recommended.matching.length && (
        <RecommendedMatchingWrapper>
          {recommended.matching.map(
            (data: IRecommendMatchingDetailListEntity, index: number) => (
              <RecommendedMatching
                product={data}
                section={section}
                key={index}
              ></RecommendedMatching>
            )
          )}
        </RecommendedMatchingWrapper>
      )}
    </RecommendedProductsWrapper>
  );
};
// section="'RFYP'"
// showmatching="true"
// recommended="vm.similarProducts"
// id="similarproducts"
// pid="vm.productDetail.id"

//<div class="recommended-matching-product">
//    <a ui-sref="search( {q: vm.queryParams, resetFunnel: false, hsubSection: vm.product.type, hsection: vm.section, funnel: vm._PageTrackingService.getFunnel(), funnel_tile: vm._PageTrackingService.getFunnelTile(), funnel_section: vm._PageTrackingService.getFunnelSection(), section: vm.section, subsection: vm.product.type, from_screen: vm._$state.current.name, from_section: 'RFY products', recoType: vm.product.recoType, screenName : vm.product.screenName} )"
//   ng-bind="::vm.product.name"></a>
// </div>
