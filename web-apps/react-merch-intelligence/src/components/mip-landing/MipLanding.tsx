import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchBox from '../search-box/SearchBox';
import Typography from '@material-ui/core/Typography';
import { Filters, IFilterSectionProps, PstGender, Loader } from '@hs-crm/components';
import Pagination from '@material-ui/lab/Pagination';
import { useQuery } from 'react-query';
import { merchIntelligenceService } from '@hs/services';
import { IMipLanding } from './IMipLanding';
import { useStyles } from './StyledMipLanding';

const defaultPageFilters = { size: 10, page: 1 };

const MipLanding = () => {
  const classes = useStyles();
  const [filterParamsState, setFilterParams] = useState<{ [key: string]: string }>({});
  const [filterPage, setFilterPage] = useState<Record<string, number>>(defaultPageFilters);
  const [searchPid, setSearchPid] = useState('');

  const {
    data: dashboardData,
    isSuccess: isDashboardSuccess,
    isFetching,
  } = useQuery<IMipLanding>(
    ['mskuListData', filterParamsState, filterPage, searchPid],
    () => {
      let queryParams = {
        action: 'mipPstGenderCohorts',
        pstGenderType: !searchPid ? 'Validation Pending' : 'All',
        searchBy: searchPid || undefined,
        ...filterPage,
        ...filterParamsState,
      };
      return merchIntelligenceService.getPstGenderList(queryParams);
    },
    {
      cacheTime: Infinity,
      keepPreviousData: true,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleSearchChange = (value: string) => {
    setSearchPid(value);
    setFilterParams({});
  };

  const handleSelectedList = (list: any) => {
    setFilterPage({ ...filterPage, page: 1 });
    setFilterParams({ ...list });
  };

  const clearFilter = () => {
    setFilterParams({});
  };

  const nextPageFun = (e: any, page: any) => {
    console.log(e, page);
    setFilterPage({ ...filterPage, page: page });
    //setFilterParams({});
  };

  let pFilterDataProps = dashboardData?.data?.pFilters || null;
  let totalPstGenderCohorts = dashboardData?.data?.totalRecords || 0;
  let pageCount = totalPstGenderCohorts ? Math.ceil(totalPstGenderCohorts / filterPage.size) : 1;
  let paginationOptions = {
    page: filterPage.page,
    count: pageCount,
    onChange: nextPageFun,
  };

  let filterDataJson = {
    clearFilters: clearFilter,
    handleSelectedList,
    selectedList: pFilterDataProps?.selectedFilters,
    filterSection: pFilterDataProps?.filterSection as unknown as IFilterSectionProps[],
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" href="/intranet/welcome">
            <ArrowBackIcon fontSize="large" className={classes.arrowBackIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isFetching && <Loader />}
      {isDashboardSuccess && (
        <Grid container spacing={3} className={classes.mipLandingContainer}>
          <Paper className={classes.filterWrapper}>
            <Filters {...filterDataJson}></Filters>
          </Paper>
          <Grid item xs>
            <Grid container>
              <Grid item xs={6}>
                <Typography align="left" display="block" className={classes.totalRecords}>
                  Showing {dashboardData?.data?.totalRecords} results
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <SearchBox onInputChange={handleSearchChange} />
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.pstGenderContainer}>
              {dashboardData?.data?.pstGenderList.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} lg={4} sm={6}>
                    <PstGender {...item} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} className={classes.paginationWrapper}>
              <Paper className={classes.pagination}>
                <Pagination size={'large'} color="primary" {...paginationOptions} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
      {dashboardData?.message && <Paper className={classes.ErrorMessage}>{dashboardData?.message}</Paper>}
    </>
  );
};

export default MipLanding;
