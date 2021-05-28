import React from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { TextField } from 'formik-material-ui';
import { Grid, Paper, Button, TextField as MuiTextField } from '@material-ui/core';
import { buyerService } from '@hs/services';
import { useQuery } from 'react-query';
import { IVendors, IVendorsOption } from './IShareToVendor';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  vendor: Yup.string().required('Please select vendor'),
  email_ids: Yup.array().of(Yup.string().email('Email is invalid').required('Email is required')),
});

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
  },
  header: {
    margin: 10,
    fontSize: 28,
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
  emailIds: {
    alignItems: 'center',
    padding: theme.spacing(0),
    marginBottom: 10,
  },
}));

const ShareToVendorWrapper = styled.div`
  width: 95%;
  margin: 10px 10px 10px 90px;
`;

const FiltersWrapper = styled.div`
  width: 80%;
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

const initialValues = {
  vendor: '',
  email_ids: [],
};
const ShareToVendor = () => {
  const classes = useStyles();
  const { data: vendors, isFetching: isVendorsLoading } = useQuery<IVendors, Record<string, string>>(
    'vendors',
    buyerService.getVendorList,
    {
      staleTime: Infinity,
      onError: (error: Record<string, string>) => {
        showError(error);
      },
    },
  );
  return (
    <>
      <ShareToVendorWrapper>
        <h1>Share Gap to vendor</h1>
        <FiltersWrapper className={classes.root}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form autoComplete="off">
                <Grid container direction="column" justify="center" spacing={3}>
                  <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      spacing={3}
                      style={{
                        padding: '4px',
                        marginTop: '1rem',
                        marginBottom: '-2.5rem',
                      }}
                    >
                      <Grid item xs>
                        <Field
                          name="vendor"
                          label="Select Vendor"
                          variant="standard"
                          component={Autocomplete}
                          options={(vendors && vendors.vendorList) || []}
                          loading={isVendorsLoading}
                          getOptionSelected={(option: IVendorsOption, selectedValue: IVendorsOption) =>
                            option.id == selectedValue?.id || {}
                          }
                          onChange={(_evt: React.ChangeEvent, actionvalue: IVendorsOption) => {
                            setFieldValue('email_ids', [actionvalue?.email]);
                          }}
                          getOptionLabel={(option: IVendorsOption) => option.display || ''}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label="Select Vendor" variant="outlined" />
                          )}
                        />
                      </Grid>
                      <Grid style={{ padding: 10 }}>
                        <FieldArray name="email_ids">
                          {({ remove, push }) => (
                            <Grid>
                              {values.email_ids.length > 0 &&
                                values.email_ids.map((email, index) => (
                                  <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    spacing={3}
                                    key={index}
                                    className={classes.emailIds}
                                  >
                                    <Grid item xs={6}>
                                      <Field
                                        component={TextField}
                                        fullWidth
                                        name={`email_ids.${index}`}
                                        type="text"
                                        label="Email"
                                        variant={'outlined'}
                                      />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Button
                                        type="button"
                                        className="secondary"
                                        variant="outlined"
                                        size="large"
                                        style={{
                                          fontWeight: 'bold',
                                          fontSize: 10,
                                          padding: '15px 20px',
                                          width: '100%',
                                        }}
                                        onClick={() => remove(index)}
                                      >
                                        X
                                      </Button>
                                    </Grid>
                                  </Grid>
                                ))}
                              <Grid item>
                                <Button
                                  type="button"
                                  className="secondary"
                                  variant="outlined"
                                  size="large"
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: 10,
                                    padding: '15px 20px',
                                    width: '100%',
                                  }}
                                  onClick={() => push('')}
                                >
                                  Add Email
                                </Button>
                              </Grid>
                            </Grid>
                          )}
                        </FieldArray>
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                          size="large"
                          style={{
                            fontWeight: 'bold',
                            fontSize: 10,
                            padding: '15px 20px',
                            width: '100%',
                          }}
                        >
                          Share
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <pre>{JSON.stringify(values)}</pre>
              </Form>
            )}
          </Formik>
        </FiltersWrapper>
      </ShareToVendorWrapper>
    </>
  );
};
export default ShareToVendor;
