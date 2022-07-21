import React,{useEffect} from "react";
import { DashboardContentWrapper,DashboardListWrapper,EmptyDashboardErrorMessage,FilterWrapper,PaginationWrapper,DashboardContentWrapperMain,DashboardCountList } from './StyledMipDashboard';
import { LeftNavBar, LeftNavBarProps } from "@hs-crm/components";
import { DashBoardIcon } from "@hs/icons";
import { useQuery } from "react-query";
import { MIPDashboardProps,urlParamsProps } from "./IMIPDashboard";
import { merchIntelligenceService } from "@hs/services";
import { MipListCard,Loader } from "@hs-crm/components";
// import { TablePagination } from "@material-ui/core";
import {Pagination,PaginationProps} from '@mui/material';
import { Filters,IFilterSectionProps } from "@hs-crm/components";
import { useState } from "react";
import { useHistory, useParams } from "react-router";

const pageSize = 20;


const navItems: LeftNavBarProps = {
    navList: [
        { linkUrl: '/', linkText: 'Dashboard', icon: DashBoardIcon }
    ],
};


const MIPDashboard = () =>{
    let urlParams:urlParamsProps = useParams();
    let history = useHistory();
    const [filterParamsState,setFilterParams] = useState<{[key:string] : string }>({});
    let currentPageNum = urlParams?.page ? (parseInt(urlParams?.page) - 1) : 0;
    const [currentPage, setCurrentPage] = useState(currentPageNum);

    useEffect(()=>{
        setCurrentPage(currentPageNum)
    },[currentPageNum])

    const { data: response,isFetching } = useQuery<MIPDashboardProps>(
        ['mskuListData',currentPage, filterParamsState],
        ({ pageParam = currentPage }) => {
            let apiParams = {
                page : pageParam,
                size : pageSize,
                action : 'merchPlatformDashboardV2',
                ...filterParamsState,
                filter: Object.keys(filterParamsState).length ? true : false
            }
            return(merchIntelligenceService.getMSKUList(apiParams))
        },
        {
            cacheTime: Infinity,
            keepPreviousData: true,
            refetchIntervalInBackground: false,
            refetchOnReconnect:false,
            refetchOnWindowFocus:false,
        }
      );

    function onPageChanges(event:any,page:number){
        history.push(`/dashboard/${page}`)
    }

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

    let mskuListArray = response?.data?.mskuList ? response.data.mskuList : [];
    let totalProductCount = response?.data?.totalRecords ? response.data.totalRecords : 0;
    let pageCount = totalProductCount ? Math.ceil(totalProductCount/pageSize) : 0;
    let paginationOptions:PaginationProps = {
        count : pageCount,
        page: currentPage + 1,
        onChange: onPageChanges,
        color : 'primary'
    }
    let pFilterDataProps = response?.data?.pFilters ? response.data.pFilters : null;
    let filterDataJson = {
        clearFilters: clearFilter,
        updateFilter,
        filterSection: pFilterDataProps?.filterSection as unknown as IFilterSectionProps[]
    }

    return(
        <>
            {isFetching && (<Loader></Loader>)}
            <LeftNavBar {...navItems}></LeftNavBar>
            <DashboardContentWrapperMain>
                    {pFilterDataProps?.filterSection?.length ? (
                        <FilterWrapper>
                            <Filters {...filterDataJson}></Filters>
                        </FilterWrapper>
                    ) : ''}
                <DashboardContentWrapper>
                    {totalProductCount && totalProductCount > 0 ? (<DashboardCountList>Showing {totalProductCount} Result{totalProductCount > 1 ? 's' : ''}</DashboardCountList>) : ''}
                    <DashboardListWrapper>
                    {mskuListArray.length ? (
                        mskuListArray.map((item,index)=>{
                            return(
                                <MipListCard key={`listCard${index}`} {...item} reviewUrl={`/msku-listing/${item?.mskuId}`}></MipListCard>
                            )
                        })
                    ) : (!isFetching) ?(
                        <EmptyDashboardErrorMessage>
                            No Data Found
                        </EmptyDashboardErrorMessage>
                    ) : '' }
                    </DashboardListWrapper>
                    {pageCount > 0 && 
                    (
                    <PaginationWrapper >
                        <Pagination {...paginationOptions} />
                    </PaginationWrapper>
                        
                    )}
                </DashboardContentWrapper>
            </DashboardContentWrapperMain>
            
            
        </> 
    )
}

export default MIPDashboard;