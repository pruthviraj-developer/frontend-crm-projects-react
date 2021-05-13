import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField, Paper, Button, Grid } from '@material-ui/core';
import { reorderService } from '@hs/services';
import { Colors } from '@hs/utils';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { IDashboardSetData, IFilterPostData, IFilterParams } from '../../types/IDashBoard';
import { ReorderFiltersProps, ReorderFiltersOptions, HSTableV1, HsTablePropsV1 } from '@hs/components';
import {
  Brand,
  FilterType,
  ICreateClusterDropDownProps,
  Action,
  ActionType,
  ISelectedValues,
} from '../../types/ICreateCluster';
import { useQuery } from 'react-query';
import { useReducer } from 'react';

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
  header: {
    margin: 10,
    fontSize: 28,
  },
  clearFilters: {
    fontSize: '12px',
    marginTop: '5px',
    padding: '10px 0',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  dialogDescription: {
    color: Colors.PINK[500],
    fontSize: 16,
    fontWeight: 600,
  },
}));

const DashBoardWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;

const FiltersWrapper = styled.div`
  margin: auto;
`;

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure') {
    message = error.message;
  }
  toast.error(message);
};

const attributeOptions = [
  { key: 'color', name: 'Color' },
  { key: 'age', name: 'Age' },
];

const defaultPageFilters = { size: 5, page: 0 };

const reducer = (state: ICreateClusterDropDownProps[], [type, payload]: Action): ICreateClusterDropDownProps[] => {
  switch (type) {
    case ActionType.removeItems:
      return state.filter((item) => !(payload as string[]).includes(item.key));
    case ActionType.addItems:
      return [...state, ...(payload as ICreateClusterDropDownProps[])].sort(
        (a, b) => a.display_position - b.display_position,
      );
  }
  return state;
};

const CrmDashboard = () => {
  const classes = useStyles();
  const [dropDownsList, dispatch] = useReducer(reducer, []);
  const [selectedFilters, setSelectedFilters] = useState<ISelectedValues>({});
  const [postDataFiltersObject, setPostDataFiltersObject] = useState({});
  const [filterParams, setFilterParams] = useState<IFilterParams>(defaultPageFilters);
  const [confirmDialog, showConfirmDialog] = useState(false);
  const [actionData, setActionData] = useState<IDashboardSetData>();

  const { data: filterData, isSuccess: isFilterSuccess } = useQuery<FilterType, Record<string, string>>(
    'filters',
    reorderService.getFilters,
    {
      staleTime: Infinity,
      onError: (error: Record<string, string>) => {
        showError(error);
      },
    },
  );

  const [vendorId, setVendorId] = useState<string | number>('');
  const { data: brandData, isSuccess: isBrandSuccess, isFetching: isBrandFetching } = useQuery<
    Brand,
    Record<string, string>
  >(['brands', vendorId], () => reorderService.getBrands({ vendorId: vendorId }), {
    staleTime: Infinity,
    enabled: vendorId !== '',
  });

  const { data: dashboardData, isSuccess: isDashboardSuccess, isFetching: isDashboardFetching } = useQuery<any>(
    ['dashboardData', postDataFiltersObject, filterParams],
    () => reorderService.getDashboardData({ ...postDataFiltersObject, ...filterParams }),
    {
      staleTime: 2000,
      onError: (error: any) => {
        showError(error);
      },
    },
  );
  useEffect(() => {
    if (isFilterSuccess) {
      let formList: ICreateClusterDropDownProps[] = [
        {
          key: 'vendor_id',
          display: 'Vendor *',
          input_type: 'S',
          clearFields: ['brand_id', 'constraint'],
          options: filterData?.vendor_id,
          display_position: 1,
        },
      ];
      dispatch([ActionType.addItems, formList]);
    }
  }, [filterData, isFilterSuccess]);

  useEffect(() => {
    if (isBrandSuccess) {
      if (brandData && brandData.brandList && brandData.brandList.length) {
        const brand: ICreateClusterDropDownProps = {
          key: 'brand_id',
          display: 'Brand *',
          input_type: 'S',
          clearFields: ['constraint'],
          options: brandData.brandList,
          display_position: 2,
        };
        dispatch([ActionType.addItems, [brand]]);
      } else {
        !isBrandFetching && vendorId !== '' && toast.info('Brands are not available select different vendor');
      }
    }
  }, [brandData, vendorId, isBrandSuccess, isBrandFetching]);

  const getUpdatedTableData = (filters: any) => {
    setFilterParams({ size: filters.pageSize, page: filters.pageNo });
  };

  // const fetchDashboardTableData = (postData: Record<string, unknown>) => {
  //   if (postData) {
  //     let postFilterData = {
  //       vendor_id: postData.vendor_id,
  //       brand_id: postData.brand_id,
  //       constraint: postData.attribute,
  //     };
  //     (async () => {
  //       try {
  //         const constraint: any = await reorderService.getDashboardData({ ...postFilterData, ...filterParams });
  //         if (constraint.action === 'success') {
  //           toast.success(constraint.message || 'Data found');
  //           // setRows(constraint.data);
  //           return;
  //         }
  //         showError(constraint);
  //       } catch (error) {
  //         showError(error);
  //       }
  //     })();
  //   }
  // };

  const onFiltersSubmit = () => {
    const postObject: Record<string, number> = {};
    ['vendor_id', 'brand_id', 'constraint'].forEach((ele: string) => {
      if (selectedFilters[ele]) {
        postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele]['id'] || selectedFilters[ele];
      }
    });
    setFilterParams({ ...defaultPageFilters });
    setPostDataFiltersObject(postObject);
    // fetchDashboardTableData(postObject);
  };

  const onDropDownChange = (key: any, formData: any) => {
    let dataKey = formData[key]?.key || '';
    if (key === 'vendor_id') {
      dispatch([ActionType.removeItems, ['brand_id', 'constraint']]);
      setVendorId(dataKey);
    } else if (key === 'brand_id') {
      const attribute = {
        key: 'constraint',
        display: 'Attributes',
        input_type: 'S',
        options: attributeOptions,
      };
      dispatch([ActionType.removeItems, ['constraint']]);
      dispatch([ActionType.addItems, [attribute]]);
    }
  };

  const handleDialogClose = () => {
    showConfirmDialog(false);
  };

  const updateAction = (data: IDashboardSetData) => {
    showConfirmDialog(true);
    setActionData(data);
  };

  const columns = [
    {
      id: 'id',
      label: 'Id',
    },
    {
      id: 'vendor',
      label: 'Vendor',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (isTitle) {
          return row.vendor;
        }
        if (row) {
          return (
            <>
              <NavLink to={{ pathname: `edit-cluster/${row.id}/${row.constraint_key.group_id}` }}>{row.vendor}</NavLink>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'brand',
      label: 'Brand',
    },
    {
      id: 'category',
      label: 'Category',
    },
    {
      id: 'sub_category',
      label: 'Sub Category',
    },
    { id: 'product_type', label: 'Product Type', width: 80 },
    { id: 'gender', label: 'Gender', width: 80 },
    {
      id: 'constraint',
      label: 'Attribute',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (isTitle) {
          return row.constraint_key.name;
        }
        if (row) {
          return <>{row.constraint_key.name}</>;
        }
        return '--';
      },
    },
    {
      id: 'value',
      label: 'Values',
      width: 200,
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (isTitle) {
          if (row.constraint_key.name === 'age') {
            return;
          }
          return row.constraint_key.value.join(',');
        }
        if (row) {
          if (row.constraint_key.name === 'age') {
            return (
              <>
                {row.constraint_key.value.map((record: any, index: number) => (
                  <li key={'ageLi' + index}>{'From: ' + record.from_age + ', To: ' + record.to_age}</li>
                ))}
              </>
            );
          } else if (row.constraint_key.name === 'color') {
            return <>{row.constraint_key.value.join(',')}</>;
          } else {
            return <>--</>;
          }
        }
        return '--';
      },
    },
    {
      label: 'Action',
      render: (props: any, data: IDashboardSetData) => {
        if (data) {
          return (
            <Button
              variant="contained"
              color="primary"
              type="button"
              className={classes.clearFilters}
              onClick={(e) => updateAction(data)}
            >
              DISABLE
            </Button>
          );
        }
      },
      withIcon: false,
    },
  ];

  const handleAction = () => {
    handleDialogClose();
    if (actionData) {
      let filterPostData: IFilterPostData = {
        id: actionData.id,
        group_id: actionData.constraint_key.group_id,
      };
      (async () => {
        try {
          const filterData: any = await reorderService.updateDashboardAction(filterPostData);
          if (filterData.action === 'success') {
            toast.success(filterData.message || 'Data found');
            setFilterParams(defaultPageFilters);
            return;
          }
          showError(filterData);
        } catch (error) {
          showError(error);
        }
      })();
    }
  };

  const tableData: HsTablePropsV1 = {
    title: 'Dashboard Table',
    count: dashboardData ? dashboardData['totalCount'] : 0,
    activePage: filterParams.page,
    columns: columns,
    rows: dashboardData ? dashboardData['data'] : [],
    rowsPerPage: filterParams.size || 5,
    filterRowsPerPage: [5, 10, 15, 20],
    fetchTableData: getUpdatedTableData,
  };

  return (
    <>
      <DashBoardWrapper>
        <h1 className={classes.header}>Vendor Casepack Dashboard</h1>
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
                                sm={2}
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
                                  component={Autocomplete}
                                  options={sideBarOption.options || []}
                                  getOptionLabel={(option: ReorderFiltersOptions) =>
                                    option.display || option.name || option.value || ''
                                  }
                                  onChange={(
                                    evt: React.ChangeEvent<HTMLInputElement>,
                                    values: ReorderFiltersOptions,
                                  ) => {
                                    if (evt) {
                                      const keyName = sideBarOption.name || sideBarOption.key;
                                      const formValues = { ...selectedFilters, [keyName]: values };
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
                          disabled={!vendorId}
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
        {isDashboardSuccess && tableData.rows.length > 0 && <HSTableV1 {...tableData} />}
        {tableData.rows.length === 0 && (isDashboardFetching ? 'Loading...' : 'No Data')}
        <Dialog
          open={confirmDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span className={classes.dialogTitle}>Confirmation</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className={classes.dialogDescription}>Do you want to disable the case pack configuration?</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleDialogClose}>
              No
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleAction()} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </DashBoardWrapper>
    </>
  );
};

export default CrmDashboard;
