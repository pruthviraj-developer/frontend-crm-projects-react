import React from 'react';
import Link from 'next/link';
import Tile from '../tile/Tile';
import { useState, useEffect, useContext } from 'react';
import ListItem from '../list-Item/ListItem';
import { commonWebService, productListService } from '@hs/services';
import { IProductListPage } from '../IProductListPage';
import {
  Filters,
  Discount,
  PlpHeader,
  SmartFilters,
  GoToTopDesktop,
  SearchAndSortDetails,
} from '@hs/components';
import {
  Wrapper,
  ProductsList,
  ProductListWrapper,
  ProductListContainer,
} from './StyledProductList';
import {
  TrackingDataContext,
  UserInfoContext,
  ISegmentProperties,
} from '@hs/framework';

export const ProductListDesktop = ({
  filters,
  records,
  pageTitle,
  messageBar,
  screenName,
  sortBarTitle,
  isComingSoon,
  updateFilter,
  totalRecords,
  clearFilters,
  filterSection,
  sortingOptions,
  addSmartFilter,
  productListName,
  disableAddToCart,
  addToCartFromPlp,
  removeSmartFilter,
  openSizeChartPopup,
  updateSortParameters,
  trackSizeSelectEvent,
}: IProductListPage) => {
  const { userInfo } = useContext(UserInfoContext);
  const { properties: trackingProperties } = useContext(TrackingDataContext);
  const [showPromo, setShowPromo] = useState<boolean>(false);
  useEffect(() => {
    setShowPromo(commonWebService.showPromoOnPlp());
  }, [userInfo]);

  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (trackingProperties) {
      let url = '';
      const {
        resetFunnel,
        funnel,
        funnel_section,
        funnel_tile,
        plp,
        section,
        subsection,
      } = trackingProperties as ISegmentProperties;
      if (funnel) {
        url = `funnel=${funnel}&funnel_tile=${funnel_tile}&funnel_section=${funnel_section}`;
        if (resetFunnel) {
          url += `&resetFunnel=${resetFunnel}`;
        }
        if (section) {
          url += `&section=${section}&subsection=${subsection}`;
        }
        url += `&plp=${plp}&from_screen=products`;
        setUrl(url);
      }
    }
  }, [trackingProperties]);

  // const getProductUrl = (productData: Record<string, string>) => {
  //   const baseUrl = productListService.getProudctUrl(productData, isComingSoon);
  //   return baseUrl.indexOf('?') > -1 ? baseUrl + url : baseUrl + '?' + url;
  // };
  return (
    <Wrapper>
      {pageTitle && <PlpHeader {...{ pageTitle }} />}
      <ProductListWrapper>
        <Filters
          {...{
            updateFilter,
            clearFilters,
            filterSection,
          }}
        />
        <ProductListContainer>
          {showPromo ? <Discount {...{ ...messageBar }} /> : <></>}
          <SmartFilters
            {...{
              filters,
              addSmartFilter,
              productListName,
              removeSmartFilter,
            }}
          />
          <SearchAndSortDetails
            {...{
              screenName,
              totalRecords,
              sortingOptions,
              title: sortBarTitle,
              updateSortParameters,
            }}
          />
          {records ? (
            <ProductsList>
              {records.map((productData, index: number) => {
                return (
                  <Link
                    key={index}
                    href={{
                      pathname: productListService.getProudctUrl(
                        productData as unknown as Record<string, string>,
                        isComingSoon
                      ),
                      query: url,
                    }}
                    passHref
                  >
                    {productData.isTile ? (
                      <Tile key={index} {...{ productData }} />
                    ) : (
                      <ListItem
                        key={index}
                        {...{
                          productData,
                          isComingSoon,
                          disableAddToCart,
                          addToCartFromPlp,
                          openSizeChartPopup,
                          trackSizeSelectEvent,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </ProductsList>
          ) : (
            <></>
          )}
        </ProductListContainer>
        <GoToTopDesktop />
      </ProductListWrapper>
    </Wrapper>
  );
};
