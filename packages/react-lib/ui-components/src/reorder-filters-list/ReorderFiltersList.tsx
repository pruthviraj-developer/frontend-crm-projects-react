import React, { FC, useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import styled from '@emotion/styled';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import {
  TextField as MuiTextField,
  Grid,
  makeStyles,
  Paper,
  Button,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { ReoOrderFormValidation } from './ReorderFiltersListValidation';
import {
  ReorderFiltersProps,
  ReorderFiltersOptions,
  ReorderFiltersObjectProps,
} from './IReorderFiltersList';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fullList: {
    width: 'auto',
  },
  agegroup: {
    margin: '10px 5px',
    maxWidth: '300px',
    textAlign: 'initial',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

const initialValues = {};
const FiltersWrapper = styled.div`
  width: 80%;
  margin: auto;
`;
export const ReorderFiltersList: FC<ReorderFiltersObjectProps> = ({
  sideBar,
  defaultSelectedValues,
  onSubmit,
  onChange,
}: ReorderFiltersObjectProps) => {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState(
    defaultSelectedValues || initialValues
  );

  return (
    <FiltersWrapper className={classes.root}>
      <Formik
        enableReinitialize={true}
        initialValues={selectedFilters}
        validationSchema={ReoOrderFormValidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          onSubmit && onSubmit(values);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched, isValid, setFieldValue }) => (
          <Form autoComplete="off">
            <Grid container direction="column" justify="center" spacing={1}>
              <Paper className={classes.paper} variant="outlined">
                <Grid container direction="column" justify="center" spacing={3}>
                  {sideBar &&
                    sideBar.map((sideBarOption: ReorderFiltersProps) => {
                      if (
                        sideBarOption.type === 'autocomplete' ||
                        sideBarOption.input_type === 'S'
                      ) {
                        return (
                          <Grid
                            item
                            xs
                            key={sideBarOption.name || sideBarOption.key}
                          >
                            <Field
                              variant="standard"
                              name={sideBarOption.name || sideBarOption.key}
                              label={
                                sideBarOption.label || sideBarOption.display
                              }
                              value={
                                selectedFilters[
                                  sideBarOption.name || sideBarOption.key
                                ] || (sideBarOption.multi ? [] : null)
                              }
                              multiple={sideBarOption.multi || false}
                              component={Autocomplete}
                              options={sideBarOption.options || []}
                              getOptionSelected={(
                                option: ReorderFiltersOptions,
                                selectedValue: ReorderFiltersOptions
                              ) => {
                                return option.key == selectedValue?.key;
                              }}
                              getOptionLabel={(option: ReorderFiltersOptions) =>
                                option.display ||
                                option.name ||
                                option.value ||
                                ''
                              }
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>,
                                values: ReorderFiltersOptions
                              ) => {
                                if (evt) {
                                  const keyName =
                                    sideBarOption.name || sideBarOption.key;
                                  const formValues = {
                                    ...selectedFilters,
                                    [keyName]: values,
                                  };
                                  if (sideBarOption.clearFields) {
                                    sideBarOption.clearFields.forEach(
                                      (element: string) => {
                                        delete formValues[element];
                                      }
                                    );
                                  }
                                  if (
                                    keyName === 'attribute' &&
                                    formValues['attribute'] &&
                                    formValues['attribute']['key'] ===
                                      'age_group'
                                  ) {
                                    formValues['age_group'] = [
                                      { from_age: null, to_age: null },
                                    ];
                                    delete formValues['color'];
                                  }
                                  if (
                                    keyName === 'attribute' &&
                                    formValues['attribute'] &&
                                    formValues['attribute']['key'] === 'color'
                                  ) {
                                    delete formValues['age_group'];
                                  }
                                  onChange && onChange(keyName, formValues);
                                  setSelectedFilters(formValues);
                                }
                              }}
                              renderInput={(
                                params: AutocompleteRenderInputParams
                              ) => (
                                <MuiTextField
                                  {...params}
                                  error={touched['sort'] && !!errors['sort']}
                                  helperText={touched['sort'] && errors['sort']}
                                  label={
                                    sideBarOption.label || sideBarOption.display
                                  }
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                        );
                      } else {
                        return;
                      }
                    })}
                </Grid>
                {selectedFilters['age_group'] &&
                  selectedFilters['age_group'].length && (
                    <FieldArray
                      name="age_group"
                      render={(arrayHelpers) => (
                        <div>
                          {selectedFilters['age_group'].map(
                            (age: any, index) => (
                              <Grid
                                item
                                data-age={age}
                                key={index}
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <Grid item xs={5} className={classes.agegroup}>
                                  {/* <Field
                                    variant="standard"
                                    component={Autocomplete}
                                    name="from_age"
                                    options={ageGroupNumbers}
                                    getOptionLabel={(option: string) => option}
                                    renderInput={(
                                      params: AutocompleteRenderInputParams
                                    ) => (
                                      <MuiTextField
                                        {...params}
                                        label={'From'}
                                        variant="outlined"
                                      />
                                    )}
                                  /> */}
                                  <Field
                                    component={TextField}
                                    name={`age_group[${index}].from_age`}
                                    type="text"
                                    label={'From'}
                                    variant={'outlined'}
                                    onChange={(
                                      evt: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const fromValue = evt.target
                                        ? evt.target.value
                                        : null;
                                      setFieldValue(
                                        `age_group[${index}].from_age`,
                                        fromValue
                                      );
                                      const formValues = { ...selectedFilters };
                                      formValues['age_group'][index][
                                        'from_age'
                                      ] = fromValue;
                                      setSelectedFilters(formValues);
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={5} className={classes.agegroup}>
                                  {/* <Field
                                    variant="standard"
                                    component={Autocomplete}
                                    name="to_age"
                                    options={ageGroupNumbers}
                                    getOptionLabel={(option: string) => option}
                                    renderInput={(
                                      params: AutocompleteRenderInputParams
                                    ) => (
                                      <MuiTextField
                                        {...params}
                                        label={'To'}
                                        variant="outlined"
                                      />
                                    )}
                                  /> */}
                                  <Field
                                    component={TextField}
                                    name={`age_group[${index}].to_age`}
                                    type="text"
                                    label={'To'}
                                    variant={'outlined'}
                                    onChange={(
                                      evt: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      setFieldValue(
                                        `age_group[${index}].to_age`,
                                        evt.target ? evt.target.value : ''
                                      );
                                      const toValue = evt.target
                                        ? evt.target.value
                                        : null;
                                      setFieldValue(
                                        `age_group[${index}].to_age`,
                                        toValue
                                      );
                                      const formValues = { ...selectedFilters };
                                      formValues['age_group'][index][
                                        'to_age'
                                      ] = toValue;
                                      setSelectedFilters(formValues);
                                    }}
                                  />
                                </Grid>
                                {index > 0 && (
                                  <Grid item xs={2}>
                                    <Button
                                      type="button"
                                      color="primary"
                                      disabled={!isValid}
                                      variant="outlined"
                                      onClick={() => {
                                        const formValues = {
                                          ...selectedFilters,
                                        };
                                        formValues['age_group'].splice(
                                          index,
                                          1
                                        );
                                        setSelectedFilters(formValues);
                                        arrayHelpers.remove(index);
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                )}
                              </Grid>
                            )
                          )}
                          <Button
                            type="button"
                            color="primary"
                            disabled={!isValid}
                            variant="outlined"
                            onClick={() => {
                              const formValues = { ...selectedFilters };
                              formValues['age_group'].push({
                                from_age: null,
                                to_age: null,
                              });
                              setSelectedFilters(formValues);
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                    />
                  )}
                <Grid item xs>
                  <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    size="large"
                    disabled={!isValid}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      padding: '14px 10px',
                      margin: '10px  0 10px',
                    }}
                  >
                    Submit
                  </Button>
                  <pre>{isValid}</pre>
                </Grid>
              </Paper>
            </Grid>
          </Form>
        )}
      </Formik>
    </FiltersWrapper>
  );
};
