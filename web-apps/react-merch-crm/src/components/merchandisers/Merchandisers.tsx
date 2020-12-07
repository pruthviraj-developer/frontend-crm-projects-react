import React, { useEffect } from 'react';
import { FC, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { toast } from 'react-toastify';
import {
  TextField,
  TextField as MuiTextField,
  Grid,
  Card,
  CardContent,
  makeStyles,
  MenuItem,
  Paper,
  Button,
} from '@material-ui/core';

import { HSTableV2, HsTableV2Props, tableRowsV2 } from '@hs/components';
import {
  merchandisersService,
  merchandisersFiltersObject,
  merchandisersDropDownObject,
  merchandisersFormFilters,
  merchandisersOptionalFormFilters,
} from '@hs/services';
import { apiErrorMessage } from '@hs/utils';
import { DatePicker } from 'formik-material-ui-pickers';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles({
  textFieldWidth: {
    minWidth: 250,
    margin: '5px 0',
  },
  filtersPadding: {
    padding: '10px 20px',
    margin: '5px 0',
  },
  clearFilters: {
    fontSize: '12px',
    marginTop: '5px',
    padding: '10px 0',
  },
});

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;
const DashBoard = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const StyledCard = styled(Card)`
  min-width: 450px;
  max-width: 450px;
`;
const FiltersTitle = styled.h5`
  margin-top: 0px;
`;
const ProductLaunchDate = styled.h5`
  margin: 5px 0 0 0;
`;

const defaultFilterValues = {
  age: null,
  country: null,
  status: null,
  sourcing_stage: null,
  category_id: null,
  vendor_id: null,
  brand_id: null,
  gender: null,
  sub_category_ids: [],
  product_class_ids: [],
  start_date: null,
  end_date: null,
};
const Merchandisers: FC = () => {
  const [initialValues, setInitialValues] = useState<merchandisersFormFilters>(defaultFilterValues);
  const [disableExport, setDisableExport] = useState<boolean>(true);
  const values = initialValues;

  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<string>('Loading');
  const [merchandisersData, setMerchandisersData] = useState<Array<tableRowsV2>>([]);
  const [merchandisersFiltersData, setMerchandisersFiltersData] = useState<merchandisersFiltersObject>({});
  const formatedJsonObject: Record<string, Record<string, number>> = {};
  const tableColumns: Array<string> = ["PID's", 'Status', 'Priority', 'Action'];
  const classes = useStyles();
  const setToaster = (toasterType: Record<string, string>) => {
    if (toasterType.type === 'error') {
      toast.error(toasterType.message);
    } else {
      toast(toasterType.message);
    }
  };

  const compare = (a: tableRowsV2, b: tableRowsV2): number => {
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  };
  const tableRows: Array<tableRowsV2> = merchandisersData.sort(compare);

  const getFormatedFilters = (data?: merchandisersFormFilters) => {
    const postObject: merchandisersFormFilters = data ? { ...data } : { ...values };
    const editedObject: Record<string, unknown> = { ...postObject };
    if (postObject.brand_id) {
      editedObject.brand_id = postObject.brand_id.key;
    }
    if (postObject.vendor_id) {
      editedObject.vendor_id = postObject.vendor_id.key;
    }
    if (postObject['sub_category_ids'].length) {
      editedObject['sub_category_ids'] = postObject['sub_category_ids'].map(
        (obj: merchandisersDropDownObject) => obj.key,
      );
    } else {
      delete editedObject['sub_category_ids'];
    }
    if (postObject['product_class_ids'].length) {
      editedObject['product_class_ids'] = postObject['product_class_ids'].map(
        (obj: merchandisersDropDownObject) => obj.key,
      );
    } else {
      delete editedObject['product_class_ids'];
    }
    return editedObject;
  };

  const showError = useCallback((error: apiErrorMessage) => {
    let message = 'Try Later';
    const errorStatus = error && error.status;
    if (errorStatus) {
      if (errorStatus.toLowerCase && errorStatus.toLowerCase() === 'failure') {
        message = error.errorMessage;
      }
    } else if (error && error.error) {
      message = error.error;
    } else if (error && error.message) {
      message = error.message;
    }
    return setToaster({
      type: 'error',
      message: message,
    });
  }, []);

  const getDashboardTableData = useCallback(() => {
    (async () => {
      const setErrorMessage = () => {
        setMerchandisersData([]);
        setStatus('No Data');
        setCount(0);
      };
      try {
        const response = await merchandisersService.getTableData();
        const responseData = response ? response.data : { product_detail: [] };
        const productDetails = responseData.product_detail;
        if (productDetails.length) {
          setMerchandisersData(productDetails);
          setCount(productDetails.length);
        } else {
          setErrorMessage();
        }
      } catch (error) {
        showError(error.data);
        setErrorMessage();
      }
    })();
  }, [showError]);

  const getFilteredNonNullValues = (filteredValues: merchandisersOptionalFormFilters) => {
    const filters: merchandisersOptionalFormFilters = Object.entries(filteredValues).reduce(
      (obj: Record<string, unknown>, entry) => {
        const [key, value] = entry;
        if (value && value !== null) {
          obj[key] = value;
        }
        return obj;
      },
      {},
    );
    if (filters.start_date) {
      filters.start_date = format(new Date(filters.start_date), 'yyyy-MM-dd');
    }
    if (filters.end_date) {
      filters.end_date = format(new Date(filters.end_date), 'yyyy-MM-dd');
    }
    return filters;
  };

  const exportColumn = (row: tableRowsV2) => {
    const filteredValues: Record<string, unknown> = getFormatedFilters();
    (async () => {
      try {
        const params = getFilteredNonNullValues(filteredValues);
        const response = await merchandisersService.downloadTemplate({ ...params, status_type: row.status });
        const templateDetails = response && response.data;
        if (templateDetails.sheetKey) {
          try {
            const templateObject = await merchandisersService.getTemplateDownloadLink({
              sheetKey: templateDetails.sheetKey,
            });
            if (templateObject.isAvailable) {
              window.open(templateObject.url);
            } else {
              toast.warn('Template does not exist.');
            }
          } catch (e) {
            toast.error('Error getting template url');
          }
        } else {
          toast.warn('Template does not exist.');
        }
      } catch (error) {
        const errorObject = error.error || {};
        showError(errorObject);
      }
    })();
  };

  tableRows.forEach((element, index) => {
    if (formatedJsonObject[element.status]) {
      formatedJsonObject[element.status]['count'] += 1;
    } else {
      formatedJsonObject[element.status] = {
        count: 1,
        index,
      };
    }
  });
  for (const key in formatedJsonObject) {
    const element = formatedJsonObject[key];
    tableRows[element.index]['rowSpan'] = element.count;
  }

  const tableDataV2: HsTableV2Props = {
    columns: tableColumns,
    rows: tableRows,
    disableExport: disableExport,
    exportColumn: exportColumn,
  };

  const getFiltersDropDownValues = (list: Array<merchandisersDropDownObject>, isNoneRequired = true) => {
    const withOptions: Array<merchandisersDropDownObject> = [
      { key: '', value: 'None', second: '', first: '' },
      ...list,
    ];
    const optionList = isNoneRequired ? withOptions : list;
    return optionList.map((item: merchandisersDropDownObject) => (
      <MenuItem key={item.key} value={item.key}>
        {item.value}
      </MenuItem>
    ));
  };

  const getSubCategories = (id: string) => {
    const setValues = (overWriteValues: Record<string, unknown>) => {
      const values = { ...initialValues, ...overWriteValues, category_id: id };
      setInitialValues(values);
      getTableDataWithFilters(values);
    };
    if (id) {
      (async () => {
        try {
          const caterogies = await merchandisersService.getSubCategories({ 'category-id': id });
          if (caterogies) {
            setMerchandisersFiltersData({
              ...merchandisersFiltersData,
              sub_category_ids: caterogies,
              product_class_ids: [],
            });
            setValues({ sub_category_ids: [], product_class_ids: [] });
          } else {
            showError({
              status: 'failure',
              errorMessage: 'Sub Categories not available',
            });
            setValues({});
          }
        } catch (error) {
          showError(error);
        }
      })();
    } else {
      setMerchandisersFiltersData({ ...merchandisersFiltersData, sub_category_ids: [], product_class_ids: [] });
      setValues({ sub_category_ids: [], product_class_ids: [] });
    }
  };

  const onSubCategoryChange = (event: merchandisersDropDownObject, values: Array<merchandisersDropDownObject>) => {
    const sub_category_ids: Array<merchandisersDropDownObject> = [...values];
    const setValues = (overWriteValues: Record<string, unknown>) => {
      const values = { ...initialValues, ...overWriteValues, sub_category_ids: sub_category_ids };
      setInitialValues(values);
      getTableDataWithFilters(values);
    };
    if (event && values.length) {
      (async () => {
        try {
          const subCategory = sub_category_ids.map((obj) => obj.key);
          const productTypes = await merchandisersService.getProductTypes({ 'sub-category-ids': subCategory });
          if (productTypes) {
            setMerchandisersFiltersData({ ...merchandisersFiltersData, product_class_ids: productTypes });
            setValues({ product_class_ids: [] });
          } else {
            showError({
              status: 'failure',
              errorMessage: 'Product types not available',
            });
            setValues({});
          }
        } catch (error) {
          showError(error);
        }
      })();
    } else {
      setMerchandisersFiltersData({ ...merchandisersFiltersData, product_class_ids: [] });
      setValues({ product_class_ids: [] });
    }
  };

  const getTableDataWithFilters = (data: merchandisersFormFilters) => {
    const filteredValues: merchandisersOptionalFormFilters = getFormatedFilters(data);
    const params = getFilteredNonNullValues(filteredValues) || {};
    if (Object.keys(params).length) {
      (async () => {
        const setErrorMessage = () => {
          setMerchandisersData([]);
          setStatus('No Data');
          setCount(0);
        };
        try {
          const response = await merchandisersService.getTableDataWithFilters(params);
          const responseData = response ? response.data : { product_detail: [] };
          const productDetails = responseData.product_detail;
          if (productDetails.length) {
            setMerchandisersData(productDetails);
            setCount(productDetails.length);
          } else {
            setErrorMessage();
          }
        } catch (error) {
          showError(error.data);
          setErrorMessage();
        }
      })();
    } else {
      getDashboardTableData();
    }
  };

  const clearFilters = () => {
    setInitialValues(defaultFilterValues);
    setDisableExport(true);
    getDashboardTableData();
  };
  useEffect(
    function () {
      (async () => {
        try {
          const response = await merchandisersService.getFiltersData();
          if (response) {
            setMerchandisersFiltersData(response);
          } else {
            showError({
              status: 'failure',
              errorMessage: 'Filters not available',
            });
          }
        } catch (error) {
          showError(error.data);
        }
      })();
      getDashboardTableData();
    },
    [showError, getDashboardTableData],
  );

  return (
    <DashBoardWrapper>
      <h1>Merchandisers DashBoard</h1>
      <DashBoard>
        {count > 0 && <HSTableV2 {...tableDataV2} />}
        {count === 0 && <h5> {status}</h5>}
        <StyledCard variant="outlined" raised>
          <Formik
            enableReinitialize={true}
            initialValues={values}
            onSubmit={(values: merchandisersFormFilters, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form autoComplete="off">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <CardContent>
                    <FiltersTitle>Filters</FiltersTitle>
                    <Grid container direction="column" justify="center" spacing={1}>
                      <Paper variant="outlined" className={classes.filtersPadding}>
                        <Grid item className={classes.textFieldWidth}>
                          <Field
                            component={TextField}
                            required
                            type="text"
                            name="country"
                            label="Sourcing Country"
                            fullWidth
                            value={values.country ? values.country : ''}
                            select
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                              const selectedValues = { ...initialValues, country: evt.target.value };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                              setDisableExport(false);
                            }}
                            inputProps={{
                              id: 'outlined-select',
                            }}
                            variant={'outlined'}
                          >
                            {getFiltersDropDownValues(merchandisersFiltersData.country || [], false)}
                          </Field>
                        </Grid>
                      </Paper>
                      <Paper variant="outlined" className={classes.filtersPadding}>
                        <Grid item className={classes.textFieldWidth}>
                          <Field
                            name="vendor_id"
                            variant="standard"
                            component={Autocomplete}
                            getOptionSelected={(
                              option: merchandisersDropDownObject,
                              selectedValue: merchandisersDropDownObject,
                            ) => option.key === selectedValue?.key}
                            onChange={(
                              evt: React.ChangeEvent<HTMLInputElement>,
                              values: merchandisersDropDownObject,
                            ) => {
                              if (evt) {
                                const selectedValues = { ...initialValues, vendor_id: values };
                                setInitialValues(selectedValues);
                                getTableDataWithFilters(selectedValues);
                              }
                            }}
                            options={merchandisersFiltersData.vendor_id || []}
                            getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                              <MuiTextField {...params} label="Vendor" variant="outlined" />
                            )}
                          />
                        </Grid>
                        <Grid item className={classes.textFieldWidth}>
                          <Field
                            name="brand_id"
                            variant="standard"
                            component={Autocomplete}
                            getOptionSelected={(
                              option: merchandisersDropDownObject,
                              selectedValue: merchandisersDropDownObject,
                            ) => option.key === selectedValue?.key}
                            onChange={(
                              evt: React.ChangeEvent<HTMLInputElement>,
                              values: merchandisersDropDownObject,
                            ) => {
                              if (evt) {
                                const selectedValues = { ...initialValues, brand_id: values };
                                setInitialValues(selectedValues);
                                getTableDataWithFilters(selectedValues);
                              }
                            }}
                            options={merchandisersFiltersData.brand_id || []}
                            getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                              <MuiTextField {...params} label="Brand" variant="outlined" />
                            )}
                          />
                        </Grid>
                      </Paper>
                      <Paper variant="outlined" className={classes.filtersPadding}>
                        <Grid item>
                          <Field
                            component={TextField}
                            type="text"
                            name="category_id"
                            label="Category"
                            fullWidth
                            value={values.category_id ? values.category_id : ''}
                            select
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                              getSubCategories(evt.target.value);
                            }}
                            inputProps={{
                              id: 'outlined-select',
                            }}
                            variant={'outlined'}
                          >
                            {getFiltersDropDownValues(merchandisersFiltersData.category_id || [])}
                          </Field>
                        </Grid>
                        <Grid item className={classes.textFieldWidth}>
                          <Field
                            multiple
                            name="sub_category_ids"
                            component={Autocomplete}
                            options={merchandisersFiltersData.sub_category_ids || []}
                            onChange={onSubCategoryChange}
                            defaultValue={initialValues.sub_category_ids}
                            getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                              <MuiTextField {...params} label="Sub Category" variant="outlined" />
                            )}
                          />
                        </Grid>
                        <Grid item className={classes.textFieldWidth}>
                          <Field
                            multiple
                            name="product_class_ids"
                            component={Autocomplete}
                            options={merchandisersFiltersData.product_class_ids || []}
                            onChange={(
                              event: merchandisersDropDownObject,
                              values: Array<merchandisersDropDownObject>,
                            ) => {
                              const selectedValues = { ...initialValues, product_class_ids: values };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                            }}
                            defaultValue={initialValues.product_class_ids}
                            getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                            renderInput={(params: AutocompleteRenderInputParams) => (
                              <MuiTextField {...params} label="Product Type" variant="outlined" />
                            )}
                          />
                        </Grid>
                        <Grid item className={classes.textFieldWidth}>
                          <Field
                            component={TextField}
                            type="text"
                            name="gender"
                            label="Gender"
                            fullWidth
                            value={values.gender ? values.gender : ''}
                            select
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                              const selectedValues = { ...initialValues, gender: evt.target.value };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                            }}
                            inputProps={{
                              id: 'outlined-select',
                            }}
                            variant={'outlined'}
                          >
                            {getFiltersDropDownValues(merchandisersFiltersData.gender || [])}
                          </Field>
                        </Grid>
                        <Grid item>
                          <Field
                            component={TextField}
                            type="text"
                            name="age"
                            label="Age"
                            fullWidth
                            value={values.age ? values.age : ''}
                            select
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                              const selectedValues = { ...initialValues, age: evt.target.value };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                            }}
                            inputProps={{
                              id: 'outlined-select',
                            }}
                            variant={'outlined'}
                          >
                            {getFiltersDropDownValues(merchandisersFiltersData.age || [])}
                          </Field>
                        </Grid>
                      </Paper>
                      <Paper variant="outlined" className={classes.filtersPadding}>
                        <Grid item>
                          <Field
                            component={TextField}
                            type="text"
                            name="sourcing_stage"
                            label="Sourcing Stage"
                            fullWidth
                            value={values.sourcing_stage ? values.sourcing_stage : ''}
                            select
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                              const selectedValues = { ...initialValues, sourcing_stage: evt.target.value };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                            }}
                            inputProps={{
                              id: 'outlined-select',
                            }}
                            variant={'outlined'}
                          >
                            {getFiltersDropDownValues(merchandisersFiltersData.sourcing_stage || [])}
                          </Field>
                        </Grid>
                      </Paper>
                      <Paper variant="outlined" className={classes.filtersPadding}>
                        <ProductLaunchDate>Product Launch date</ProductLaunchDate>
                        <Grid item xs>
                          <Field
                            component={DatePicker}
                            format="dd/MM/yyyy"
                            onChange={(event: Date) => {
                              const selectedValues = { ...initialValues, start_date: event };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                            }}
                            fullWidth
                            ampm={false}
                            name="start_date"
                            label="Start Date"
                          />
                        </Grid>
                        <Grid item xs>
                          <Field
                            component={DatePicker}
                            format="dd/MM/yyyy"
                            onChange={(event: Date) => {
                              const selectedValues = { ...initialValues, end_date: event };
                              setInitialValues(selectedValues);
                              getTableDataWithFilters(selectedValues);
                            }}
                            fullWidth
                            ampm={false}
                            name="end_date"
                            label="End Date"
                          />
                        </Grid>
                      </Paper>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.clearFilters}
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </Grid>
                  </CardContent>
                </MuiPickersUtilsProvider>
              </Form>
            )}
          </Formik>
        </StyledCard>
      </DashBoard>
    </DashBoardWrapper>
  );
};

export default Merchandisers;
