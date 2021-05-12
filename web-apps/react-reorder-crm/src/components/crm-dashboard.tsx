import React, { useState, useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField, Paper, Button, Grid } from '@material-ui/core';
import { reorderService } from '@hs/services';
import { DashBoardIcon } from '@hs/icons';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import {
  IDropdownListData,
  IDashboardResponse,
  IDashboardSetData,
  IFilterPostData,
  IFilterParams,
} from '../types/IDashBoard';
import {
  LeftNavBar,
  LeftNavBarProps,
  ReorderFiltersProps,
  ReorderFiltersOptions,
  HSTableV1,
  HsTablePropsV1,
} from '@hs/components';
import {
  Brand,
  FilterType,
  ICreateClusterDropDownProps,
  Action,
  ActionType,
  ISelectedValues,
} from '../types/ICreateCluster';
import { useQuery } from 'react-query';
import { useReducer } from 'react';

const navItems: LeftNavBarProps = {
  navList: [
    { linkUrl: '/create-cluster', linkText: 'Create cluster', icon: DashBoardIcon },
    { linkUrl: '/reorder-crm-dashboard', linkText: 'Reorder Dashboard', icon: DashBoardIcon },
  ],
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
  header: {
    margin: 10,
    fontSize: 28,
  },
  clearFilters: {
    fontSize: '12px',
    marginTop: '5px',
    padding: '10px 0',
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
  const [rows, setRows] = useState<Array<IDashboardSetData>>([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({ size: 5, page: 1 });

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
    'dashboardData',
    () => reorderService.getDashboardData({ ...filterParams }),
    {
      staleTime: 2000,
      onError: (error: any) => {
        showError(error);
      },
    },
  );

  useEffect(() => {
    if (isDashboardSuccess) {
      setRows(dashboardData.data);
    }
  }, [filterParams, dashboardData, isDashboardSuccess, isDashboardFetching]);

  useEffect(() => {
    if (isFilterSuccess) {
      let formList: ICreateClusterDropDownProps[] = [
        {
          key: 'vendor_id',
          display: 'Vendor *',
          input_type: 'S',
          clearFields: ['brand_id', 'attribute'],
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
          clearFields: ['attribute'],
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
    setFilterParams({ ...filterParams, size: filters.pageSize, page: filters.pageNo + 1 });
  };

  const dashboardDataFetch = (postData: Record<string, unknown>) => {
    if (postData) {
      let postFilterData = {
        vendor_id: postData.vendor_id,
        brand_id: postData.brand_id,
        constraint: postData.attribute,
      };
      (async () => {
        try {
          const params = { ...filterParams, page: filterParams.page + 1 };
          const constraint: any = await reorderService.getDashboardFilteredData({ ...postFilterData, ...params });
          if (constraint.action === 'success') {
            toast.success(constraint.message || 'Data found');
            setRows(constraint.data);
            return;
          }
          showError(constraint);
        } catch (error) {
          showError(error);
        }
      })();
    }
  };

  const onSubmit = () => {
    const postObject: Record<string, number> = {};
    ['vendor_id', 'brand_id', 'attribute'].forEach((ele: string) => {
      if (selectedFilters[ele]) {
        postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele]['id'] || selectedFilters[ele];
      }
    });

    dashboardDataFetch(postObject);
  };

  const onDropDownChange = (key: any, formData: any) => {
    let dataKey = formData[key]?.key || '';
    if (key === 'vendor_id') {
      dispatch([ActionType.removeItems, ['brand_id', 'attribute']]);
      setVendorId(dataKey);
    } else if (key === 'brand_id') {
      const attribute = {
        key: 'attribute',
        display: 'Attributes',
        input_type: 'S',
        options: attributeOptions,
      };
      dispatch([ActionType.removeItems, ['attribute']]);
      dispatch([ActionType.addItems, [attribute]]);
    }
  };

  const columns = [
    {
      id: 'id',
      label: 'Id',
      withIcon: true,
      render: true,
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
              <NavLink to={{ pathname: `/edit-cluster/${row.id}/${row.constraint_key.group_id}` }}>
                {row.vendor}
              </NavLink>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'brand',
      label: 'Brand',
      width: 100,
      withJoin: false,
      render: true,
    },
    {
      id: 'category',
      label: 'Category',
      withDate: false,
      render: true,
    },
    {
      id: 'sub_category',
      label: 'Sub Category',
      withDate: false,
      render: true,
    },
    { id: 'product_type', label: 'Product Type', width: 80 },
    { id: 'gender', label: 'Gender', width: 80 },
    {
      id: 'attribute',
      label: 'Attribute',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (row) {
          return <>{row.constraint_key.name}</>;
        }
        return '--';
      },
    },
    {
      id: 'value',
      label: 'Values',
      customRender: (row: IDashboardSetData, isTitle?: boolean) => {
        if (row) {
          if (row.constraint_key.name === 'age') {
            return (
              <>
                {row.constraint_key.value.map((record: any, index: number) => (
                  <li key={'ageLi' + index}>{'From: ' + record.from_age + ', To: ' + record.to_age}</li>
                ))}
              </>
            );
          } else {
            return <>{row.constraint_key.value.join(',')}</>;
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
              type="submit"
              // disabled={data.value !== 'DISABLE'}
              className={classes.clearFilters}
              onClick={(e) => handleAction(data)}
            >
              {data.value ? data.value : 'DISABLE'}
            </Button>
          );
        }
      },
      withIcon: false,
    },
  ];

  const handleAction = (data: IDashboardSetData) => {
    let filterPostData: IFilterPostData = {
      id: data.id,
      group_id: data.constraint_key.group_id,
      action: data.value ? data.value : 'disable',
    };
    (async () => {
      try {
        const filterData: any = await reorderService.updateDashboardAction(filterPostData);
        if (filterData.action === 'success') {
          toast.success(filterData.message || 'Data found');
          setRows(filterData.data);
          return;
        }
        showError(filterData);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const tabData: HsTablePropsV1 = {
    title: 'Dashboard Table',
    count: rows.length || 0,
    columns: columns,
    rows: rows || [],
    rowsPerPage: filterParams.size || 5,
    filterRowsPerPage: [5, 10, 15, 20],
    fetchTableData: getUpdatedTableData,
  };

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Route path="/">
          <DashBoardWrapper>
            <h1 className={classes.header}>Crm Dashboard Page</h1>
            <FiltersWrapper className={classes.root}>
              <Formik
                enableReinitialize={true}
                initialValues={{}}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(false);
                  onSubmit();
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
            {tabData.rows && <HSTableV1 {...tabData} />}
          </DashBoardWrapper>
        </Route>
      </Switch>
    </>
  );
};

export default CrmDashboard;
