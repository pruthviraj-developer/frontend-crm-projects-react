import React, { useEffect } from 'react';
import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';

import { TextField as MuiTextField, Grid, Card, CardContent, makeStyles } from '@material-ui/core';

import { HsSnackbar, HsSnackbarProps, HSTableV2, HsTableV2Props, tableRowsV2 } from '@hs/components';
import { merchandisersService, merchandisersFiltersObject } from '@hs/services';
import { apiErrorMessage } from '@hs/utils';

interface formFilters {
  country: [];
  gender: [];
  vender: [];
  category: [];
  bdm: [];
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
  const initialValues: formFilters = { country: [], gender: [], vender: [], category: [], bdm: [] };
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

  const countries = [
    {
      key: 'INDIA',
      value: 'India',
      second: 'India',
      first: 'INDIA',
    },
    {
      key: 'CHINA',
      value: 'China',
      second: 'China',
      first: 'CHINA',
    },
    {
      key: 'US',
      value: 'US',
      second: 'US',
      first: 'US',
    },
  ];

  const genders = [
    {
      key: 'GIRL',
      value: 'Girl',
      second: 'Girl',
      first: 'GIRL',
    },
    {
      key: 'BOY',
      value: 'Boy',
      second: 'Boy',
      first: 'BOY',
    },
  ];

  const vendor_id = [
    {
      key: 12332,
      value: ' Luzi 璐兹',
      second: ' Luzi 璐兹',
      first: 12332,
    },
    {
      key: 13941,
      value: '(SZY)东莞市三只羊服饰有限公司',
      second: '(SZY)东莞市三只羊服饰有限公司',
      first: 13941,
    },
    {
      key: 12841,
      value: '(YWNR)义乌能尔贸易有限公司',
      second: '(YWNR)义乌能尔贸易有限公司',
      first: 12841,
    },
    {
      key: 13472,
      value: '123',
      second: '123',
      first: 13472,
    },
    {
      key: 13283,
      value: '123jia',
      second: '123jia',
      first: 13283,
    },
    {
      key: 11987,
      value: '1908 E-Ventures.com',
      second: '1908 E-Ventures.com',
      first: 11987,
    },
    {
      key: 11343,
      value: '2 Hype Inc.',
      second: '2 Hype Inc.',
      first: 11343,
    },
    {
      key: 10992,
      value: '2 Kool 4 Skool Pty Ltd',
      second: '2 Kool 4 Skool Pty Ltd',
      first: 10992,
    },
    {
      key: 10889,
      value: '21 Trends Private Limited',
      second: '21 Trends Private Limited',
      first: 10889,
    },
    {
      key: 10159,
      value: '21 Trends Private Limited_old',
      second: '21 Trends Private Limited_old',
      first: 10159,
    },
    {
      key: 12391,
      value: '27 kids 邦业制衣厂',
      second: '27 kids 邦业制衣厂',
      first: 12391,
    },
    {
      key: 13114,
      value: '2AM by Anjali and Meha',
      second: '2AM by Anjali and Meha',
      first: 13114,
    },
    {
      key: 10770,
      value: '3 Green Moms',
      second: '3 Green Moms',
      first: 10770,
    },
  ];

  const category_id = [
    {
      key: 367,
      value: 'Accessories - Children',
      second: 'Accessories - Children',
      first: 367,
    },
    {
      key: 377,
      value: 'Accessories - Men',
      second: 'Accessories - Men',
      first: 377,
    },
    {
      key: 364,
      value: 'Accessories - Women',
      second: 'Accessories - Women',
      first: 364,
    },
    {
      key: 373,
      value: 'Apparel - Children',
      second: 'Apparel - Children',
      first: 373,
    },
    {
      key: 376,
      value: 'Apparel - Men',
      second: 'Apparel - Men',
      first: 376,
    },
    {
      key: 368,
      value: 'Apparel - Women',
      second: 'Apparel - Women',
      first: 368,
    },
    {
      key: 873,
      value: 'Baby Care',
      second: 'Baby Care',
      first: 873,
    },
    {
      key: 826,
      value: 'Bags & Luggage Women',
      second: 'Bags & Luggage Women',
      first: 826,
    },
    {
      key: 883,
      value: 'Body & Face Care',
      second: 'Body & Face Care',
      first: 883,
    },
    {
      key: 851,
      value: 'Books',
      second: 'Books',
      first: 851,
    },
    {
      key: 795,
      value: 'Cosmetics',
      second: 'Cosmetics',
      first: 795,
    },
    {
      key: 794,
      value: 'Electronics',
      second: 'Electronics',
      first: 794,
    },
  ];

  const bdm = merchandisersFiltersData.bdm ? merchandisersFiltersData.bdm : [];
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
      // const rowData: Array<tableRowsV2> = [
      //   {
      //     pid_count: '200',
      //     status: 'pending_confirmation',
      //     priority: 'delayed',
      //   },
      //   {
      //     pid_count: '200',
      //     status: 'pending_confirmation',
      //     priority: 'due',
      //   },
      //   {
      //     pid_count: '200',
      //     status: 'pending',
      //     priority: 'due',
      //   },
      //   {
      //     pid_count: '200',
      //     status: 'pending_confirmation',
      //     priority: 'delayed',
      //   },
      //   {
      //     pid_count: '200',
      //     status: 'pending_confirmation',
      //     priority: 'due',
      //   },
      //   {
      //     pid_count: '200',
      //     status: 'pending_confirmation',
      //     priority: 'delayed',
      //   },
      //   {
      //     pid_count: '200',
      //     status: 'pending_confirmation',
      //     priority: 'due',
      //   },
      //   {
      //     pid_count: '201',
      //     status: 'fulfillable',
      //     priority: 'delayed',
      //   },
      //   {
      //     pid_count: '201',
      //     status: 'fulfillable',
      //     priority: 'due',
      //   },
      //   {
      //     pid_count: '202',
      //     status: 'non_fulfillable',
      //     priority: 'delayed',
      //   },
      //   {
      //     pid_count: '202',
      //     status: 'non_fulfillable',
      //     priority: 'due',
      //   },
      //   {
      //     pid_count: '201',
      //     status: 'fulfillable',
      //     priority: 'delayed',
      //   },
      //   {
      //     pid_count: '201',
      //     status: 'fulfillable',
      //     priority: 'due',
      //   },
      // ];
      try {
        const response = await merchandisersService.getTableData();
        const productDetails = response && response.product_detail;
        if (productDetails) {
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
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {/* {({ values, isSubmitting, touched, errors }) => ( */}
            {() => (
              <Form>
                <CardContent>
                  <FiltersTitle>Filters</FiltersTitle>
                  <Grid container direction="column" justify="center" spacing={1}>
                    <Grid item className={classes.textFieldWidth}>
                      <Field
                        multiple
                        name="country"
                        variant="standard"
                        component={Autocomplete}
                        options={countries}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Select Country" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        multiple
                        name="gender"
                        label="Select Gender"
                        variant="standard"
                        component={Autocomplete}
                        options={genders}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Gender" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        multiple
                        name="vender"
                        label="Select Vender"
                        variant="standard"
                        component={Autocomplete}
                        options={vendor_id}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Vender" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        multiple
                        name="category"
                        label="Select Category"
                        variant="standard"
                        component={Autocomplete}
                        options={category_id}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Category" variant="outlined" />
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <Field
                        multiple
                        name="bdm"
                        label="Select Bdm"
                        variant="standard"
                        component={Autocomplete}
                        options={bdm}
                        getOptionLabel={(option: Record<string, unknown>) => (option.value ? option.value : '')}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Bdm" variant="outlined" />
                        )}
                      />
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
