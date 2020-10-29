import React, { useEffect } from 'react';
import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';

import {
  TextField,
  TextField as MuiTextField,
  Grid,
  Card,
  CardContent,
  makeStyles,
  Button,
  MenuItem,
} from '@material-ui/core';

import { HsSnackbar, HsSnackbarProps, HSTableV2, HsTableV2Props, tableRowsV2 } from '@hs/components';
import { merchandisersService, merchandisersFiltersObject, merchandisersDropDownObject } from '@hs/services';
import { apiErrorMessage } from '@hs/utils';

interface formFilters {
  age: string | null;
  country: string | null;
  category_id: string | null;
  sub_category_ids?: [];
  product_class_ids?: [];
  vendor_id: merchandisersDropDownObject | null;
  brand_id: merchandisersDropDownObject | null;
  gender: string | null;
  status: string | null;
  bdm_id: string | null;
  sourcing_stage: string | null;
}

const useStyles = makeStyles({
  textFieldWidth: {
    minWidth: 250,
  },
});

const DashBoardWrapper = styled.div`
  margin-left: 90px;
`;
const DashBoard = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const StyledCard = styled(Card)``;
const FiltersTitle = styled.h5`
  margin-top: 0px;
`;
const snackBarProps: Pick<HsSnackbarProps, 'open' | 'type' | 'message'> = {
  open: false,
  type: 'error' as const,
  message: 'Test',
};

const Merchandisers: FC = () => {
  const [initialValues, setInitialValues] = useState<formFilters>({
    age: null,
    country: null,
    status: null,
    sourcing_stage: null,
    category_id: null,
    vendor_id: null,
    brand_id: null,
    gender: null,
    bdm_id: null,
  });

  const values = initialValues;

  const [snackBarError, setSnackBarError] = useState(snackBarProps);
  const [count, setCount] = useState<number>(1);
  const [status, setStatus] = useState<string>('Loading');
  const [merchandisersData, setMerchandisersData] = useState<Array<tableRowsV2>>([]);
  const [merchandisersFiltersData, setMerchandisersFiltersData] = useState<merchandisersFiltersObject>({});
  const formatedJsonObject: Record<string, Record<string, number>> = {};
  const tableColumns: Array<string> = ["PID's", 'Status', 'Priority', 'Action'];
  const classes = useStyles();
  const onSnackBarClose = (open: boolean) => {
    setSnackBarError({ ...snackBarError, open });
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
  };

  const getFiltersDropDownValues = (list: Array<merchandisersDropDownObject>) => {
    return list.map((item: merchandisersDropDownObject) => (
      <MenuItem key={item.key} value={item.key}>
        {item.value}
      </MenuItem>
    ));
  };

  useEffect(function () {
    (async () => {
      const showError = (error: apiErrorMessage) => {
        let message = 'Try Later';
        const status = error.status && error.status.toLowerCase();
        if (status === 'failure') {
          message = error.errorMessage;
        }
        setSnackBarError({
          open: true,
          type: 'error',
          message: message,
        });
      };
      try {
        const response = await merchandisersService.getTableData();
        const responseData = response ? response.data : { product_detail: [] };
        const productDetails = responseData.product_detail;
        if (productDetails.length) {
          setMerchandisersData(productDetails);
          setCount(productDetails.length);
        } else {
          setMerchandisersData([]);
          setStatus('No Data');
        }
      } catch (error) {
        showError(error);
        setStatus('No Data');
      }
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
        showError(error);
      }
    })();
  }, []);

  return (
    <DashBoardWrapper>
      <h1>Merchandisers DashBoard</h1>
      {snackBarError.open && <HsSnackbar {...snackBarError} onSnackBarClose={onSnackBarClose} />}
      <DashBoard>
        {count > 0 && <HSTableV2 {...tableDataV2} />}
        {count === 0 && <h5> {status}</h5>}
        <StyledCard variant="outlined" raised>
          <Formik
            enableReinitialize={true}
            initialValues={values}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              // console.log(values);
            }}
          >
            {/* {({ values, isSubmitting, touched, errors }) => ( */}
            {({ values }) => (
              <Form autoComplete="off">
                <CardContent>
                  <FiltersTitle>Filters</FiltersTitle>
                  <Grid container direction="column" justify="center" spacing={1}>
                    <Grid item className={classes.textFieldWidth}>
                      <Field
                        component={TextField}
                        type="text"
                        name="country"
                        label="Country"
                        fullWidth
                        value={values.country ? values.country : ''}
                        select
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                          setInitialValues({ ...initialValues, country: evt.target.value });
                        }}
                        inputProps={{
                          id: 'outlined-select',
                        }}
                        variant={'outlined'}
                      >
                        {getFiltersDropDownValues(merchandisersFiltersData.country || [])}
                      </Field>
                    </Grid>

                    <Grid item>
                      <Field
                        component={TextField}
                        type="text"
                        name="gender"
                        label="Gender"
                        fullWidth
                        value={values.gender ? values.gender : ''}
                        select
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                          setInitialValues({ ...initialValues, gender: evt.target.value });
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
                          setInitialValues({ ...initialValues, age: evt.target.value });
                        }}
                        inputProps={{
                          id: 'outlined-select',
                        }}
                        variant={'outlined'}
                      >
                        {getFiltersDropDownValues(merchandisersFiltersData.age || [])}
                      </Field>
                    </Grid>

                    <Grid item>
                      <Field
                        component={TextField}
                        type="text"
                        name="status"
                        label="status"
                        fullWidth
                        value={values.status ? values.status : ''}
                        select
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                          setInitialValues({ ...initialValues, status: evt.target.value });
                        }}
                        inputProps={{
                          id: 'outlined-select',
                        }}
                        variant={'outlined'}
                      >
                        {getFiltersDropDownValues(merchandisersFiltersData.status || [])}
                      </Field>
                    </Grid>

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
                          setInitialValues({ ...initialValues, sourcing_stage: evt.target.value });
                        }}
                        inputProps={{
                          id: 'outlined-select',
                        }}
                        variant={'outlined'}
                      >
                        {getFiltersDropDownValues(merchandisersFiltersData.sourcing_stage || [])}
                      </Field>
                    </Grid>
                    <Grid item className={classes.textFieldWidth}>
                      <Field
                        name="vendor_id"
                        variant="standard"
                        component={Autocomplete}
                        getOptionSelected={(
                          option: merchandisersDropDownObject,
                          selectedValue: merchandisersDropDownObject,
                        ) => option.key === selectedValue?.key}
                        options={merchandisersFiltersData.vendor_id || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Select Vender" variant="outlined" />
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
                        options={merchandisersFiltersData.brand_id || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Select Brand" variant="outlined" />
                        )}
                      />
                    </Grid>

                    <Grid item>
                      <Field
                        component={TextField}
                        type="text"
                        name="category_id"
                        label="Category Id"
                        fullWidth
                        value={values.category_id ? values.category_id : ''}
                        select
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                          setInitialValues({ ...initialValues, category_id: evt.target.value });
                        }}
                        inputProps={{
                          id: 'outlined-select',
                        }}
                        variant={'outlined'}
                      >
                        {getFiltersDropDownValues(merchandisersFiltersData.category_id || [])}
                      </Field>
                    </Grid>

                    {/* 
                    <Grid item xs>
                      <Field
                        name="gender"
                        label="Gender"
                        variant="standard"
                        component={Autocomplete}
                        options={merchandisersFiltersData.gender || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Gender" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        name="vendor_id"
                        label="Vender"
                        variant="standard"
                        component={Autocomplete}
                        options={merchandisersFiltersData.vendor_id || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Vender" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        name="brand_id"
                        label="Brand"
                        variant="standard"
                        component={Autocomplete}
                        options={merchandisersFiltersData.brand_id || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Brand" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        name="bdm_id"
                        label="Bdm"
                        variant="standard"
                        component={Autocomplete}
                        options={merchandisersFiltersData.bdm || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Bdm" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        name="category_id"
                        label="Category"
                        variant="standard"
                        component={Autocomplete}
                        options={merchandisersFiltersData.category_id || []}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Category" variant="outlined" />
                        )}
                      />
                    </Grid>
                     */}
                    <Grid item xs>
                      <Button color={'primary'} variant={'contained'} size={'large'} type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Form>
            )}
          </Formik>
        </StyledCard>
      </DashBoard>
    </DashBoardWrapper>
  );
};

export default Merchandisers;
