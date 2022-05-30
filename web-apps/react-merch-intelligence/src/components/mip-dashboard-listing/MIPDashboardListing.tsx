import React, { useEffect } from "react";
// import {MipListingProps} from "./IMIPDashboardListing";
import { LeftNavBar, LeftNavBarProps } from "@hs-crm/components";
import { useInfiniteQuery } from 'react-query';
import { DashBoardIcon } from "@hs/icons";
import { merchIntelligenceService } from "@hs/services";
import { MipListingProps,ProductList,urlParamsProps } from "./IMIPDashboardListing";
import { useState } from "react";
import { MIPProductListCard } from "@hs-crm/components";
import { MipMskuTable } from "@hs-crm/components";
import { Loader } from "@hs-crm/components";
import { Filters,IFilterSectionProps } from "@hs-crm/components";
import { useParams } from "react-router";
import { DashboardContentWrapper, MskuListingNameWrapper, EmptyDashboardErrorMessage, ViewMoreBtn, TotalCountWrapper,TableSectionWrapper,ProductListWrapper,FilterWrapper,DashboardListingWrapper} from './StyledMIPDashboardListing'


const pageSize = 72;


const navItems: LeftNavBarProps = {
    navList: [
        { linkUrl: '/dashboard', linkText: 'Dashboard', icon: DashBoardIcon },
    ],
};



const MIPDashboardListing = () => {
    let urlParams:urlParamsProps = useParams();
    const [totalPage, setTotalPage] = useState<number>(0);
    const [filterParamsState,setFilterParams] = useState<{[key:string] : string }>({});
    const [isLoadMoreEnable, setLoadMoreEnable] = useState(false)

    const {
        data: productData,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery<MipListingProps>(
        ['productListingMSKU',filterParamsState],
        ( {pageParam = 1} ) => {
            return merchIntelligenceService.getMSKUProductListing({ action: 'merchPlatformProductDetails',page: (pageParam - 1),mskuId :  urlParams.id, size : pageSize, ...filterParamsState});
        },
        {
            cacheTime: Infinity,
            keepPreviousData: true,
            refetchIntervalInBackground: false,
            refetchOnReconnect:false,
            refetchOnWindowFocus:false,
            getNextPageParam: (_lastpage, allPages) => {
                if (allPages.length < totalPage) return allPages.length + 1;
                else return undefined;
            },
        },
    );


    useEffect(() => {
        if (productData?.pages) {
            setLoadMoreEnable(false);
            const pagedata = productData.pages[productData.pages.length - 1];
            // const productListCount = pagedata?.data?.productList?.length;
            const totalPageCount = pagedata?.data?.totalRecords / pageSize;
            if (totalPage !== totalPageCount) setTotalPage(totalPageCount);
        }
    }, [productData,totalPage]);


    const viewMore = ($event:React.MouseEvent<HTMLElement>) => {
        $event.stopPropagation();
        setLoadMoreEnable(true);
        fetchNextPage();
    };

    const updateFilter = (filterItem: string,filterParams:any) => {
        let filterValue = filterParams?.name;
        if(filterParamsState[filterItem] === filterValue)
        {
            setFilterParams((filterJson) =>{
                delete filterJson[filterItem] 
                return({
                    ...filterJson,
                })
            })

        }
        else{
            setFilterParams((filterJson) =>{
                return({
                    ...filterJson,
                    [filterItem] : filterValue
                })
            })
        }

    }

    const clearFilter = () => {
        setFilterParams({});
    }

    const keepFunction = (productDetail:ProductList) => {
        let parmas = {
            "productIds": [productDetail?.productId],
            "decisionType": "KEEP"
        }

        return merchIntelligenceService.updateMskuProductStatus(parmas)
    }

    const cullFunction = (productDetail:ProductList) =>{
        let parmas = {
            "productIds": [productDetail?.productId],
            "decisionType": "CULL"
        }
        return merchIntelligenceService.updateMskuProductStatus(parmas)
    }


    let currentPagesCount = productData?.pages?.length ? (productData.pages.length - 1) : 0;
    let productDataProps = productData?.pages[currentPagesCount]?.data;
    let totalRecords = productDataProps?.totalRecords;
    let mskuTableDataProps = productDataProps?.mskuData ? productDataProps?.mskuData : null;
    let pFilterDataProps = productDataProps?.pFilters ? productDataProps?.pFilters : null;
    let filterDataJson = {
        clearFilters: clearFilter,
        updateFilter,
        filterSection: pFilterDataProps?.filterSection as unknown as IFilterSectionProps[]
    }
    let salesInventoryMixTableData = productDataProps?.salesMixAndInventoryMixes ? productDataProps.salesMixAndInventoryMixes : [];
    let salesInventoryMixTableMandatoryRowsCount = productDataProps?.mandatoryRows ? (salesInventoryMixTableData.length - productDataProps.mandatoryRows) : 0;

    return (
        <>
            {isFetching && (<Loader/>)}
            <LeftNavBar {...navItems}></LeftNavBar>

            
            <DashboardContentWrapper>

                {pFilterDataProps?.filterSection?.length ? (
                    <FilterWrapper>
                        <Filters {...filterDataJson}></Filters>
                    </FilterWrapper>
                ) : ''}
                <DashboardListingWrapper>
                   
                    {(productData?.pages?.length && (!isFetching || isLoadMoreEnable)) ? (
                        <>
                        {productDataProps?.dashboardText && <MskuListingNameWrapper>{productDataProps?.dashboardText}</MskuListingNameWrapper>}
                        <ProductListWrapper>
                            {mskuTableDataProps?.length &&
                                (
                                    <TableSectionWrapper>
                                        <MipMskuTable tableData={mskuTableDataProps}> </MipMskuTable>
                                        <MipMskuTable tableData={salesInventoryMixTableData} accordian={salesInventoryMixTableMandatoryRowsCount? true : false} accordianCount={salesInventoryMixTableMandatoryRowsCount}></MipMskuTable>
                                    </TableSectionWrapper>
                                )
                            }
                            <TotalCountWrapper>Showing {totalRecords ? totalRecords : 0} results</TotalCountWrapper>
                            {productData?.pages.map((productListArray, productListIndex) => {
                                return (
                                    productListArray?.data?.productList.map((productItem, index) => {
                                        return (<MIPProductListCard key={`mipProductList${index}`} {...productItem} keepFunctionDef={()=>keepFunction(productItem)} cullFunctionDef={()=>cullFunction(productItem)} ></MIPProductListCard>)
                                    })
                                )
                            })

                            }
                        </ProductListWrapper>
                        {hasNextPage && <ViewMoreBtn variant="contained" onClick={(event) => viewMore(event)}>Load More</ViewMoreBtn>}
                        </>
                    ) : (!productData?.pages?.length && !isFetching) ? (
                        <EmptyDashboardErrorMessage>No Data Found</EmptyDashboardErrorMessage>
                    ): ''}
                    
                </DashboardListingWrapper>
                
            </DashboardContentWrapper>


        </>
    )
}

export default MIPDashboardListing;