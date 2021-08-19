import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Colors } from '@hs/utils';
import { ReorderFiltersProps, ReorderFiltersOptions } from '@hs-crm/components';
import { merchIntelligenceService, reorderService } from '@hs/services';
import {
  LeftNavBar,
  LeftNavBarProps,
  Card,
  CardButtonTypeProps,
  ProgressBar,
  ProgressBarProps,
} from '@hs-crm/components';
import { DashBoardIcon } from '@hs/icons';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { getHexCode } from '@hs/utils';
import {
  IPieChart,
  IChartData,
  IPieChartResponse,
  ICarouselAPIResponse,
  ICarouselData,
  ICarouselItemsData,
  ICarouselResponse,
  ICarouselObjectsResponse,
  IDropdownsData,
  ISelectedFilters,
  IPopUpData,
  IPostObjectDashboardResponse,
  IProgressResponse,
  IPidData,
  StringObjects,
  TableType,
  IFiltersResponse,
  IDashboardResponse,
} from './IDashboard';
import {
  TextField as MuiTextField,
  makeStyles,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const DASHBOARDCONSTANTS = {
  catalogue: 'CATALOGUE',
  discovery: 'DISCOVERY',
  KEEP: 'KEEP',
  CULL: 'CULL',
  SUCCESS: 'SUCCESS',
  failure: 'failure',
  failed: 'failed',
  catalogueKeep: 'catalogueKeep',
  catalogueCull: 'catalogueCull',
  discoveryCull: 'discoveryCull',
  discoveryKeep: 'discoveryKeep',
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00FF00', '#FF6565', '#FFD345', '#008855', '#39ce22'];

let loading = 0;
let activeCarousels: any = {};
let activePids: any = {};

const progressBarData = {
  action: '',
  statusCode: 0,
  data: [],
};
const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: '/', linkText: 'Dashboard', icon: DashBoardIcon }],
};

const FiltersWrapper = styled.div`
  margin: auto;
`;

const tryLater = 'Please try later';
const showError = (error: Record<string, any>) => {
  let message = tryLater;
  const errorMessage = error.action && error.action.toLowerCase();
  if (errorMessage === DASHBOARDCONSTANTS.failure || errorMessage === DASHBOARDCONSTANTS.failed) {
    message = error.message;
  }
  toast.error(message);
};

const showInfo = (response: Record<string, any>) => {
  let message = tryLater;
  if (response.action === DASHBOARDCONSTANTS.SUCCESS) {
    const error = response.data;
    const errorMessage = error.action && error.action.toLowerCase();
    if (errorMessage === DASHBOARDCONSTANTS.failure || errorMessage === DASHBOARDCONSTANTS.failed) {
      message = error.message;
    }
    toast.info(message);
  } else {
    showError(response);
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: '10px',
    paddingBottom: 0,
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
  chartcard: {
    margin: 5,
    padding: '0 0 15px 0',
    boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)',
    borderRadius: 6,
  },
  chartcontainer: {
    marginBottom: 15,
    marginTop: 10,
  },
  header: {
    margin: 10,
    fontSize: 18,
  },
  'carousel-title': {
    fontSize: 14,
  },
  'carousel-list': {
    display: 'flex',
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  dialogDescription: {
    color: Colors.PINK[500],
    fontSize: 18,
    fontWeight: 600,
  },
  notFoundPidMsg: {
    color: Colors.PINK[500],
    fontSize: 16,
    fontWeight: 400,
    padding: 30,
    textAlign: 'center',
  },
  pidHeader: {
    fontSize: 11,
    fontWeight: 700,
    textAlign: 'center',
  },
  table: {
    minWidth: 250,
  },
}));

const DashBoardWrapper = styled.div`
  margin: 10px 10px 10px 90px;
`;

const DashBoard = () => {
  const classes = useStyles();
  const [confirmDialog, showConfirmDialog] = useState(false);
  const [carouselPids, setSelectedCarouselPids] = useState<ICarouselResponse>({});
  const [charts, setCharts] = useState<Array<IChartData>>([]);
  const [carouselObjects, setCarouselObjects] = useState<ICarouselObjectsResponse>({});
  const [dropDownsList, setDropDownsList] = useState<Array<IDropdownsData>>([]);
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilters>({ mskuId: { key: 0 } });
  const [popUpData, setPopUpData] = useState<IPopUpData>({});
  const primaryButtonType: CardButtonTypeProps = 'primary';
  const secondaryButtonType: CardButtonTypeProps = 'secondary';
  const [postObjectDashboard, setPostObjectDashboard] = useState<IPostObjectDashboardResponse>({});
  const popUpLabels: Record<string, string> = {
    cullToKeep: 'Cull to Keep',
    keepToCull: 'Keep to Cull',
    CATALOGUE: 'CATALOG',
  };

  const [progressRes, setProgressRes] = useState<ProgressBarProps>(progressBarData);
  const handleDialogClose = () => {
    showConfirmDialog(false);
  };

  const onPageChange = (data: any) => {
    const activeCarousel = activeCarousels[data.defaultKey];
    const currentPage = activeCarousel['page'];
    if (loading) {
      toast.info('Loading please wait...');
      return;
    }
    loading = 1;
    const carouselObj = { ...activeCarousel, page: currentPage + (data.isPrevious ? -1 : 1) };
    getCarouselData(data.defaultKey, carouselObj, { mskuId: selectedFilters['mskuId']['key'] });
  };

  const updatePids = (data: IPidData) => {
    activePids[Object.keys(data)[0]] = Object.values(data)[0];
    setSelectedCarouselPids({ ...activePids });
  };

  //let dataTable: any = [];

  const submitPids = () => {
    const generateObject: StringObjects = {
      discoveryKeep: DASHBOARDCONSTANTS.discovery,
      discoveryCull: DASHBOARDCONSTANTS.discovery,
      catalogueCull: DASHBOARDCONSTANTS.catalogue,
      catalogueKeep: DASHBOARDCONSTANTS.catalogue,
    };
    const postKeys: StringObjects = {
      CATALOGUE: 'catalogue',
      DISCOVERY: 'discovery',
    };

    const getProductIds = (data = [] as ICarouselItemsData) => {
      const ids = [];
      for (let key in data) {
        ids.push(+key);
      }
      return ids;
    };
    const postObject: any = { [postKeys.CATALOGUE]: [], [postKeys.DISCOVERY]: [] };
    const popUpData: any = { keepToCull: {}, cullToKeep: {} };
    for (const [key] of Object.entries(generateObject)) {
      if (
        generateObject[key] === (tableData[key] && tableData[key]['categoryType']) &&
        carouselPids[key] &&
        Object.keys(carouselPids[key]).length
      ) {
        const pids = getProductIds(carouselPids[key]);
        const type = Object.values(carouselPids[key])[0];
        postObject[postKeys[generateObject[key]]].push({
          productIds: pids,
          decisionType: type,
        });
        if (DASHBOARDCONSTANTS.KEEP === type && pids.length) {
          popUpData.cullToKeep[generateObject[key]] = (popUpData.cullToKeep[generateObject[key]] || 0) + pids.length;
        } else {
          popUpData.keepToCull[generateObject[key]] = (popUpData.keepToCull[generateObject[key]] || 0) + pids.length;
        }
      }
    }
    Object.keys(postObject).forEach((key) => {
      if (!postObject[key].length) {
        delete postObject[key];
      }
    });
    setPopUpData(popUpData);
    setPostObjectDashboard(postObject);

    showConfirmDialog(true);
  };

  const submitDashboardData = () => {
    (async () => {
      try {
        const dashboardData: IDashboardResponse = await merchIntelligenceService.postDashboardData({
          ...postObjectDashboard,
          //mskuId: selectedFilters['mskuId']['key'],
        });
        const response = dashboardData || {};
        if (dashboardData.action === DASHBOARDCONSTANTS.SUCCESS && response.action === DASHBOARDCONSTANTS.SUCCESS) {
          activeCarousels = {};
          activePids = {};
          setCarouselObjects({});
          setSelectedCarouselPids({});
          showConfirmDialog(false);
          toast.success(dashboardData.data.message);
          getCarouselList({
            mskuId: selectedFilters['mskuId']['key'],
          });
        } else {
          showError(dashboardData.data);
          showConfirmDialog(false);
        }
      } catch (err) {
        showError(err);
      }
    })();
  };

  const tableData: TableType = {
    [DASHBOARDCONSTANTS.discoveryKeep]: {
      cardsList: [],
      onPageChange: onPageChange,
      categoryType: DASHBOARDCONSTANTS.discovery,
      decisionType: DASHBOARDCONSTANTS.CULL,
      defaultKey: DASHBOARDCONSTANTS.discoveryKeep,
      page: 0,
      updateDecisionType: DASHBOARDCONSTANTS.KEEP,
      carouselKey: DASHBOARDCONSTANTS.discoveryKeep,
      label: 'Discovery Cull',
      actionButton: 'Mark as Keep',
      buttonType: secondaryButtonType,
      updatePids: updatePids,
    },
    [DASHBOARDCONSTANTS.discoveryCull]: {
      cardsList: [],
      onPageChange: onPageChange,
      categoryType: DASHBOARDCONSTANTS.discovery,
      decisionType: DASHBOARDCONSTANTS.KEEP,
      defaultKey: DASHBOARDCONSTANTS.discoveryCull,
      page: 0,
      updateDecisionType: DASHBOARDCONSTANTS.CULL,
      carouselKey: DASHBOARDCONSTANTS.discoveryCull,
      label: 'Discovery Keep',
      actionButton: 'Mark as Cull',
      buttonType: primaryButtonType,
      updatePids: updatePids,
    },
    [DASHBOARDCONSTANTS.catalogueKeep]: {
      cardsList: [],
      onPageChange: onPageChange,
      categoryType: DASHBOARDCONSTANTS.catalogue,
      decisionType: DASHBOARDCONSTANTS.CULL,
      defaultKey: DASHBOARDCONSTANTS.catalogueKeep,
      page: 0,
      updateDecisionType: DASHBOARDCONSTANTS.KEEP,
      carouselKey: DASHBOARDCONSTANTS.catalogueKeep,
      label: 'Catalog Cull',
      actionButton: 'Mark as Keep',
      buttonType: secondaryButtonType,
      updatePids: updatePids,
    },
    [DASHBOARDCONSTANTS.catalogueCull]: {
      cardsList: [],
      onPageChange: onPageChange,
      categoryType: DASHBOARDCONSTANTS.catalogue,
      decisionType: DASHBOARDCONSTANTS.KEEP,
      defaultKey: DASHBOARDCONSTANTS.catalogueCull,
      page: 0,
      updateDecisionType: DASHBOARDCONSTANTS.CULL,
      carouselKey: DASHBOARDCONSTANTS.catalogueCull,
      label: 'Catalog Keep',
      actionButton: 'Mark as Cull',
      buttonType: primaryButtonType,
      updatePids: updatePids,
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const filters: IFiltersResponse = await reorderService.getFilters();
        if (filters) {
          const dropDownsList = [
            {
              key: 'categoryId',
              apiKey: 'category_id',
              display: 'Category',
              input_type: 'S',
              clearFields: ['subcategoryId', 'productTypeId', 'mskuId'],
            },
          ];
          dropDownsList.forEach((element: ReorderFiltersProps) => {
            if (element['apiKey'] && filters[element['apiKey']]) {
              element['options'] = filters[element['apiKey']];
            }
          });
          setDropDownsList([...dropDownsList]);
        }
      } catch (error) {
        showError(error);
      }
    })();
  }, []);

  const onFiltersSubmit = () => {
    const postObject: Record<string, number> = {};
    ['categoryId', 'subcategoryId', 'productTypeId', 'mskuId'].forEach((ele: string) => {
      if (selectedFilters[ele]) {
        postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele];
      }
    });
    const msku = { mskuId: postObject['mskuId'] };
    activeCarousels = {};
    activePids = {};
    setProgressRes(progressBarData);
    setCharts([]);
    setCarouselObjects({});
    getChartsData(msku);
    getProgressData(msku);
    getCarouselList(msku);
  };

  const removeFromArray = (elements: Array<any>, filtersList: Array<any>) => {
    const list = [...filtersList];
    [...elements].forEach((ele: string) => {
      const removeElement = list.findIndex((obj: any) => obj.key === ele);
      if (removeElement > -1) {
        list.splice(removeElement, 1);
      }
    });
    return list;
  };

  const onCategoryChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data && data.key;
        const list = removeFromArray(['subcategoryId', 'productTypeId', 'mskuId'], [...dropDownsList]);
        if (ids) {
          const subCategories: IFiltersResponse = await reorderService.getSubCategories({ ids });
          if (subCategories && subCategories.sub_cat) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'categoryId');
            if (indexFound > -1) {
              const subCategoryObject = {
                key: 'subcategoryId',
                display: 'Sub Category',
                input_type: 'S',
                options: subCategories.sub_cat,
                clearFields: ['productTypeId', 'mskuId'],
              };
              list.splice(indexFound + 1, 0, subCategoryObject);
            }
          }
        }
        setDropDownsList([...list]);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onSubCategoryChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data && data.key;
        const list = removeFromArray(['productTypeId', 'mskuId'], [...dropDownsList]);
        if (ids) {
          const productType: any = await reorderService.getProductTypes({ ids });
          if (productType && productType.pt) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'subcategoryId');
            if (indexFound > -1) {
              const productTypes = {
                key: 'productTypeId',
                display: 'Product Type',
                input_type: 'S',
                options: productType.pt,
                clearFields: ['mskuId'],
              };
              list.splice(indexFound + 1, 0, productTypes);
            }
          }
        }
        setDropDownsList([...list]);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onProductChange = (key: any, formData: any) => {
    let data = formData[key];
    (async () => {
      try {
        const ids = data && data.key;
        const list = removeFromArray(['mskuId'], [...dropDownsList]);
        if (ids) {
          const postObject: Record<string, unknown> = {};
          ['categoryId', 'subcategoryId', 'productTypeId'].forEach((ele: string) => {
            if (formData[ele]) {
              postObject[ele] = formData[ele]['key'] || formData[ele];
            }
          });
          const mskus: any = await merchIntelligenceService.getMskus(postObject);
          const response = mskus.data || {};
          if (mskus.action === DASHBOARDCONSTANTS.SUCCESS && response.action === DASHBOARDCONSTANTS.SUCCESS) {
            const mskuData = {
              key: 'mskuId',
              display: 'Msku Id',
              input_type: 'S',
              options: mskus.data.data,
            };
            list.push(mskuData);
          } else {
            showError(response);
          }
        }
        setDropDownsList([...list]);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const onDropDownChange = (key: any, formData: any) => {
    if (key === 'categoryId') {
      onCategoryChange(key, formData);
    } else if (key === 'subcategoryId') {
      onSubCategoryChange(key, formData);
    } else if (key === 'productTypeId') {
      onProductChange(key, formData);
    }
  };

  const getChartsData = (params: Record<string, unknown>) => {
    (async () => {
      try {
        const chartsData: IPieChartResponse = await merchIntelligenceService.getChartsData(params);
        const response: IPieChart = chartsData.data;
        if (chartsData.action === DASHBOARDCONSTANTS.SUCCESS && response.action === DASHBOARDCONSTANTS.SUCCESS) {
          setCharts(response.data);
        } else {
          showInfo(chartsData);
        }
      } catch (err) {
        showInfo(err);
      }
    })();
  };

  const getProgressData = (param: Record<string, unknown>) => {
    (async () => {
      try {
        const progressResponseData: IProgressResponse = await merchIntelligenceService.getProgressData(param);
        const response = { ...progressResponseData.data } || {};
        if (
          progressResponseData.action === DASHBOARDCONSTANTS.SUCCESS &&
          response.action === DASHBOARDCONSTANTS.SUCCESS
        ) {
          setProgressRes(response);
        } else {
          showInfo(progressResponseData);
        }
      } catch (err) {
        showInfo(err);
      }
    })();
  };

  const getCarouselData = (key: string, data: any, params: Record<string, unknown>) => {
    (async (key, data) => {
      try {
        const carouselList: ICarouselAPIResponse = await merchIntelligenceService.getCarouselData({
          decisionType: data.decisionType,
          categoryType: data.categoryType,
          page: data.page,
          size: 4,
          ...params,
        });
        loading = 0;
        const response: ICarouselData = carouselList.data;
        if (
          carouselList.action === DASHBOARDCONSTANTS.SUCCESS &&
          response.action === DASHBOARDCONSTANTS.SUCCESS &&
          response.data.length
        ) {
          activeCarousels[key] = { ...data, cardsList: response.data, totalRecords: response.totalRecords };
          setCarouselObjects({ ...activeCarousels });
        } else {
          const message = response.message || `No Pid's available in ${data.label} bucket`;
          toast.info(message);
        }
      } catch (err) {
        loading = 0;
        showError(err);
      }
    })(key, data);
  };

  const getCarouselList = (params: Record<string, unknown>) => {
    const list = Object.entries(tableData);
    list.forEach(([key, data]: any) => {
      getCarouselData(key, data, params);
    });
  };

  const renderColorfulLegendText = (props: any) => {
    const content = props.payload.map((data: any, index: number) => (
      <span key={`legend-${index}`} style={{ color: data.color, display: 'inline-block', marginRight: '5px' }}>
        {data.payload.label} : {data.payload.y}
      </span>
    ));
    return <div style={{ marginLeft: '30px' }}>{content}</div>;
  };

  const renderToolTip = (props: any) => {
    return props.payload.map((data: any, index: number) => (
      <span key={`legend-${index}`}>
        {data.payload.label} : {data.payload.y}
      </span>
    ));
  };

  const dialogDescriptionMsg = () =>
    Object.keys(postObjectDashboard).length ? 'Do you want to submit the following data ?' : null;

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path="/">
          <DashBoardWrapper>
            <h1 className={classes.header}>Merch Intelligence platform</h1>
            <FiltersWrapper className={classes.root}>
              <Formik
                enableReinitialize={true}
                initialValues={{}}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(false);
                  onFiltersSubmit();
                }}
              >
                {() => (
                  <Form autoComplete="off">
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                        <Grid container direction="row" justify="center" spacing={3}>
                          {dropDownsList &&
                            dropDownsList.map((sideBarOption: ReorderFiltersProps) => {
                              if (sideBarOption.type === 'autocomplete' || sideBarOption.input_type === 'S') {
                                return (
                                  <Grid
                                    item
                                    sm={sideBarOption.key === 'mskuId' ? 3 : 2}
                                    style={{ padding: '4px' }}
                                    key={sideBarOption.name || sideBarOption.key}
                                  >
                                    <Field
                                      variant="standard"
                                      name={sideBarOption.name || sideBarOption.key}
                                      label={sideBarOption.label || sideBarOption.display}
                                      value={
                                        selectedFilters[sideBarOption.name || sideBarOption.key] ||
                                        (sideBarOption.multi ? [] : null)
                                      }
                                      multiple={sideBarOption.multi || false}
                                      component={Autocomplete}
                                      options={sideBarOption.options || []}
                                      getOptionSelected={(
                                        option: ReorderFiltersOptions,
                                        selectedValue: ReorderFiltersOptions,
                                      ) => {
                                        return option.key === selectedValue?.key;
                                      }}
                                      getOptionLabel={(option: ReorderFiltersOptions) =>
                                        option.display || option.name || option.value || ''
                                      }
                                      onChange={(
                                        evt: React.ChangeEvent<HTMLInputElement>,
                                        values: ReorderFiltersOptions,
                                      ) => {
                                        if (evt) {
                                          const keyName = sideBarOption.name || sideBarOption.key;
                                          const formValues = {
                                            ...selectedFilters,
                                            [keyName]: values,
                                          };
                                          if (sideBarOption.clearFields) {
                                            sideBarOption.clearFields.forEach((element: string) => {
                                              delete formValues[element];
                                            });
                                          }
                                          setSelectedFilters(formValues);
                                          onDropDownChange(keyName, formValues);
                                        }
                                      }}
                                      renderInput={(params: AutocompleteRenderInputParams) => (
                                        <MuiTextField
                                          {...params}
                                          label={sideBarOption.label || sideBarOption.display}
                                          variant="outlined"
                                        />
                                      )}
                                    />
                                  </Grid>
                                );
                              } else {
                                return false;
                              }
                            })}
                          <Grid item xs={1} style={{ padding: '4px' }}>
                            <Button
                              type="submit"
                              color="primary"
                              variant="outlined"
                              size="large"
                              disabled={!selectedFilters['mskuId']}
                              style={{
                                fontWeight: 'bold',
                                fontSize: 10,
                                padding: '15px 10px',
                                margin: '0 10px 0px',
                              }}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </FiltersWrapper>
            <ProgressBar {...progressRes} />
            {selectedFilters['mskuId'] ? '' : <h4>Select all filters from the drop down</h4>}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.chartcontainer}>
              {charts.map((data: any, currentIndex: number) => (
                <Paper
                  key={`chart-${currentIndex}`}
                  className={clsx(classes.paper, classes.chartcard)}
                  style={{ backgroundColor: '#dfe1e6' }}
                  variant="outlined"
                >
                  <Grid item sm={4}>
                    <h4 style={{ fontSize: 18, marginBottom: 0 }}>{data.attributeName}</h4>
                    <PieChart width={375} height={450}>
                      <Pie
                        dataKey="y"
                        isAnimationActive={false}
                        data={data.bifurcation}
                        cx={200}
                        cy={200}
                        label
                        outerRadius={100}
                        fill="#8884d8"
                      >
                        {data.bifurcation.map((entry: Record<string, string>, index: number) => (
                          <Cell key={`cell-${index}`} fill={getHexCode(entry.label) || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={renderToolTip} />
                      <Legend verticalAlign="bottom" width={350} content={renderColorfulLegendText} />
                    </PieChart>
                  </Grid>
                </Paper>
              ))}
            </Grid>
            {Object.values(carouselObjects).length
              ? Object.values(carouselObjects).map((data: any, index: number) => {
                  return (
                    <Grid key={`carousel-${index}`} className={classes['carousel-list']}>
                      <h2 className={classes['carousel-title']}>{data.label}</h2>
                      <Card {...data} />
                    </Grid>
                  );
                })
              : ''}
            <Button
              color={primaryButtonType}
              variant={'outlined'}
              size={'large'}
              disabled={!selectedFilters['mskuId'] || Object.values(carouselObjects).length === 0}
              style={{
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 700,
                margin: 'auto',
                padding: 10,
              }}
              onClick={submitPids}
            >
              Submit
            </Button>
            <Dialog
              open={confirmDialog}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{ justifyContent: 'center' }}>
                <span className={classes.dialogTitle}>Confirmation</span>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <span className={classes.dialogDescription}>
                    {dialogDescriptionMsg()}
                    <TableContainer component={Paper} elevation={2} style={{ marginTop: '15px' }}>
                      <Table className={classes.table} aria-label="simple table">
                        <>
                          {Object.keys(postObjectDashboard).length ? (
                            Object.entries(popUpData).map((entry: any) => {
                              return Object.keys(entry[1]).length > 0 ? (
                                <>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className={classes.pidHeader} colSpan={2}>
                                        {popUpLabels[entry[0]]}
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {Object.entries(entry[1]).map((data: any, indexNo: number) => {
                                      return (
                                        <TableRow key={indexNo}>
                                          <TableCell component="th" scope="row">
                                            {popUpLabels[data[0]] || data[0]}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                            {data[1]}
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </>
                              ) : (
                                ''
                              );
                            })
                          ) : (
                            <TableBody>
                              <TableCell className={classes.notFoundPidMsg}>{"Please select Pid's..."}</TableCell>
                              <Button variant="contained" color="primary" onClick={handleDialogClose}>
                                Close
                              </Button>
                            </TableBody>
                          )}
                        </>
                      </Table>
                    </TableContainer>
                  </span>
                </DialogContentText>
              </DialogContent>
              {Object.keys(postObjectDashboard).length ? (
                <DialogActions style={{ justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" onClick={handleDialogClose}>
                    No
                  </Button>
                  <Button variant="contained" color="primary" onClick={submitDashboardData} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              ) : (
                []
              )}
            </Dialog>
          </DashBoardWrapper>
        </Route>
      </Switch>
    </>
  );
};
export default DashBoard;
