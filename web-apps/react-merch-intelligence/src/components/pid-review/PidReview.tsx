import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Filters, IFilterSectionProps, MIPProductListCard, MipPidCard, Loader } from '@hs-crm/components';
import { merchIntelligenceService } from '@hs/services';
import { IPidReview, IuseParams } from './IPidReview';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Paper,
  Typography,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchBox from '../search-box/SearchBox';
import { MultiSelect } from './drop-down/MultiSelect';
import SortDropdown from './drop-down/SortDropdown';
import Avatar from '@material-ui/core/Avatar';
import { PidKeepCullTable, SalesMixAndInventoryTable } from './table';
import { useStyles } from './StyledPidReview';

const defaultPageFilters = { size: 10, page: 1 };

const PidReview = () => {
  const classes = useStyles();
  const urlParams: IuseParams = useParams();
  const [filterParamsState, setFilterParams] = useState<{ [key: string]: string }>({});
  const [searchPid, setSearchPid] = useState('');
  const [orderRule, setOrderRule] = useState('');
  const [msku, setMsku] = useState('');
  const [templateLoader, setTemplateLoader] = useState<boolean>(false);

  const {
    data: dashboardData,
    isSuccess: isDashboardSuccess,
    isFetching,
  } = useQuery<IPidReview>(
    ['pidReviewData', filterParamsState, searchPid, orderRule, msku],
    () => {
      let queryParams = {
        action: 'mipPstGenderProductDetails',
        pstId: decodeURIComponent(urlParams.id),
        genderFilter: decodeURIComponent(urlParams.gender),
        orderRule: orderRule ? orderRule : undefined,
        searchBy: searchPid || undefined,
        pstName: decodeURIComponent(urlParams.pstName) || undefined,
        ...defaultPageFilters,
        ...filterParamsState,
        mskuFilter: msku ? msku : undefined,
      };
      return merchIntelligenceService.getPidReviewList(queryParams);
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
    setFilterParams({ ...list });
  };

  const updateFilterSort = (value: string) => {
    setOrderRule(value);
  };

  const updateMskuFilter = (value: any) => {
    setMsku(value);
  };

  const clearFilter = () => {
    setFilterParams({});
    updateMskuFilter(undefined);
  };

  const keepFunction = (productDetail: any) => {
    let parmas = {
      productIds: [productDetail?.productId],
      decisionType: 'KEEP',
      pstId: urlParams.id,
      gender: urlParams.gender,
    };

    return merchIntelligenceService.updateMskuProductStatus(parmas);
  };

  const cullFunction = (productDetail: any) => {
    let parmas = {
      productIds: [productDetail?.productId],
      decisionType: 'CULL',
      pstId: urlParams.id,
      gender: urlParams.gender,
    };
    return merchIntelligenceService.updateMskuProductStatus(parmas);
  };

  const downloadSheet = async () => {
    let queryParams = {
      action: 'mipPstGenderCohortDownload',
      pstId: decodeURIComponent(urlParams.id),
      genderFilter: decodeURIComponent(urlParams.gender),
      pstName: decodeURIComponent(urlParams.pstName) || undefined,
      orderRule: orderRule ? orderRule : undefined,
      searchBy: searchPid || undefined,
      ...filterParamsState,
      mskuFilter: msku ? msku : undefined,
    };
    try {
      setTemplateLoader(true);
      const response: any = await merchIntelligenceService.downloadSheetMip(queryParams);
      setTemplateLoader(false);
      if (response.data.url) {
        window.open(response.data.url, '_blank');
        response.data.message !== '' && toast.success(response.data.message);
      } else {
        toast.warn(response.data.message);
      }
    } catch (e: any) {
      setTemplateLoader(false);
      toast.error(e?.data?.message || e?.data?.data?.message || e?.message);
    }
  };

  let pFilterDataProps = dashboardData?.data?.pFilters || null;
  let mksuFilterList;
  let selectedMskuList;
  if (pFilterDataProps) {
    pFilterDataProps?.filterSection.map((filter) => {
      if (filter.uiType === 'MSKU') {
        mksuFilterList = Array.from(filter?.filterList[0].filter);
        selectedMskuList = [];
        mksuFilterList.forEach((list) => {
          if (list.isSelected) {
            selectedMskuList.push(list.id);
          }
        });
      }
      return null;
    });
  }

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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            href="/react-monorepo/merch-intelligence/dashboard"
          >
            <ArrowBackIcon fontSize="large" className={classes.arrowBackIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isFetching && <Loader />}
      {isDashboardSuccess && (
        <Grid container className={classes.pidReviewContainer}>
          <Paper className={classes.filterWrapper}>
            <Filters {...filterDataJson}></Filters>
          </Paper>
          <Grid item xs className={classes.scrollWrapper}>
            <Grid container>
              <Grid item xs={6}>
                <Typography align="left" className={classes.dashboardText}>
                  {dashboardData?.data?.dashboardText}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <SearchBox onInputChange={handleSearchChange} />
              </Grid>
            </Grid>
            {!dashboardData?.message && (
              <Grid container spacing={3} className={classes.tableContainer}>
                <Grid item>
                  <MultiSelect
                    mskuList={mksuFilterList}
                    selectedMskuList={selectedMskuList}
                    updateFilter={updateMskuFilter}
                  />
                </Grid>
                {/* style={{display:'none'}} bcoz some data issue hiding target width and sales pid table*/}
                <Grid item xs={12} style={{ display: 'none' }}>
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <Paper>
                        <PidKeepCullTable
                          targetCurrentWidthData={dashboardData?.data?.targetCurrentWidthData}
                          keepCullData={dashboardData?.data?.keepCullData}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={5}>
                      <Paper>
                        <SalesMixAndInventoryTable
                          SalesMixAndInventoryData={dashboardData?.data?.salesMixAndInventoryMixes}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={4}>
                    <Typography align="left" className={classes.totalRecords}>
                      Showing {dashboardData?.data?.totalRecords} results
                    </Typography>
                  </Grid>
                  <Grid item container xs={8} direction="row-reverse">
                    <SortDropdown
                      sortingOptions={dashboardData?.data?.sortingOptions || []}
                      updateSort={updateFilterSort}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={templateLoader}
                      className={classes.downloadButton}
                      endIcon={templateLoader ? <CircularProgress size={20} /> : <GetAppIcon />}
                      onClick={downloadSheet}
                    >
                      Download PID-Details
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
                      <CardHeader
                        className={classes.expansionHeader}
                        action={
                          <Avatar aria-label="count" className={classes.size}>
                            {dashboardData?.data?.discoveryProductDetails?.productCount}
                          </Avatar>
                        }
                        title={
                          <Typography className={classes.discoveryProductDetails}>
                            {dashboardData?.data?.discoveryProductDetails?.bifurgationName}
                          </Typography>
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item container>
                        {dashboardData?.data?.discoveryProductDetails?.productList.map((productItem: any, index) => {
                          return (
                            <MIPProductListCard
                              key={`mipProductList${index}`}
                              {...productItem}
                              keepFunctionDef={() => keepFunction(productItem)}
                              cullFunctionDef={() => cullFunction(productItem)}
                            />
                          );
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
                      <CardHeader
                        className={classes.expansionHeader}
                        action={
                          <Avatar aria-label="count" className={classes.size}>
                            {dashboardData?.data?.inStockCatalogProductDetails?.productCount}
                          </Avatar>
                        }
                        title={
                          <Typography className={classes.discoveryProductDetails}>
                            {dashboardData?.data?.inStockCatalogProductDetails?.bifurgationName}
                          </Typography>
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item container>
                        {dashboardData?.data?.inStockCatalogProductDetails?.productList.map(
                          (productItem: any, index) => {
                            return <MipPidCard key={`oosTailProductDetails${index}`} {...productItem} />;
                          },
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
                      <CardHeader
                        className={classes.expansionHeader}
                        action={
                          <Avatar aria-label="count" className={classes.size}>
                            {dashboardData?.data?.oosBestSellerProductDetails?.productCount}
                          </Avatar>
                        }
                        title={
                          <Typography className={classes.discoveryProductDetails}>
                            {dashboardData?.data?.oosBestSellerProductDetails?.bifurgationName}
                          </Typography>
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item container>
                        {dashboardData?.data?.oosBestSellerProductDetails?.productList.map(
                          (productItem: any, index) => {
                            return (
                              <MipPidCard key={`oosTailProductDetails${index}`} hasBestSeller={true} {...productItem} />
                            );
                          },
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
                      <CardHeader
                        className={classes.expansionHeader}
                        action={
                          <Avatar aria-label="count" className={classes.size}>
                            {dashboardData?.data?.oosTailProductDetails?.productCount}
                          </Avatar>
                        }
                        title={
                          <Typography className={classes.discoveryProductDetails}>
                            {dashboardData?.data?.oosTailProductDetails?.bifurgationName}
                          </Typography>
                        }
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item container>
                        {dashboardData?.data?.oosTailProductDetails?.productList.map((productItem: any, index) => {
                          return <MipPidCard key={`oosTailProductDetails${index}`} {...productItem} />;
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
      {dashboardData?.message && <Paper className={classes.ErrorMessage}>{dashboardData?.message}</Paper>}
    </>
  );
};

export default PidReview;
