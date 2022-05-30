import React,{useEffect} from "react";
import { DashboardContentWrapper,DashboardListWrapper,EmptyDashboardErrorMessage,PaginationWrapper } from './StyledMipDashboard';
import { LeftNavBar, LeftNavBarProps } from "@hs-crm/components";
import { DashBoardIcon } from "@hs/icons";
import { useQuery } from "react-query";
import { MIPDashboardProps,urlParamsProps } from "./IMIPDashboard";
import { merchIntelligenceService } from "@hs/services";
import { MipListCard,Loader } from "@hs-crm/components";
// import { TablePagination } from "@material-ui/core";
import {Pagination,PaginationProps} from '@mui/material';
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
    let currentPageNum = urlParams?.page ? (parseInt(urlParams?.page) - 1) : 0;
    const [currentPage, setCurrentPage] = useState(currentPageNum);

    useEffect(()=>{
        setCurrentPage(currentPageNum)
    },[currentPageNum])

    const { data: response,isFetching } = useQuery<MIPDashboardProps>(
        ['mskuListData',currentPage],
        ({ pageParam = currentPage }) => {
            let apiParams = {
                page : pageParam,
                size : pageSize,
                action : 'merchPlatformDashboardV2'
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

    let mskuListArray = response?.data?.mskuList ? response.data.mskuList : [];
    let totalProductCount = response?.data?.totalRecords ? response.data.totalRecords : 0;
    let pageCount = totalProductCount ? Math.ceil(totalProductCount/pageSize) : 0;
    let paginationOptions:PaginationProps = {
        count : pageCount,
        page: currentPage + 1,
        onChange: onPageChanges,
        color : 'primary'
    }
    return(
        <>
            {isFetching && (<Loader></Loader>)}
            <LeftNavBar {...navItems}></LeftNavBar>
            <DashboardContentWrapper>
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
            
        </> 
    )
}

export default MIPDashboard;