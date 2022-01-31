import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { Formik, Form, Field } from 'formik';
import { Grid, Paper, Button, TextField as MuiTextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { useCategory } from '@hs-crm/hooks';
import { IFilters, OptionsType } from './IFilters';
import { FiltersValidationSchema } from './FiltersValidation';
const useFilterStyles = makeStyles({
  paper: {
    padding: 10,
  },
  submit: {
    padding: '15px 20px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
});

const FiltersWrapper = styled.div`
  margin: auto;
  margin-bottom: 1rem;
`;

const initialValues = {
  categoryId: '',
  subCategoryId: '',
};

const Filters: FC<IFilters> = ({ onSubmit }: IFilters) => {
  const filterClasses = useFilterStyles();

  const { categoryList, isCategoryListLoading, setCategoryId, subCategoryList, isSubCategoryListLoading } = useCategory(
    {},
  );

  return (
    <FiltersWrapper>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={FiltersValidationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ setFieldValue, values, touched, errors, isValid, dirty }) => (
          <Form autoComplete="off">
            <Paper className={filterClasses.paper} variant="outlined">
              <Grid container direction="row" justify="center" spacing={3} key={`categoryfilters`}>
                <Grid item xs={3}>
                  <Field
                    id="categoryId"
                    name="categoryId"
                    variant="standard"
                    label="Category"
                    component={Autocomplete}
                    options={categoryList || []}
                    loading={isCategoryListLoading}
                    getOptionLabel={(option: OptionsType) => option.name || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionsType) => {
                      const id: number | undefined = (newVal && newVal.id) || undefined;
                      setFieldValue('subCategoryId', null);
                      setCategoryId(id);
                      setFieldValue('categoryId', id ? newVal : null);
                    }}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField {...params} label={'Category'} variant="outlined" />
                    )}
                  />
                </Grid>
                {values.categoryId && subCategoryList && subCategoryList.length > 0 && (
                  <Grid item xs={3}>
                    <Field
                      id="subCategoryId"
                      name="subCategoryId"
                      variant="standard"
                      label="Sub Category"
                      component={Autocomplete}
                      options={subCategoryList || []}
                      loading={isSubCategoryListLoading}
                      getOptionLabel={(option: OptionsType) => option.name || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>, newVal: OptionsType) => {
                        if (event) {
                          setFieldValue(`subCategoryId`, newVal ? newVal : undefined);
                        }
                      }}
                      renderInput={(params: AutocompleteRenderInputParams) => (
                        <MuiTextField
                          {...params}
                          error={touched['subCategoryId'] && !!errors['subCategoryId']}
                          helperText={touched['subCategoryId'] && errors['subCategoryId']}
                          label="Sub Category"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={1}>
                  <Button
                    type="submit"
                    variant="outlined"
                    size="large"
                    color="primary"
                    className={filterClasses.submit}
                    disabled={!isValid || !dirty}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </FiltersWrapper>
  );
};
export default Filters;
