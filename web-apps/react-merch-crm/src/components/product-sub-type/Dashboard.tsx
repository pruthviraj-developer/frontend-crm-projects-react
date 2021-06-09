import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField, Grid, Paper, Button } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { productSubtypeService } from '@hs/services';
import { HSTableV1, HsTablePropsV1 } from '@hs/components';
import { useQuery, useQueryClient } from 'react-query';
import { IDashboardResponse, DashboardData, IPageType, PropsType, OptionType, ISelectedValues } from './IDashboard';
import { useCategory } from './UseCategory.hook';

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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

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
  if (error.action === 'FAILURE' && error.messageList[0]) {
    message = error.messageList[0];
  }
  toast.error(message);
};

const initialValues = {
  productCategoryId: '',
  productSubCategoryId: '',
  productTypeId: '',
};

const defaultPageFilters = { pageSize: 20, pageNo: 0 };

const ProductSubtypeDashboard: FC = () => {
  const classes = useStyles();
  const [postFilterData, setPostFilterData] = useState({});
  const [filterPage, setFilterPage] = useState<IPageType>(defaultPageFilters);

  const queryClient = useQueryClient();

  const [categoryId, setCategoryId] = useState<string | number>('');
  const [subCategoryId, setSubCategoryId] = useState<string | number>('');
  const { categoryList, isCategoryListLoading, subCategoryList, isSubCatLoaded, pTList, isPTLoading } = useCategory({
    categoryId,
    subCategoryId,
  });

  const { data: dashboardData, isSuccess: isDashboardSuccess } = useQuery<IDashboardResponse, Record<string, string>>(
    ['dashboardData', postFilterData, filterPage],
    () => productSubtypeService.getDashboardData({ ...filterPage, pageNo: filterPage.pageNo + 1 }, postFilterData),
    {
      staleTime: 2000,
      onError: (error) => {
        showError(error);
      },
    },
  );
  const handleAction = (data: DashboardData) => {
    const status = {
      action: data.status === 'Y' ? 'DISABLE' : 'ENABLE',
    };
    (async () => {
      try {
        const actionStatus: Record<string, string> = await productSubtypeService.updateAction(
          data.productSubtypeId,
          status,
        );
        if (actionStatus.action === 'SUCCESS') {
          toast.success(actionStatus.messageList[0] || 'Status updated successfully');
          setFilterPage(defaultPageFilters);
          queryClient.invalidateQueries('dashboardData');
          return;
        }
        // showError(actionStatus);
      } catch (error) {
        showError(error);
      }
    })();
  };

  const columns = [
    {
      id: 'productSubtypeID',
      label: 'Id',
      customRender: (row: DashboardData, isTitle?: boolean) => {
        if (isTitle) {
          return row.productSubtypeId;
        }
        if (row) {
          return <>{row.productSubtypeId}</>;
        }
        return '--';
      },
    },
    {
      id: 'productCategoryName',
      label: 'Category',
    },
    {
      id: 'productSubCategoryName',
      label: 'Sub Category',
    },
    { id: 'productTypeName', label: 'Product Type' },
    {
      id: 'productSubtypeName',
      label: 'Product Sub Type',
      customRender: (row: DashboardData, isTitle?: boolean) => {
        if (isTitle) {
          return row.productSubtypeName;
        }
        if (row) {
          if (row.productSubtypeName !== 'Default') {
            return (
              <>
                <NavLink
                  to={{
                    pathname: `edit-product-subtype/${row.productSubtypeId}`,
                  }}
                >
                  {row.productSubtypeName}
                </NavLink>
              </>
            );
          } else {
            return row.productSubtypeName;
          }
        }
        return '--';
      },
    },
    {
      label: 'Action',
      render: (props: PropsType, data: DashboardData) => {
        if (data) {
          return (
            <Button
              variant="contained"
              color={data.status === 'Y' ? 'default' : 'primary'}
              type="button"
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
    fetchTableData: setFilterPage,
  };

  const onFiltersSubmit = (values: ISelectedValues) => {
    const postObject: Record<string, number | string> = {};
    ['productCategoryId', 'productSubCategoryId', 'productTypeId'].forEach((ele: string) => {
      const valueObj: OptionType = values[ele] as OptionType;
      if (valueObj) {
        postObject[ele] = valueObj['key'];
      }
    });
    setFilterPage({ ...defaultPageFilters });
    setPostFilterData({ ...postObject });
  };

  return (
    <>
      <DashBoardWrapper>
        <h1 className={classes.header}>Product SubType Dashboard</h1>
        <FiltersWrapper className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              onFiltersSubmit(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form autoComplete="off">
                <Grid container direction="column" justify="center" spacing={1}>
                  <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                    <Grid container direction="row" justify="center" spacing={2}>
                      <Grid item xs={2} style={{ padding: '4px' }}>
                        <Field
                          id={'productCategoryId'}
                          name={'productCategoryId'}
                          variant="standard"
                          label="Category"
                          component={Autocomplete}
                          options={categoryList || []}
                          loading={isCategoryListLoading}
                          value={values.productCategoryId || null}
                          getOptionLabel={(option: OptionType) => option.value || ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                            if (event) {
                              setFieldValue('productCategoryId', newVal);
                              setFieldValue('productSubCategoryId', '');
                              setFieldValue('productTypeId', '');
                              setCategoryId(newVal?.key || '');
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label={'Category'} variant="outlined" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={2} style={{ padding: '4px' }}>
                        <Field
                          id={'productSubCategoryId'}
                          name={'productSubCategoryId'}
                          variant="standard"
                          label="Sub Category"
                          component={Autocomplete}
                          options={subCategoryList || []}
                          loading={isSubCatLoaded}
                          value={values.productSubCategoryId || null}
                          getOptionLabel={(option: OptionType) => option.value || ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                            if (event) {
                              setFieldValue('productSubCategoryId', newVal);
                              setFieldValue('productTypeId', '');
                              setSubCategoryId(newVal?.key || '');
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label={'Sub Category'} variant="outlined" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={2} style={{ padding: '4px' }}>
                        <Field
                          id={'productTypeId'}
                          name={'productTypeId'}
                          variant="standard"
                          label="Product Sub Type"
                          component={Autocomplete}
                          options={pTList || []}
                          loading={isPTLoading}
                          value={values.productTypeId || null}
                          getOptionLabel={(option: OptionType) => option.value || ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionType) => {
                            if (event) {
                              setFieldValue('productTypeId', newVal);
                            }
                          }}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label={'Product Sub Type'} variant="outlined" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={1} style={{ padding: '4px' }}>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                          size="large"
                          style={{
                            fontWeight: 'bold',
                            fontSize: 10,
                            padding: '15px 20px',
                            margin: '0 10px 0px',
                            width: '100%',
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
              </Form>
            )}
          </Formik>
        </FiltersWrapper>
        <TableWrapper>{isDashboardSuccess && tableData.rows.length > 0 && <HSTableV1 {...tableData} />}</TableWrapper>
      </DashBoardWrapper>
    </>
  );
};

export default ProductSubtypeDashboard;
