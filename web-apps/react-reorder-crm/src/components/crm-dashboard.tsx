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
import { IDropdownListData, IDashboardSetData, IFilterPostData, IFilterParams } from './IDashBorad';
import {
  LeftNavBar,
  LeftNavBarProps,
  ReorderFiltersProps,
  ReorderFiltersOptions,
  HSTableV1,
  HsTablePropsV1,
} from '@hs/components';

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

const CrmDashboard = () => {
  const classes = useStyles();
  const [dropDownsList, setDropDownsList] = useState<Array<IDropdownListData>>([]);
  const [rows, setRows] = useState<Array<IDashboardSetData>>([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({ size: 10, page: 0 });
  const [postObject, setPostObject] = useState({});

  const getUpdatedTableData = (filters: any) => {
    setFilterParams({ size: filters.size, page: filters.page });
  };

  const dashboardDataFetch = (postData?: Record<string, unknown>) => {
    if (postData) {
      let postFilterData = {
        vendor_id: postData.vendor_id,
        brand_id: postData.brand_id,
        constraint: postData.attribute === 'age' ? { key: 'age' } : { key: 'color' },
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
    } else {
      (async () => {
        try {
          const response = await reorderService.getDashboardData();
          if (response) {
            const responseData: any = response;
            setRows(responseData.data);
          } else {
            showError({
              status: 'failure',
              errorMessage: 'Data not available',
            });
          }
        } catch (error) {
          showError(error);
        }
      })();
    }
  };

  const onSubmit = () => {
    dashboardDataFetch(postObject);
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

  useEffect(() => {
    (async () => {
      try {
        const filters: any = await reorderService.getFilters();
        if (filters) {
          const dropDownsList = [
            {
              key: 'vendor_id',
              display: 'Vendor',
              input_type: 'S',
              clearFields: ['brand_id'],
            },
          ];
          dropDownsList.forEach((element: ReorderFiltersProps) => {
            if (filters[element.key]) {
              element['options'] = filters[element.key];
            }
          });
          setDropDownsList([...dropDownsList]);
        }
      } catch (error) {
        showError(error);
      }
    })();
  }, []);

  const onVendorChange = (key: any, formData: any) => {
    let data = formData[key];
    setPostObject({ ...postObject, vendor_id: formData[key]['key'] });
    const list = removeFromArray(['brand_id'], [...dropDownsList]);
    if (data) {
      const id = data.key;
      (async () => {
        try {
          const brands: any = await reorderService.getBrands({ vendorId: id });
          if (brands && brands.brandList && brands.brandList.length) {
            const indexFound = list.findIndex((obj: any) => obj.key === 'vendor_id');
            if (indexFound > -1) {
              const brand = {
                key: 'brand_id',
                display: 'Brand *',
                input_type: 'S',
                options: brands.brandList,
              };
              list.splice(indexFound + 1, 0, brand);
            }
          } else {
            toast.info('Brands are not available select different vendor');
          }
          setDropDownsList([...list]);
        } catch (error) {
          showError(error);
          setDropDownsList([...list]);
        }
      })();
    } else {
      setDropDownsList([...list]);
    }
  };

  const onBrandChange = (key: any, formData: any) => {
    let data = formData[key];
    setPostObject({ ...postObject, brand_id: formData[key]['id'] });
    const list = removeFromArray(['attribute'], [...dropDownsList]);
    if (data) {
      try {
        const attributes = [
          { key: 'color', name: 'Color' },
          { key: 'age', name: 'Age' },
        ];
        if (attributes.length) {
          const indexFound = list.findIndex((obj: any) => obj.key === 'brand_id');
          if (indexFound > -1) {
            const attribute = {
              key: 'attribute',
              display: 'Attributes',
              input_type: 'S',
              options: attributes,
            };
            list.splice(indexFound + 1, 0, attribute);
          }
        } else {
          toast.info('Attributes are not available select different brand');
        }
        setDropDownsList([...list]);
      } catch (error) {
        showError(error);
        setDropDownsList([...list]);
      }
    }
  };

  const onAttributeChange = (key: any, formData: any) => {
    setPostObject({ ...postObject, attribute: formData[key]['key'] });
  };

  const onDropDownChange = (key: any, formData: any) => {
    if (key === 'vendor_id') {
      onVendorChange(key, formData);
    } else if (key === 'brand_id') {
      onBrandChange(key, formData);
    } else if (key === 'attribute') {
      onAttributeChange(key, formData);
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
          return row.brand;
        }
        if (row) {
          return (
            <>
              <NavLink to={{ pathname: `/edit-cluster/${row.id}/${row.constraint_key.group_id}` }}>{row.brand}</NavLink>
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
                  <li key={'ageLi' + index}>{'From: ' + record.from + ', To: ' + record.to}</li>
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
              className={classes.clearFilters}
              onClick={(e) => handleAction(data)}
            >
              {data.value}
            </Button>
          );
        }
      },
      withIcon: false,
    },
  ];

  const handleAction = (data: IDashboardSetData) => {
    let filterPostData: IFilterPostData = {
      id: data.vendor,
      group_id: data.constraint_key.group_id,
      action: data.value === 'ENABLE' ? 'DISABLE' : 'ENABLE',
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

  useEffect(() => {
    dashboardDataFetch();
  }, []);

  const tabData: HsTablePropsV1 = {
    title: 'Dashboard Table',
    count: rows.length,
    columns: columns,
    rows: rows,
    rowsPerPage: 5,
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
                                          const formValues = { [keyName]: values };
                                          if (sideBarOption.clearFields) {
                                            sideBarOption.clearFields.forEach((element: string) => {
                                              delete formValues[element];
                                            });
                                          }
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
                              disabled={!Object.keys(postObject).length}
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
