import React, { FC } from 'react';
import { IRecommendedMatchingProps } from './IRecommendedMatching';
import {
  RecommendedMatchingWrapper,
  AnchorLinkTag,
} from './StyledRecommendedMatching';
import Link from 'next/link';
import { ChevronRight, SvgIcon } from '@hs/icons';

export const RecommendedMatching: FC<IRecommendedMatchingProps> = ({
  section,
  product,
}: IRecommendedMatchingProps) => {
  let subSection = 'More';
  const brand = 'Brand',
    category = 'Category',
    colour = 'Colour';
  if (product.searchParams && product.searchParams.brandId) {
    subSection += brand;
  }
  if (product.searchParams && product.searchParams.colour) {
    subSection += colour;
  }
  if (product.searchParams && product.searchParams.subCategorys) {
    subSection += category;
  }
  product.type = subSection;
  const queryParamsList = {
    filterQuery: product.searchParams.filterQuery,
    brandIds: product.searchParams.brandId,
    subCategorys: product.searchParams.subCategorys,
    colour: product.searchParams.colour,
    searchBy: product.name,
  };
  // const queryParams = angular.toJson(queryParamsList);
  const params = JSON.stringify(queryParamsList);
  const paramsList = {
    q: params,
    resetFunnel: false,
    hsubSection: product.type,
    hsection: section,
    section: section,
    subsection: product.type,
    // funnel: vm._PageTrackingService.getFunnel(),
    // funnel_tile: vm._PageTrackingService.getFunnelTile(),
    // funnel_section: vm._PageTrackingService.getFunnelSection(),
    // from_screen: vm._$state.current.name,
    from_section: 'RFY products',
    recoType: product.recoType,
    screenName: product.screenName,
  };
  return (
    <RecommendedMatchingWrapper>
      <Link
        href={{
          pathname: '/search',
          query: { ...paramsList },
        }}
        passHref
      >
        <AnchorLinkTag>
          {product.name}
          <SvgIcon icon={ChevronRight}></SvgIcon>
        </AnchorLinkTag>
      </Link>
    </RecommendedMatchingWrapper>
  );
};
// section="'RFYP'"
// showmatching="true"
// recommended="vm.similarProducts"
// id="similarproducts"
// pid="vm.productDetail.id"
