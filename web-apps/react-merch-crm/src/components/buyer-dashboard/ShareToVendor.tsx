import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { TextField } from 'formik-material-ui';
import { Grid, Paper, Button, TextField as MuiTextField, IconButton } from '@material-ui/core';
import { buyerService } from '@hs/services';
import { useQuery } from 'react-query';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  IVendors,
  IVendorsOption,
  IVendorDetailsResponse,
  IVendorDetailsEntity,
  IVendorDetails,
  ISendemail,
  ShareToVendorProps,
} from './IShareToVendor';
import * as Yup from 'yup';
import Categories from './categories';
import { Helmet } from 'react-helmet';
const validationSchema = Yup.object().shape({
  vendor: Yup.string().required('Please select vendor'),
  emailIds: Yup.array()
    .of(Yup.string().email('Email is invalid').required('Email is required'))
    .min(1, 'Minimum 1 email is required'),
  vendorDetails: Yup.array()
    .of(
      Yup.object().shape({
        categoryId: Yup.string().required('Please select category'),
        subCategoryId: Yup.string().required('Please select sub category'),
        productTypeId: Yup.string().required('Please select product type'),
      }),
    )
    .min(1, 'Minimum 1 vendor is required'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  displayFlex: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  header: {
    fontSize: 18,
    margin: 20,
  },
  filters: {
    paddingBottom: theme.spacing(2),
  },
  emailIds: {
    alignItems: 'center',
    padding: theme.spacing(0),
    marginBottom: 10,
  },
  vendorDetails: {
    alignItems: 'center',
    marginBottom: 10,
  },
  addAndSubmit: {
    fontWeight: 'bold',
    fontSize: 10,
    padding: '15px 20px',
  },
  shareToVendor: {
    padding: '4px',
    marginTop: '1rem',
    marginBottom: '-2.5rem',
  },
  p10: {
    padding: 10,
  },
  pb0: {
    paddingBottom: 0,
  },
}));

const ShareToVendorWrapper = styled.div`
  margin-left: 90px;
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

const vendorDetailsObject: Array<IVendorDetailsEntity> = [
  {
    categoryId: undefined,
    subCategoryId: undefined,
    productTypeId: [],
  },
];
const vendorFormvalues: IVendorDetails = {
  vendor: '',
  emailIds: [],
  vendorDetails: vendorDetailsObject,
};
const ShareToVendor: FC<ShareToVendorProps> = ({ header }: ShareToVendorProps) => {
  const classes = useStyles();
  const { data: vendors, isLoading: isVendorsLoading } = useQuery<IVendors, Record<string, string>>(
    'vendors',
    buyerService.getVendorList,
    {
      staleTime: Infinity,
      onError: (error: Record<string, string>) => {
        showError(error);
      },
    },
  );
  const [initialValues, setInitialValues] = useState<IVendorDetails>(vendorFormvalues);
  const [vendor, setVendorId] = useState<IVendorsOption | undefined>();

  const {
    data: vendorDetails,
    isSuccess: isVendorDetailsSuccess,
    isFetching: isVendorDetailsFetching,
  } = useQuery<IVendorDetailsResponse, Record<string, string>>(
    ['vendorId', vendor],
    () =>
      buyerService.getTableData({
        action: 'buyerDashboardGetVendorDetails',
        vendor_id: vendor?.id,
      }),
    {
      staleTime: 2000,
      retry: false,
      enabled: Boolean(vendor?.id),
      onError: (error: Record<string, string>) => {
        showError(error);
      },
    },
  );

  useEffect(() => {
    if (isVendorDetailsSuccess && vendorDetails) {
      setInitialValues({ ...vendorDetails.data, vendor });
    }
  }, [vendorDetails, isVendorDetailsSuccess]);

  return (
    <ShareToVendorWrapper>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1 className={classes.header}>{header}</h1>
      <FiltersWrapper className={classes.root}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            (async () => {
              try {
                const sendEmail: ISendemail = await buyerService.postData(
                  { action: 'buyerEmailAlert' },
                  {
                    ...values,
                    vendorId: vendor?.id,
                    vendor: undefined,
                  },
                );
                actions.setSubmitting(false);
                if (sendEmail.action === 'SUCCESS') {
                  setVendorId(undefined);
                  setInitialValues(vendorFormvalues);
                  toast.success(sendEmail.message || 'Send email successfully');
                } else {
                  toast.error(sendEmail.message);
                }
              } catch (error) {
                showError(error);
                actions.setSubmitting(false);
              }
            })();
          }}
        >
          {({ values, setFieldValue, isSubmitting, isValid, dirty, touched }) => (
            <Form autoComplete="off">
              <Grid container direction="column" justify="center" spacing={3}>
                <Paper className={clsx(classes.paper, classes.filters)} variant="outlined">
                  <Grid container direction="column" justify="center" spacing={3} className={classes.shareToVendor}>
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
                        onChange={(_evt: React.ChangeEvent, newVal: IVendorsOption) => {
                          setFieldValue('vendor', newVal || null);
                          setVendorId(newVal);
                        }}
                        getOptionLabel={(option: IVendorsOption) => option.display || ''}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                          <MuiTextField {...params} label="Select Vendor" variant="outlined" />
                        )}
                      />
                    </Grid>
                    {isVendorDetailsSuccess && (
                      <>
                        <Grid className={clsx(classes.p10, classes.pb0)}>
                          <FieldArray name="emailIds">
                            {({ remove, push }) => (
                              <Grid>
                                {values.emailIds.length > 0 &&
                                  values.emailIds.map((email, index) => (
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
                                          name={`emailIds.${index}`}
                                          type="text"
                                          label="Email"
                                          variant={'outlined'}
                                        />
                                      </Grid>
                                      <Grid item xs={1}>
                                        <Button
                                          type="button"
                                          variant="outlined"
                                          color="primary"
                                          className={classes.addAndSubmit}
                                          onClick={() => remove(index)}
                                        >
                                          Remove
                                          <IconButton aria-label="Email" color="primary" size="small">
                                            <DeleteOutlineIcon />
                                          </IconButton>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  ))}
                                <Grid item xs={2} className={classes.displayFlex}>
                                  <Button
                                    type="button"
                                    variant="outlined"
                                    color="primary"
                                    className={classes.addAndSubmit}
                                    onClick={() => push('')}
                                  >
                                    Add Email
                                    <IconButton aria-label="Email" color="primary" size="small">
                                      <MailOutlineIcon />
                                    </IconButton>
                                  </Button>
                                </Grid>
                              </Grid>
                            )}
                          </FieldArray>
                        </Grid>
                        <Grid className={classes.p10}>
                          <FieldArray name="vendorDetails">
                            {({ remove, push }) => (
                              <Grid>
                                {values.vendorDetails.length > 0 &&
                                  values.vendorDetails.map((vendor, index) => (
                                    <Grid
                                      container
                                      direction="row"
                                      justify="flex-start"
                                      spacing={3}
                                      key={`vendor${index}`}
                                      className={classes.vendorDetails}
                                    >
                                      <Categories
                                        disabled={
                                          values.vendorDetails.length > 0 && index != values.vendorDetails.length - 1
                                        }
                                        categoryIdName={`vendorDetails.${index}.categoryId`}
                                        subCategoryIdName={`vendorDetails.${index}.subCategoryId`}
                                        productTypeIdName={`vendorDetails.${index}.productTypeId`}
                                        values={values.vendorDetails[index]}
                                      />
                                      <Grid item xs={2}>
                                        <Button
                                          type="button"
                                          variant="outlined"
                                          color="primary"
                                          className={classes.addAndSubmit}
                                          onClick={() => {
                                            remove(index);
                                          }}
                                        >
                                          Remove
                                          <IconButton aria-label="Email" color="primary" size="small">
                                            <DeleteOutlineIcon />
                                          </IconButton>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  ))}
                                <Grid item className={classes.displayFlex}>
                                  <Button
                                    type="button"
                                    variant="outlined"
                                    color="primary"
                                    className={classes.addAndSubmit}
                                    disabled={
                                      !!(
                                        values.vendorDetails &&
                                        values.vendorDetails.length &&
                                        !values.vendorDetails[values.vendorDetails.length - 1].productTypeId.length
                                      )
                                    }
                                    onClick={() => {
                                      push({ categoryId: undefined, subCategoryId: undefined, productTypeId: [] });
                                    }}
                                  >
                                    Add Products
                                  </Button>
                                </Grid>
                              </Grid>
                            )}
                          </FieldArray>
                          <Grid item>
                            <Button
                              type="submit"
                              color="primary"
                              variant="outlined"
                              className={classes.addAndSubmit}
                              disabled={
                                isSubmitting ||
                                !isValid ||
                                !dirty ||
                                !touched ||
                                !!(
                                  values.vendorDetails &&
                                  values.vendorDetails.length &&
                                  !values.vendorDetails[values.vendorDetails.length - 1].productTypeId.length
                                )
                              }
                            >
                              Share
                            </Button>
                          </Grid>
                        </Grid>
                      </>
                    )}
                    {isVendorDetailsFetching && <h5>Loading...</h5>}
                    {!initialValues.vendor && <h5>Please select vendor</h5>}
                  </Grid>
                </Paper>
              </Grid>
            </Form>
          )}
        </Formik>
      </FiltersWrapper>
    </ShareToVendorWrapper>
  );
};
export default ShareToVendor;
