import React, { FC, useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { productSubtypeService } from '@hs/services';
import { LeftNavBar, LeftNavBarProps, HSTableV1, HsTablePropsV1 } from '@hs/components';
import { DashBoardIcon } from '@hs/icons';
import { useQuery, useQueryClient } from 'react-query';
import {
  IDashboardResponse,
  DashboardData,
  IProductTypeDropDownProps,
  IPageType,
  PropsType,
  OptionType,
  ISelectedValues,
  Action,
} from './IDashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    margin: 10,
    fontSize: 28,
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
  clearFilters: {
    fontSize: '10px',
    margin: theme.spacing(1),
    padding: '12px 0',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: '/products/product-subtype', linkText: 'Product SubType Dashboard', icon: DashBoardIcon }],
};

const DashBoardWrapper = styled.div`
  width: 94%;
  margin: 10px 0 0 9rem;
`;

const TableWrapper = styled.div`
  width: 100%;
`;

const FiltersWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 1rem;
`;

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure' && error.message) {
    message = error.message;
  }
  toast.error(message);
};

const defaultPageFilters = { pageSize: 20, pageNo: 0 };

const reducer = (state: any, [type, payload]: Action): any => {
  switch (type) {
    case 'removeItem':
      return state.filter((item: any) => !(payload as string[]).includes(item.key));
    case 'addItem':
      return [...state, ...(payload as any)].sort((a, b) => a.display_position - b.display_position);
  }
  return state;
};

const ProductSubtypeDashboard: FC = () => {
  const { path } = useRouteMatch();
  const classes = useStyles();
  const [dropDownsList, dispatch] = useReducer(reducer, []);
  const [postFilterData, setPostFilterData] = useState({});
  const [selectedFilters, setSelectedFilters] = useState<ISelectedValues>({});
  const [productTypeId, setProductTypeId] = useState<number>(0);
  const [filterPage, setFilterPage] = useState<IPageType>(defaultPageFilters);
  const queryClient = useQueryClient();

  const { data: categoryData, isSuccess: isCategoryDataSuccess } = useQuery<OptionType[] | any>(
    'category',
    productSubtypeService.getCategory,
    {
      staleTime: Infinity,
      onError: (error: any) => {
        showError(error);
      },
    },
  );

  const [categoryId, setCategoryId] = useState<string | number>('');
  const { data: subCategoryData, isSuccess: isSubCategorySuccess, isFetching: isSubCategoryFetching } = useQuery<
    OptionType[] | any,
    Record<string, string>
  >(['subcategory', categoryId], () => productSubtypeService.getSubCategory(categoryId), {
    staleTime: Infinity,
    enabled: categoryId !== '',
  });

  const [subcategoryId, setSubCategoryId] = useState<string | number>('');
  const {
    data: productTypeData,
    isSuccess: isProductTypeDataSuccess,
    isFetching: isProductTypeDataFetching,
  } = useQuery<OptionType[] | any, Record<string, string>>(
    ['producttype', subcategoryId],
    () => productSubtypeService.getProductType(subcategoryId),
    {
      staleTime: Infinity,
      enabled: subcategoryId !== '',
    },
  );

  const { data: dashboardData, isSuccess: isDashboardSuccess } = useQuery<IDashboardResponse>(
    ['dashboardData', filterPage],
    () => productSubtypeService.getDashboardData({ ...filterPage, pageNo: filterPage.pageNo + 1 }, postFilterData),
    {
      staleTime: 2000,
      onError: (error: any) => {
        showError(error);
      },
    },
  );

  useEffect(() => {
    if (isCategoryDataSuccess) {
      const formList: IProductTypeDropDownProps[] = [
        {
          key: 'productCategoryId',
          display: 'Category',
          input_type: 'S',
          clearFields: ['productSubCategoryId', 'productTypeId'],
          options: categoryData,
          display_position: 1,
        },
      ];
      dispatch(['addItem', formList]);
    }
  }, [categoryData, isCategoryDataSuccess]);

  useEffect(() => {
    if (isSubCategorySuccess) {
      if (subCategoryData && subCategoryData.length) {
        const subCat: IProductTypeDropDownProps = {
          key: 'productSubCategoryId',
          display: 'Sub Category',
          input_type: 'S',
          clearFields: ['productTypeId'],
          options: subCategoryData,
          display_position: 2,
        };
        dispatch(['addItem', [subCat]]);
      } else {
        !isSubCategoryFetching &&
          categoryId !== '' &&
          toast.info('Subcategory not available select different category');
      }
    }
  }, [subCategoryData, categoryId, isSubCategorySuccess, isSubCategoryFetching]);

  useEffect(() => {
    if (isProductTypeDataSuccess) {
      if (productTypeData && productTypeData.length) {
        const productType: IProductTypeDropDownProps = {
          key: 'productTypeId',
          display: 'Product Type',
          input_type: 'S',
          options: productTypeData,
          display_position: 2,
        };
        dispatch(['addItem', [productType]]);
      } else {
        !isProductTypeDataFetching &&
          subcategoryId !== '' &&
          toast.info('Product type not available select different sub category');
      }
    }
  }, [productTypeData, categoryId, isProductTypeDataSuccess, isProductTypeDataFetching]);

  const getUpdatedTableData = (filters: IPageType) => {
    setFilterPage({ pageSize: filters.pageSize, pageNo: filters.pageNo });
  };

  const handleAction = (data: DashboardData) => {
    const status = {
      status: data.status === 'Y' ? 'N' : 'Y',
    };
    (async () => {
      try {
        const actionStatus: Record<string, string> = await productSubtypeService.updateAction(
          data.productCategoryId,
          status,
        );
        if (actionStatus.status === 'SUCCESS') {
          toast.success(actionStatus.messageList || 'Status updated successfully');
          setFilterPage(defaultPageFilters);
          queryClient.invalidateQueries('dashboardData');
          return;
        }
        showError(actionStatus);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const columns = [
    {
      id: 'productCategoryName',
      label: 'Category',
      customRender: (row: DashboardData, isTitle?: boolean) => {
        if (isTitle) {
          return row.productCategoryName;
        }
        if (row) {
          return (
            <>
              <NavLink
                to={{
                  pathname: `/edit-product-subtype/${row.productCategoryId}/${row.productSubCategoryId}/${row.productTypeId}`,
                }}
              >
                {row.productCategoryName}
              </NavLink>
            </>
          );
        }
        return '--';
      },
    },
    {
      id: 'productSubCategoryName',
      label: 'Sub Category',
    },
    { id: 'productTypeName', label: 'Product Type' },
    { id: 'productSubtypeName', label: 'Product Sub Type' },
    {
      label: 'Action',
      render: (props: PropsType, data: DashboardData) => {
        if (data) {
          return (
            <Button
              variant="contained"
              color={data.status === 'Y' ? 'default' : 'primary'}
              type="button"
              className={classes.clearFilters}
              onClick={() => handleAction(data)}
            >
              {data.status === 'Y' ? 'DISABLE' : 'ENABLE'}
            </Button>
          );
        }
      },
      withIcon: false,
    },
  ];

  const tableData: HsTablePropsV1 = {
    title: 'Product SubType Dashboard Table',
    count: dashboardData ? dashboardData['totalCount'] : 0,
    activePage: filterPage.pageNo,
    columns: columns,
    rows: dashboardData ? dashboardData['productSubtypeList'] : [],
    rowsPerPage: filterPage.pageSize || 20,
    filterRowsPerPage: [20, 25, 30, 35],
    fetchTableData: getUpdatedTableData,
  };

  const onDropDownChange = (key: string, formData: ISelectedValues) => {
    const dataKey = formData[key]?.key || '';
    if (key === 'productCategoryId') {
      dispatch(['removeItem', ['productSubCategoryId', 'productTypeId']]);
      setCategoryId(dataKey);
      setSubCategoryId('');
      setProductTypeId(0);
    } else if (key === 'productSubCategoryId') {
      dispatch(['removeItem', ['productTypeId']]);
      setSubCategoryId(dataKey);
      setProductTypeId(0);
    } else if (key === 'productTypeId') {
      setProductTypeId(dataKey);
    }
  };

  const onFiltersSubmit = () => {
    const postObject: Record<string, number> = {};
    ['productCategoryId', 'productSubCategoryId', 'productTypeId', 'productSubtypeName'].forEach((ele: string) => {
      if (selectedFilters[ele]) {
        postObject[ele] = selectedFilters[ele]['key'] || selectedFilters[ele]['id'] || selectedFilters[ele];
      }
    });
    setFilterPage({ ...defaultPageFilters });
    setPostFilterData({ ...postObject });
  };

  return (
    <>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Switch>
        <Redirect exact from="/products" to="/products/product-subtype" />
        <Route path={`${path}/product-subtype`}>
          <DashBoardWrapper>
            <h1 className={classes.header}>Product SubType Dashboard</h1>
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
                            dropDownsList.map((eachItem: IProductTypeDropDownProps) => {
                              if (eachItem.input_type === 'S') {
                                return (
                                  <Grid item xs={3} style={{ padding: '4px' }} key={eachItem.key}>
                                    <Field
                                      value={selectedFilters[eachItem.key]}
                                      variant="standard"
                                      name={eachItem.display}
                                      label={eachItem.display}
                                      component={Autocomplete}
                                      options={eachItem.options || []}
                                      getOptionLabel={(option: IProductTypeDropDownProps) => option.value}
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                                        if (event) {
                                          const keyName = eachItem.key;
                                          const formValues: ISelectedValues = { ...selectedFilters, [keyName]: newVal };
                                          if (eachItem.clearFields) {
                                            eachItem.clearFields.forEach((element: string) => {
                                              delete formValues[element];
                                            });
                                          }

                                          setSelectedFilters(formValues);
                                          onDropDownChange(keyName, formValues);
                                        }
                                      }}
                                      renderInput={(params: AutocompleteRenderInputParams) => (
                                        <MuiTextField {...params} label={eachItem.display} variant="outlined" />
                                      )}
                                    />
                                  </Grid>
                                );
                              } else {
                                return false;
                              }
                            })}
                        </Grid>
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          spacing={3}
                          style={{ padding: '4px', marginTop: '1rem', marginBottom: '-2.5rem' }}
                        >
                          <Grid item>
                            <Button
                              type="submit"
                              color="primary"
                              variant="outlined"
                              size="large"
                              disabled={productTypeId == 0}
                              style={{
                                fontWeight: 'bold',
                                fontSize: 10,
                                padding: '15px 20px',
                                margin: '0 10px 0px',
                              }}
                            >
                              Submit
                            </Button>

                            <Button
                              type="button"
                              color="primary"
                              variant="outlined"
                              size="large"
                              disabled={productTypeId == 0}
                              style={{
                                fontWeight: 'bold',
                                fontSize: 10,
                                padding: '15px 20px',
                                margin: '0 10px 0px',
                              }}
                            >
                              Add Product Subtype
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </FiltersWrapper>
            <TableWrapper>
              {isDashboardSuccess && tableData.rows.length > 0 && <HSTableV1 {...tableData} />}
            </TableWrapper>
          </DashBoardWrapper>
        </Route>
      </Switch>
    </>
  );
};

export default ProductSubtypeDashboard;
