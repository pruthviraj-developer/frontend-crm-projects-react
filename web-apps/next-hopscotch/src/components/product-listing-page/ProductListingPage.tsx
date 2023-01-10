import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { Loader, ViewMore, ProductsHead, ClearFilters, SeoHtmlFooterDesktop } from '@hs/components';
import { useRouter } from 'next/router';
import { ICartAPIResponse, IProductListingProps } from '@/types';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useModal } from 'react-hooks-use-modal';
import { ProductListDesktop } from '@hs/containers';
import * as segment from '@/components/segment-analytic';
import * as gtm from '@/components/google-tag-manager/GTMLib';
import React, { useState, useContext, useEffect } from 'react';
import { productListService, cookiesService, commonWebService, productDetailsService } from '@hs/services';
import { CartLink, CartNotification, CartNotificationDetails, CartHeader, CartMessage, CartLinkText } from '@/styles';

import {
  LOCAL_DATA,
  COOKIE_DATA,
  UserInfoContext,
  CartItemQtyContext,
  TrackingDataContext,
  getProductTrackingData,
  useSort,
  useSegment,
  useIsComingSoon,
  useSmartFilters,
  useReadLocalStorage,
  useSelectedPlpFiltersList,
  IPlpRecordProps,
  IPlpFilter1Props,
  IPlpFilter2Props,
  ISegmentProperties,
  IProductListingData,
  IPlpSeoDataProps,
  IFilterSectionProps,
  IUseProductListProps,
  ISimpleSkusEntityProps,
  IProductListSmartFilterTile,
  IPlpSortingOptionsEntityProps,
  IProductListAppliedSmartFilters,
} from '@hs/framework';

import { useRef } from 'react';
// import { apiResponse } from '@/api-response';
// import { apiTileResponse } from '@/api-tile-response';

const tryLater = 'Try Later';

export const ProductListingPage = ({
  url,
  isMobile,
  totalPages,
  queryParams,
  productListId,
  productListName,
  funnelAndSectionParams,
}: IProductListingProps) => {
  const lazyLoadProductsRef = useRef(null);
  const [{ contextData }] = useSegment();
  const { userInfo } = useContext(UserInfoContext);
  const { updateCartItemQty } = useContext(CartItemQtyContext);
  const [records, setRecords] = useState<IPlpRecordProps[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [productData, setProductData] = useState<IPlpRecordProps>();
  const readFunnelFromLocalStorage: any = useReadLocalStorage(['funnel']);
  const [disableAddToCart, setDisableAddToCart] = useState<boolean>(false);
  const { properties: trackingProperties } = useContext(TrackingDataContext);
  const [totalPage, setTotalPage] = useState<number>(totalPages);
  const [remainingProductCount, setRemainingProductCount] = useState<number>(0);
  const [plpTrackingVarialbes, setPlpTrackingVarialbes] = useState<Record<string, number | boolean>>();
  const [seoHtmlData, setSeoHtmlData] = useState<string>('');
  const [hasLoadedFirstTime, setHasLoadedFirstTime] = useState<boolean>(true);
  const [isLazyLoading, setIsLazyLoading] = useState<boolean>(true);
  const prevValue = useRef<{ trackingProperties: any; productListData: IProductListingData | undefined }>({
    trackingProperties,
    productListData: undefined,
  }).current;
  const [SizeChartPopupModal, openSizeChartPopupModel, closeSizeChartPopup, isSizeChartPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (isSizeChartPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSizeChartPopupOpen]);

  useEffect(() => {
    //add eventlistener to window
    const handleScroll = () => {
      if (window.scrollY) {
        setScrollY(window.scrollY);
      }
    };

    if (!hasScrolled) {
      onScrollStop(() => handleScroll());
    }
  }, []);

  useEffect(() => {
    if (hasScrolled) {
      const elemsWithIds = document.querySelectorAll('.productItem');
      let inViewFilterArray: Array<any> = [];
      const observer = new IntersectionObserver((elems) => {
        elems.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            inViewFilterArray.push(target.getAttribute('id'));
          }
          observer.disconnect();
        });
      });

      setTimeout(() => {
        getPlpScrolledProps(inViewFilterArray, (data) => {
          trackEvents(segment.PLP_TRACKING_EVENTS.PLP_SCROLLED, data);
        });
      }, 500);

      elemsWithIds.forEach((elem) => observer.observe(elem));
    }
  }, [hasScrolled]);

  useEffect(() => {
    if (!hasScrolled && scrollY) {
      setHasScrolled(true);
    }
  }, [scrollY]);

  const getPlpScrolledProps = (inViewProductArray: Array<any>, cb: (data: any) => void) => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let productsPerRow = screenWidth > 1023 ? 3 : 2;
    let productList = productListData?.pages[0].records;
    let brandArr: Array<any> = [];
    let categoryArr: Array<any> = [];
    let subCatArr: Array<any> = [];
    let prodIdArr: Array<any> = [];
    let prodTypeArr: Array<any> = [];

    let plpScrolledAttribute = {
      products_per_row: productsPerRow,
      screen_height: screenHeight,
      scrolled_height: scrollY,
      scrolled_row: 0,
      universal: '',
    };
    inViewProductArray.forEach((item, productIndex) => {
      let filteredProduct = productList?.find((product: any, index: number) => {
        if (product.isTile) {
          plpScrolledAttribute.universal = 'CPT' + product.id;
        }
        if (product.id == item) {
          plpScrolledAttribute.scrolled_row = Math.ceil((index + 1) / productsPerRow);
          return product;
        }
      });
      if (filteredProduct) {
        let subCategory = filteredProduct.subCategoryName;
        let category = filteredProduct.categoryName;
        let brand = filteredProduct.brandName;
        let productId = filteredProduct.id;
        let productType = filteredProduct.productTypeName;
        if (subCategory && !subCatArr.includes(subCategory)) {
          subCatArr.push(subCategory);
        }
        if (category && !categoryArr.includes(subCategory)) {
          categoryArr.push(category);
        }
        if (brand && !brandArr.includes(brand)) {
          brandArr.push(brand);
        }
        if (productId && !prodIdArr.includes(productId)) {
          prodIdArr.push(String(productId));
        }
        if (productType && !prodTypeArr.includes(productType)) {
          prodTypeArr.push(productType);
        }
      }

      if (productIndex + 1 === inViewProductArray.length) {
        let dynamicData = {
          brand: [...brandArr],
          category: [...categoryArr],
          product_id: [...prodIdArr],
          product_type: [...prodTypeArr],
          subcategory: [...subCatArr],
        };
        let finalObject = Object.assign({}, plpScrolledAttribute, dynamicData);
        cb(finalObject);
      }
    });
  };

  const onScrollStop = (callback: () => void) => {
    let isScrolling: any;
    window.addEventListener(
      'scroll',
      (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback();
        }, 150);
      },
      false,
    );
  };

  const queryClient = useQueryClient();
  const SizeChartPopupComponentDesktop = dynamic(() => import('@/components/size-chart/desktop'), {
    ssr: false,
  });

  // const SizeChartPopupComponentMobile = dynamic(() => import('@/components/size-chart/mobile'), {
  //   ssr: false,
  // });

  const openSizeChartPopup = (productData: IPlpRecordProps, from_location?: string) => {
    setProductData(productData);
    const selectedSku = productData.simpleSkus[0];
    const { name, brand, gender, category, preorder, product_id, subcategory, product_type } = getProductTrackingData({
      productData,
      selectedSku,
    });
    let size = [],
      age = [];
    for (let i = 0; i < productData.simpleSkus.length; i++) {
      const sku = productData.simpleSkus[i] as unknown as Record<string, Record<string, unknown>>;
      size.push(sku.attributes.size);
      age.push(sku.fromAge + '-' + sku.toAge);
    }
    trackEvent(segment.PDP_TRACKING_EVENTS.SIZE_CHART_VIEWED, {
      name,
      brand,
      gender,
      category,
      preorder,
      product_id,
      subcategory,
      product_type,
      from_location,
      character: undefined,
      age: age.length ? age : null,
      size: size.length ? size : null,
    });
    setTimeout(() => {
      openSizeChartPopupModel();
    }, 0);
  };

  const router = useRouter();
  const { selectedFilters, setSelectedPlpFiltersList } = useSelectedPlpFiltersList(() => queryParams);
  const {
    data: productListData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<IProductListingData>(
    ['ProductList', productListId, selectedFilters],
    ({ pageParam = 1 }) =>
      productListService.getProductList<any, IProductListingData>({
        id: productListId,
        pageNo: pageParam,
        pageSize: 36,
        ...selectedFilters,
      }),
    {
      cacheTime: 100,
      keepPreviousData: true,
      getNextPageParam: (_lastpage, allPages) => {
        if (allPages.length < totalPage) return allPages.length + 1;
        else return undefined;
      },
    },
  );

  // const productListData: any = apiTileResponse;
  const { selectedSort, selectedSortOption } = useSort(productListData as unknown as IUseProductListProps);
  const { smartFilters } = useSmartFilters(productListData as unknown as IUseProductListProps);
  const { isComingSoon } = useIsComingSoon(productListData as unknown as IUseProductListProps);
  useEffect(() => {
    const filtersObject = Object.keys(selectedFilters).length;
    let queryParameters = '';
    let baseUrl = `/products/${productListId}`;
    if (productListName) {
      baseUrl += `/${productListName}`;
    }
    if (filtersObject) {
      queryParameters = `?q=${window.encodeURI(JSON.stringify(selectedFilters))}`;
    } else if (funnelAndSectionParams && Object.keys(funnelAndSectionParams).length) {
      const serialize = (obj: any) => {
        var str = [];
        for (var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
        return str.join('&');
      };
      queryParameters = `?${serialize(funnelAndSectionParams)}`;
    }
    router.push(`${baseUrl}${queryParameters}`, undefined, {
      shallow: true,
    });
  }, [selectedFilters, productListId, productListName]);

  useEffect(() => {
    if (productListData?.pages[0]?.plpSeoData?.robotIndex == 'index, follow') {
      fetchSeoData();
    }
  }, [productListData?.pages[0].plpSeoData.robotIndex]);

  function fetchSeoData() {
    let seoHtmlDataPromise = productListService.getSeoHtmlDescription<string | number, IPlpSeoDataProps>(productListId);
    seoHtmlDataPromise.then((data: any) => {
      if (data?.description) {
        setSeoHtmlData(data.description);
      }
    });
  }

  useEffect(() => {
    if (productListData?.pages) {
      const data = productListData.pages[productListData.pages.length - 1];
      let totalRecords = data.totalRecords;
      const totalPageCount = totalRecords / data.pageSize;
      const remainingProductCount =
        data.totalRecords - data.pageNo * (data.totalRecords > data.pageSize ? data.pageSize : data.totalRecords);
      setLoadingMore(false);
      setRemainingProductCount(remainingProductCount);
      setTotalPage(totalPageCount);
      const recordsList: IPlpRecordProps[] = [];
      for (let index = 0; index < data.records.length; index++) {
        recordsList.push({
          ...data.records[index],
          position: data.pageSize * (data.pageNo - 1) + index + 1,
        });
      }
      setRecords([...records, ...data.records]);
      // setSeoData({
      //   ...data,
      //   plpSeoData: {
      //     plpId: 15936,
      //     title: 'Girls Frocks | Buy Frocks for Girls Online in India',
      //     canonicalUrl: 'https://www.hopscotch.in/products/15936/girls-frocks',
      //     robotIndex: 'index, follow',
      //     urlLabel: 'girls-frocks',
      //     h1Tag: 'Girls Frocks',
      //   },
      // });
      setTimeout(() => {
        const getProductsForGTM = (products: IPlpRecordProps[]) => {
          const productsFromGtm: Array<Record<string, unknown>> = [];
          const listPageType = isComingSoon ? 'Coming Soon PLP' : 'Search PLP';
          products.forEach((product) => {
            productsFromGtm.push({
              name: product.name,
              brand: product.brandName,
              id: product.id,
              price: product.retailPrice,
              category: product.categoryId,
              list: listPageType,
              position: product.position,
            });
          });
          return productsFromGtm;
        };
        gtm.trackEvent({
          event: 'productsImpression',
          data: {
            ecommerce: {
              params: { id: productListId, pageNo: data.pageNo, pageSize: data.pageSize },
              impressions: getProductsForGTM(recordsList),
            },
          },
        });
      }, 0);
    }
  }, [productListData]);

  const getExperiments = () => {
    const EXPERIMENTS = commonWebService.getExperimentInfoClient() || [];
    EXPERIMENTS.push('guest');
    if (contextData?.traits?.experiments) {
      EXPERIMENTS.push(...contextData.traits.experiments);
    }
    return EXPERIMENTS;
  };

  const trackEvents = (evtName: string, additionalProperties?: Record<string, unknown>) => {
    const data = productListData?.pages[productListData.pages.length - 1];
    const {
      from_screen,
      funnel,
      funnel_section,
      funnel_tile,
      plp,
      section,
      sort_by,
      sortbar,
      sortbar_group,
      source,
      subsection,
    } = trackingProperties as ISegmentProperties;
    // if (data.promoPLPSegmentEvents) {
    //   promoProperties = {
    //     merch_promo: 'Yes',
    //     promo_code: data.promoPLPSegmentEvents.promotionCode,
    //   };
    // }
    segment.trackEvent({
      evtName,
      properties: {
        plp,
        funnel,
        funnel_tile,
        funnel_section,
        source,
        sortbar,
        sort_by,
        section,
        subsection,
        from_screen,
        sortbar_group,
        universal: undefined,
        track: getExperiments(),
        plp_type: 'Product listing',
        feed_size: data?.totalRecords,
        product_listing_id: productListId,
        product_listing_name: data?.screenName,
        sort_order: selectedSortOption.eventSortName,
        add_from_details: `funnel=${readFunnelFromLocalStorage.get('funnel') || 'DIRECT'}`,
        //   ...promoProperties,
        ...additionalProperties,
      },
      contextData,
    });
  };

  useEffect(() => {
    if (
      prevValue.productListData !== productListData &&
      prevValue.trackingProperties !== trackingProperties &&
      contextData?.traits &&
      contextData.traits?.hs_device_id !== '' &&
      userInfo &&
      hasLoadedFirstTime
    ) {
      trackEvents(segment.PLP_TRACKING_EVENTS.PRODUCT_LISTING_VIEWED);
      setHasLoadedFirstTime(false);
    }
    return () => {
      prevValue.productListData = undefined;
    };
  }, [contextData, productListData, trackingProperties, prevValue, userInfo]);

  // useEffect(() => {
  //   if (contextData?.traits && contextData.traits?.hs_device_id !== '' && userInfo) {
  //     segment.identify(userInfo, contextData);
  //   }
  // }, [contextData, userInfo]);

  const updateSelectedPlpFiltersList = (
    selectedPlpFilters: Record<string, string | number | boolean | undefined>,
    additionalFilters: Record<string, string | number | boolean | undefined>,
    key?: string,
    data?: IPlpFilter1Props | IPlpFilter2Props,
    isMultiSelect?: boolean,
    type?: string,
  ) => {
    const additionalFiltersList: Record<string, string | number | boolean | undefined> = {
      ...additionalFilters,
      isCategoryPreselected: undefined,
    };
    const extraQueryParam = productListData?.pages[0].extraQueryParam;
    if (extraQueryParam && extraQueryParam.isCategoryPreselected) {
      additionalFiltersList.isCategoryPreselected = true;
    }
    setRecords([]);
    setSelectedPlpFiltersList(selectedPlpFilters, additionalFiltersList, key, data, isMultiSelect, type);
  };

  const trackEvent = (evtName: string, segmentData: Record<string, unknown>) => {
    segment.trackEvent({
      evtName,
      properties: {
        ...trackingProperties,
        ...segmentData,
        universal: undefined,
        track: getExperiments(),
        add_from: 'current=' + location.pathname,
      },
      contextData,
    });
  };

  const trackFiltersApplied = (
    evtName: string,
    appliedFiltersList: IPlpFilter2Props[] | IFilterSectionProps[] = [],
  ) => {
    let segmentData: Record<string, string | string[] | number> = {
      product_type_filter: '',
      non_preorder_filter: '',
    };
    const data = productListData?.pages[productListData.pages.length - 1];
    const filterSection: Array<string> = appliedFiltersList.map((item: any) => item.sectionTracking);
    const getNames = (type: string) => {
      let filteredByType: string[] = [];
      appliedFiltersList.map((item) => {
        if (item.key === type) {
          // @ts-ignore: Unreachable code error
          filteredByType.push(item.selectedFilterName);
        } else if (item.param === type) {
          filteredByType.push(item.name);
        }
      });
      return filteredByType.length ? filteredByType : null;
    };
    const browse = getNames('browse');
    if (browse) {
      segmentData.department_filter = browse;
    }
    const age = getNames('age');
    if (age) {
      segmentData.age_filter = age;
    }
    const category = getNames('category');
    if (category) {
      segmentData.category_filter = category;
    }
    const subCategory = getNames('subCategory');
    if (subCategory) {
      segmentData.subcategory_filter = subCategory;
    }
    const price = getNames('price');
    if (price) {
      segmentData.price_filter = price;
    }
    const size = getNames('size');
    if (size) {
      segmentData.size_filter = size;
    }
    if (filterSection.length) {
      segmentData['filter_section'] = filterSection;
      segmentData.filter_section_count = filterSection.length;
    }

    segmentData.plp_type = 'Product listing';
    segmentData.feed_size = data?.totalRecords ? data?.totalRecords : '';
    segmentData.product_listing_name = data?.screenName ? data?.screenName : '';
    trackEvent(evtName, segmentData);
  };

  const trackSortApplied = (
    evtName: string,
    oldSort: string | number | undefined,
    newSort: string | number | undefined,
  ) => {
    let segmentData: Record<string, string | string[] | number> = {};
    const data = productListData?.pages[productListData.pages.length - 1];
    segmentData.from_sort = oldSort ? oldSort : '';
    segmentData.new_sort = newSort ? newSort : '';

    segmentData.plp_type = 'Product listing';
    segmentData.product_listing_name = data?.screenName ? data?.screenName : '';
    trackEvent(evtName, segmentData);
  };

  const updateFilter = (
    key: string,
    data: IPlpFilter1Props | IPlpFilter2Props,
    isMultiSelect: boolean,
    type?: string,
  ) => {
    let isFromRefineFilter;
    const productList = productListData?.pages[productListData.pages.length - 1];
    const filters = productList?.plpFilter.filterSection || [];
    let totalFilters = filters.map((filter: any) => {
      return filter.filterList[0].filter[0].param;
    });
    const selectedPlpFilters: Record<string, string> = router.query.q ? JSON.parse(router.query.q as string) : {};
    if (data.isSelected) {
      const keys = Object.keys(selectedPlpFilters);
      const filteredArray = totalFilters.filter((value: string) => keys.includes(value));
      if (filteredArray.length > 1) {
        isFromRefineFilter = true;
      } else {
        if (selectedPlpFilters && selectedPlpFilters[data.param]) {
          const values = selectedPlpFilters[data.param].split(',');
          if (values.length > 1) {
            isFromRefineFilter = true;
          }
        }
      }
    } else {
      isFromRefineFilter = true;
    }
    updateSelectedPlpFiltersList(
      { ...selectedPlpFilters, isFromRefineFilter, fromSmartFilter: undefined },
      selectedSort,
      key,
      data,
      isMultiSelect,
      type,
    );
    // For tracking applied events;
    const selectedFilters = (productList?.plpFilter.selectedFilters || []) as unknown as IPlpFilter2Props[];
    if (isMultiSelect) {
      const selectedFilterIndex = selectedFilters.findIndex((filter) => filter.key === data.param);
      if (selectedFilterIndex > -1) {
        let values = selectedFilters[selectedFilterIndex].selectedFilterName.split(',');
        const currentSelectedValueIndex: number = values.indexOf(data.name);
        if (currentSelectedValueIndex > -1) {
          values.splice(currentSelectedValueIndex, 1);
        } else {
          values.push(data.name);
        }
        if (values.length) {
          selectedFilters[selectedFilterIndex].selectedFilterName = values.join(',');
        } else {
          selectedFilters.splice(selectedFilterIndex, 1);
        }
      } else {
        selectedFilters.push(data as unknown as IPlpFilter2Props);
      }
    } else {
      const selectedFilterIndexByParam = selectedFilters.findIndex((filter) => filter.param === data.id);
      const selectedFilterIndexByKey = selectedFilters.findIndex((filter) => filter.key === data.param);
      const index = selectedFilterIndexByParam > -1 ? selectedFilterIndexByParam : selectedFilterIndexByKey;
      if (index > -1) {
        const selected = selectedFilters[index];
        if (selected.selectedFilterName === data.name) {
          selectedFilters.splice(index, 1);
        } else {
          selectedFilters[index] = data as unknown as IPlpFilter2Props;
        }
      } else {
        selectedFilters.push(data as unknown as IPlpFilter2Props);
      }
    }
    trackFiltersApplied(segment.PLP_TRACKING_EVENTS.FILTER_APPLIED, selectedFilters);
  };

  const updateSortFilters = (index: number, sortOption: IPlpSortingOptionsEntityProps) => {
    setRecords([]);
    if (selectedFilters.orderRule != sortOption.orderRule) {
      trackSortApplied(
        segment.PLP_TRACKING_EVENTS.SORTING_APPLIED,
        selectedSortOption?.eventSortName,
        sortOption?.eventSortName,
      );
      updateSelectedPlpFiltersList(selectedFilters, { orderRule: sortOption.orderRule }, 'update');
    } else {
      queryClient.invalidateQueries();
    }
  };

  const clearFilters = () => {
    const productList = productListData?.pages[productListData.pages.length - 1];
    const selectedFilters = (productList?.plpFilter.selectedFilters || []) as unknown as IPlpFilter2Props[];
    trackFiltersApplied(segment.PLP_TRACKING_EVENTS.FILTER_CLEARED, selectedFilters);
    if (selectedFilters && selectedFilters.length) {
      updateSelectedPlpFiltersList(
        { isFromRefineFilter: undefined, isCategoryPreselected: undefined },
        { ...selectedSort, ...smartFilters },
      );
    } else {
      queryClient.invalidateQueries();
    }
  };

  const clearAllFilters = () => {
    setRecords([]);
    setSelectedPlpFiltersList({}, {});
  };

  const addSmartFilter = (sectionType: string, data: IProductListSmartFilterTile) => {
    const value = data.filterValue || data.name;
    const filters: Record<string, string | boolean | number> = {
      smartFilterType: sectionType,
      smartFilterValue: value,
      smartFilterSequence: sectionType,
      smartFiltersApplied: 1,
      fromSmartFilter: true,
      [sectionType]: value,
    };
    if (smartFilters && smartFilters.smartFilterSequence) {
      filters['smartFilterSequence'] = `${smartFilters.smartFilterSequence}::${sectionType}`;
      const values = (smartFilters.smartFilterValue as string).split(',');
      const keys = (smartFilters.smartFilterSequence as string).split('::');
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        filters[element] = values[index];
      }
      filters['smartFilterValue'] = `${smartFilters.smartFilterValue},${value}`;
      filters['smartFilterType'] = `${smartFilters.smartFilterType},${sectionType}`;
      filters['smartFiltersApplied'] = values.length + 1;
    }
    updateSelectedPlpFiltersList(selectedFilters, filters, 'update');
    const productList = productListData?.pages[productListData.pages.length - 1];
    const segmentData = productListService.getSmartFiltersTrackingData({ sectionType, name: data.name }, productList);
    trackEvents(segment.PLP_TRACKING_EVENTS.SMART_FILTER_APPLIED, {
      ...segmentData,
      section: null,
      from_screen: undefined,
      product_listing_id: undefined,
      add_from_details: undefined,
    });
  };

  const removeSmartFilter = (data: IProductListAppliedSmartFilters) => {
    const filters: Record<string, string | boolean | number | undefined> = { ...smartFilters };
    const smartFilterType = (filters.smartFilterType as string).split(',');
    const smartFilterSequence = (filters.smartFilterSequence as string).split('::');
    const smartFilterValue = (filters.smartFilterValue as string).split(',');
    const key = data.sectionType;
    const smartFiltersLength = smartFilterSequence.length;
    if (smartFiltersLength > 1) {
      filters[key] = undefined;
      smartFilterSequence.splice(smartFilterSequence.indexOf(key), 1);
      smartFilterType.splice(smartFilterType.indexOf(key), 1);
      smartFilterValue.splice(smartFilterValue.indexOf(data.filterValue), 1);
      updateSelectedPlpFiltersList(
        {
          ...selectedFilters,
          ...filters,
          fromSmartFilter: true,
          smartFiltersApplied: smartFiltersLength - 1,
          smartFilterType: smartFilterType.join(','),
          smartFilterValue: smartFilterValue.join(','),
          smartFilterSequence: smartFilterSequence.join('::'),
        },
        selectedSort,
        'update',
      );
    } else {
      updateSelectedPlpFiltersList(
        {
          ...selectedFilters,
          fromSmartFilter: true,
          [key]: undefined,
          smartFilterType: undefined,
          smartFilterValue: undefined,
          smartFiltersApplied: undefined,
          smartFilterSequence: undefined,
        },
        selectedSort,
        'update',
      );
    }
  };

  const showErrorNotification = (message: string) => {
    toast.error(message, {
      hideProgressBar: true,
      closeButton: false,
      icon: false,
      autoClose: 2250,
      style: {
        backgroundColor: '#f44',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '16px',
      },
    });
  };

  const getToasterContent = (skuValue: ISimpleSkusEntityProps, productData: IPlpRecordProps) => {
    return (
      <>
        <CartNotification>
          <Link
            href={{
              pathname: isMobile ? '/v2/cart' : '/w/cart',
            }}
            passHref
          >
            <CartLink>
              <Image
                alt={`${productData?.name}`}
                width="70px"
                height="70px"
                max-width="100%"
                draggable={false}
                unoptimized
                src={productData?.smallImg as string}
              />
              <CartNotificationDetails>
                {!plpTrackingVarialbes?.isOneSize && (
                  <CartHeader>{`${skuValue?.attrs[0]?.name} : ${skuValue?.attrs[0]?.value}`}</CartHeader>
                )}
                <CartMessage>Added to your Cart!</CartMessage>
                <CartLinkText>View cart</CartLinkText>
              </CartNotificationDetails>
            </CartLink>
          </Link>
        </CartNotification>
      </>
    );
  };

  const addToCart = (sku: ISimpleSkusEntityProps, productData: IPlpRecordProps) => {
    const {
      funnel,
      funnel_tile,
      funnel_section,
      plp,
      source,
      section,
      sort_by: sortBy,
      sortbar: sortBar,
      subsection: subSection,
      sortbar_group: sortBarGroup,
    } = trackingProperties || {};
    (async () => {
      try {
        const atc_user = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
        const addToCartResponse: ICartAPIResponse = await productDetailsService.addItemToCart({
          addFrom: 'current=' + location.pathname,
          funnel,
          funnel_tile,
          addFromDetails: 'nextjs',
          funnel_section,
          plp,
          source,
          section,
          sortBy,
          sortBar,
          subSection,
          sortBarGroup,
          atc_user,
          sku: sku.skuId,
          quantity: 1,
        });
        setDisableAddToCart(false);
        if (addToCartResponse.action === LOCAL_DATA.SUCCESS) {
          updateCartItemQty(addToCartResponse.cartItemQty);
          toast(getToasterContent(sku, productData), {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: false,
            hideProgressBar: true,
            autoClose: 2250,
            toastId: 'cartQuantiyChangeToaster',
            bodyClassName: 'cartQuantiyChangeBodyToaster',
          });
          const {
            mrp,
            hbt,
            name,
            sale,
            price,
            brand,
            gender,
            season,
            colour,
            to_age,
            quantity,
            category,
            from_age,
            preorder,
            character,
            product_id,
            quick_shop,
            subcategory,
            product_type,
            delivery_days,
            delivery_date,
            add_from_details,
            discount_percentage,
          } = getProductTrackingProperties(productData, sku);
          trackEvent(segment.PDP_TRACKING_EVENTS.ADDED_TO_CART, {
            mrp,
            hbt,
            name,
            sale,
            price,
            brand,
            gender,
            season,
            colour,
            to_age,
            atc_user,
            quantity,
            category,
            from_age,
            preorder,
            character,
            product_id,
            quick_shop,
            subcategory,
            product_type,
            delivery_days,
            delivery_date,
            sku: sku.skuId,
            add_from_details,
            discount_percentage,
            size: sku.attributes.size,
            subtotal: sku.retailPrice * quantity,
          });

          gtm.trackEvent({
            event: gtm.ADD_TO_CART,
            data: {
              ecommerce: {
                currentCode: 'INR',
                add: {
                  products: [
                    {
                      id: Number(productData?.id),
                      name: productData?.name,
                      brand: productData?.brandName,
                      price: plpTrackingVarialbes?.retailPrice,
                      category: productData?.categoryId,
                      quantity: 1,
                    },
                  ],
                },
              },
              category: 'Cart',
              action: 'cart-change',
              label: 'add-item',
              productId: Number(productData?.id),
              productName: productData?.name,
              productCategory: productData?.categoryId,
              productPrice: plpTrackingVarialbes?.retailPrice,
              productSkuId: sku.skuId,
            },
          });
          return;
        }
      } catch (error: any) {
        const errorMessage = error ? error.message : tryLater;
        showErrorNotification(errorMessage);
      }
    })();
  };

  const addToCartFromPlp = (
    data: IPlpRecordProps,
    sku: ISimpleSkusEntityProps,
    retailPrice: number,
    isOneSize: boolean,
  ) => {
    setDisableAddToCart(true);
    setProductData({ ...data });
    setPlpTrackingVarialbes({ retailPrice, isOneSize });
    setTimeout(() => {
      addToCart(sku, data);
    }, 500);
  };

  const viewMore = () => {
    setLoadingMore(true);
    fetchNextPage();
  };

  const getProductTrackingProperties = (productData: IPlpRecordProps, selectedSku: ISimpleSkusEntityProps) => {
    const getProperties = () => {
      const {
        mrp,
        hbt,
        sale,
        name,
        price,
        brand,
        gender,
        colour,
        season,
        category,
        preorder,
        product_id,
        subcategory,
        product_type,
        discount_percentage,
      } = getProductTrackingData({ productData, selectedSku }) as unknown as Record<string, string | number>;
      return {
        mrp,
        hbt,
        sale,
        name,
        price,
        brand,
        gender,
        colour,
        season,
        category,
        preorder,
        product_id,
        subcategory,
        product_type,
        discount_percentage,
        to_age: selectedSku.toAge,
        from_age: selectedSku.fromAge,
      };
    };
    const additionalProperties = {
      quantity: 1,
      quick_shop: 'yes',
      delivery_date: selectedSku.deliveryDate,
      delivery_days: selectedSku.maxDeliveryDays,
      add_from_details: `funnel=${readFunnelFromLocalStorage.get('funnel') || 'DIRECT'}`,
      character: undefined,
    };
    return {
      ...getProperties(),
      ...additionalProperties,
    };
  };

  const trackSizeSelectEvent = (productData: IPlpRecordProps, selectedSku: ISimpleSkusEntityProps) => {
    trackEvent(segment.PLP_TRACKING_EVENTS.SIZE_CLICKED, {
      ...getProductTrackingProperties(productData, selectedSku),
    });
  };

  const getSeoData = (data: IProductListingData) => {
    const getTitle = (pageTitle?: string) => {
      let retPageTitle = '';
      if (pageTitle) {
        retPageTitle = pageTitle;
      } else if (data && data.plpSeoData && data.plpSeoData.title) {
        retPageTitle = data.plpSeoData.title;
      } else {
        retPageTitle = `Buy ${data.screenName} Online in India | Hopscotch`;
      }
      return retPageTitle;
    };

    const getDescription = (description?: string) => {
      let retDescription = '';
      if (description) {
        retDescription = description;
      } else if (data && data.plpSeoData && data.plpSeoData.metaDescription) {
        retDescription = data.plpSeoData.metaDescription;
      } else {
        retDescription = `Shopping Online for ${data.screenName} in india at best prices. &#x2714;15 Days Easy Returns, &#x2714;Cash on Delivery, &#x2714;Latest Designs, &#x2714;Pan india shipping.`;
      }
      return retDescription;
    };
    // page heading
    // const getHeadertag = (data: IProductListingData, heading?: string) => {
    //   let retHeader = '';
    //   if (heading) {
    //     retHeader = heading;
    //   } else if (data && data.plpSeoData && data.plpSeoData.h1Tag) {
    //     retHeader = data.plpSeoData.h1Tag;
    //   }
    //   return retHeader;
    // };

    const getRobotIndex = () => {
      let retSeoindex = '';
      if (data && data.plpSeoData && data.plpSeoData.robotIndex) {
        retSeoindex = data.plpSeoData.robotIndex;
      } else {
        retSeoindex = 'noindex';
      }
      return retSeoindex;
    };

    const getCanonicalUrl = () => {
      let retCanonical = '';
      if (data && data.plpSeoData && data.plpSeoData.canonicalUrl) {
        retCanonical = data.plpSeoData.canonicalUrl;
      }
      return retCanonical;
    };

    const getKeywords = () => {
      const keywordsList: Array<string> = [];
      const filters = data.smartFilter && data.smartFilter.smartFilterSections;
      if (filters && filters.length) {
        if (filters[0].smartFilterTiles && filters[0].smartFilterTiles) {
          filters[0].smartFilterTiles.forEach((keyword) => {
            keywordsList.push(keyword.name);
          });
        }
      }
      return keywordsList.length ? keywordsList : undefined;
    };
    const seoCanonicalUrl = getCanonicalUrl();
    return {
      keywords: getKeywords(),
      robotIndex: getRobotIndex(),
      canonicalUrl: seoCanonicalUrl ? seoCanonicalUrl : url,
      title: getTitle(queryParams.pageTitle),
      description: getDescription(queryParams.description),
      canonicalStatus: seoCanonicalUrl == '' ? false : true,
    };
  };
  const [showLoader, setShowLoader] = useState<boolean>(false);
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        setShowLoader(true);
        router.reload();
        return false;
      }
      return true;
    });
    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  useEffect(() => {
    window.addEventListener('popstate', function (event) {
      let currentUrl = window.location.pathname;
      if (!currentUrl.includes('products/')) {
        window.location.reload();
      }
    });
  }, []);

  const lazyLoadProductsRefOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };
  useEffect(() => {
    const fetchMoreProducts = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > 0.75) {
            if (isFetching === false && isLazyLoading) {
              setIsLazyLoading(false);
              viewMore();
            }
          }
        }
      });
    };
    let iObserver = new IntersectionObserver(fetchMoreProducts, lazyLoadProductsRefOptions);
    if (lazyLoadProductsRef && lazyLoadProductsRef.current)
      iObserver.observe(lazyLoadProductsRef.current as unknown as HTMLElement);
    return () => {
      if (lazyLoadProductsRef && lazyLoadProductsRef.current)
        iObserver.unobserve(lazyLoadProductsRef.current as unknown as HTMLElement);
    };
  }, [lazyLoadProductsRef, lazyLoadProductsRefOptions]);

  return (
    <>
      {showLoader && <Loader />}
      {isFetching && loadingMore === false && <Loader />}
      {productListData?.pages[0].records.length === 0 ? (
        <ClearFilters {...{ clearFilters: clearAllFilters }} />
      ) : (
        <>
          {productListData?.pages && (
            <>
              <ProductsHead
                {...{
                  ...getSeoData(productListData.pages[0]),
                }}
              ></ProductsHead>
              <ProductListDesktop
                {...{
                  records,
                  isComingSoon,
                  updateFilter,
                  clearFilters,
                  addSmartFilter,
                  productListName,
                  sortBarTitle: 'Sort by:',
                  addToCartFromPlp,
                  disableAddToCart,
                  removeSmartFilter,
                  openSizeChartPopup,
                  trackSizeSelectEvent,
                  updateSortParameters: updateSortFilters,
                  filters: productListData.pages[0].smartFilter,
                  screenName: productListData.pages[0].screenName,
                  messageBar: productListData.pages[0].messageBar,
                  totalRecords: productListData.pages[0].totalRecords,
                  pageTitle: productListData.pages[0].plpSeoData.h1Tag,
                  sortingOptions: productListData.pages[0].sortingOptions,
                  filterSection: productListData.pages[0].plpFilter.filterSection,
                }}
              />
            </>
          )}
          <SizeChartPopupModal>
            {isSizeChartPopupOpen && productData && (
              // (isMobile ? (
              //   <SizeChartPopupComponentMobile
              //     {...{
              //       id: productData.id,
              //       productName: productData.name,
              //       closeSizeChartPopup,
              //     }}
              //   />
              // ) : (
              //   <SizeChartPopupComponentDesktop
              //     {...{
              //       id: productData.id,
              //       productName: productData.name,
              //       closeSizeChartPopup,
              //     }}
              //   />
              // ))}

              <SizeChartPopupComponentDesktop
                {...{
                  id: productData.id,
                  productName: productData.name,
                  closeSizeChartPopup,
                }}
              />
            )}
          </SizeChartPopupModal>
          {hasNextPage ? (
            <div ref={loadingMore ? null : lazyLoadProductsRef}>
              <ViewMore {...{ remainingProductCount, loadingMore, viewMore }} />
            </div>
          ) : (
            <></>
          )}
          {seoHtmlData ? <SeoHtmlFooterDesktop description={seoHtmlData} /> : <></>}
        </>
      )}
    </>
  );
};

// {
//   messageType: 'OFFER_PLP_MESSAGE',
//   message:
//     'All Apparels & Footwear : Get An Extra 5% Off On  No Minimum Purchase testing hardcoded value',
//   messageUIType: 'MESSAGE_BAR',
//   messageDisplayTime: 'IMMEDIATE',
// } ||
