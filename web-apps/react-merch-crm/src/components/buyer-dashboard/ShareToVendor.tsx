import React, { useState } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import { TextField } from 'formik-material-ui';
import { Grid, Paper, Button, TextField as MuiTextField } from '@material-ui/core';
import { buyerService } from '@hs/services';
import { useCategory } from '@hs/hooks';
import { useQuery } from 'react-query';
import { IVendors, IVendorsOption, OptionsType } from './IShareToVendor';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  vendor: Yup.string().required('Please select vendor'),
  emailIds: Yup.array().of(Yup.string().email('Email is invalid').required('Email is required')),
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
  vendorDetails: {
    alignItems: 'center',
    marginBottom: 10,
  },
  addAndSubmit: {
    fontWeight: 'bold',
    fontSize: 10,
    padding: '15px 20px',
    width: '100%',
  },
  shareToVendor: {
    padding: '4px',
    marginTop: '1rem',
    marginBottom: '-2.5rem',
  },
  p10: {
    padding: 10,
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
  emailIds: [],
  vendorDetails: [
    {
      categoryId: {},
      subCategoryId: {},
      productTypeId: [],
    },
  ],
};
const ShareToVendor = () => {
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
  const [categoryId, setCategoryId] = useState<number>();
  const [subCategoryId, setSubCategoryId] = useState<number>();
  const { categoryList, isCategoryListLoading, subCategoryList, isSubCategoryListLoading, pTList, isPTLoading } =
    useCategory({
      categoryId,
      subCategoryId,
    });

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
                          onChange={(_evt: React.ChangeEvent, actionvalue: IVendorsOption) => {
                            setFieldValue('emailIds', [actionvalue?.email]);
                          }}
                          getOptionLabel={(option: IVendorsOption) => option.display || ''}
                          renderInput={(params: AutocompleteRenderInputParams) => (
                            <MuiTextField {...params} label="Select Vendor" variant="outlined" />
                          )}
                        />
                      </Grid>
                      <Grid className={classes.p10}>
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
                                    <Grid item xs={3}>
                                      <Button
                                        type="button"
                                        variant="outlined"
                                        size="large"
                                        className={clsx('secondary', classes.addAndSubmit)}
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
                                  variant="outlined"
                                  size="large"
                                  className={clsx('secondary', classes.addAndSubmit)}
                                  onClick={() => push('')}
                                >
                                  Add Email
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
                                values.vendorDetails.map((email, index) => (
                                  <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    spacing={3}
                                    key={`vendor${index}`}
                                    className={classes.vendorDetails}
                                  >
                                    <Grid item xs={3}>
                                      <Field
                                        id={`category.${index}`}
                                        name={`vendorDetails.${index}.categoryId`}
                                        variant="standard"
                                        label="Category"
                                        component={Autocomplete}
                                        options={categoryList || []}
                                        loading={isCategoryListLoading}
                                        value={values.vendorDetails[index].categoryId || null}
                                        getOptionLabel={(option: OptionsType) => option.name || ''}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionsType) => {
                                          if (event) {
                                            setFieldValue(`vendorDetails.${index}.categoryId`, newVal);
                                            setFieldValue(`vendorDetails.${index}.subCategoryId`, {});
                                            setFieldValue(`vendorDetails.${index}.productTypeId`, []);
                                          }
                                        }}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                          <MuiTextField {...params} label={'Category'} variant="outlined" />
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Field
                                        name={`vendorDetails.${index}.subCategoryId`}
                                        variant="standard"
                                        label="Sub Category"
                                        component={Autocomplete}
                                        options={subCategoryList || []}
                                        loading={isSubCategoryListLoading}
                                        value={values.vendorDetails[index].subCategoryId || null}
                                        onOpen={() => {
                                          const category: Record<string, number> =
                                            values.vendorDetails[index].categoryId;
                                          if (category && category.id) {
                                            setCategoryId(category.id);
                                          }
                                        }}
                                        getOptionLabel={(option: OptionsType) => option.name || ''}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionsType) => {
                                          if (event) {
                                            setFieldValue(`vendorDetails.${index}.subCategoryId`, newVal);
                                            setFieldValue(`vendorDetails.${index}.productTypeId`, []);
                                          }
                                        }}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                          <MuiTextField {...params} label={'Sub Category'} variant="outlined" />
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Field
                                        name={`vendorDetails.${index}.productTypeId`}
                                        variant="standard"
                                        label="Product types"
                                        multiple
                                        component={Autocomplete}
                                        options={pTList || []}
                                        loading={isPTLoading}
                                        onOpen={() => {
                                          const product: Record<string, number> =
                                            values.vendorDetails[index].subCategoryId;
                                          if (product && product.id) {
                                            setSubCategoryId(product.id);
                                          }
                                        }}
                                        getOptionLabel={(option: OptionsType) => option.name || ''}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionsType) => {
                                          if (event) {
                                            setFieldValue(`vendorDetails.${index}.productTypeId`, newVal);
                                          }
                                        }}
                                        renderInput={(params: AutocompleteRenderInputParams) => (
                                          <MuiTextField {...params} label={'Product types'} variant="outlined" />
                                        )}
                                      />
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Button
                                        type="button"
                                        variant="outlined"
                                        size="large"
                                        className={clsx('secondary', classes.addAndSubmit)}
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
                                  variant="outlined"
                                  size="large"
                                  className={clsx('secondary', classes.addAndSubmit)}
                                  onClick={() => push({ categoryId: {}, subCategoryId: {}, productTypeId: [] })}
                                >
                                  Add Products
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
                          className={classes.addAndSubmit}
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
