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
import { Colors } from '@hs/utils';
import { TextField } from 'formik-material-ui';
import { ReoOrderFormValidation } from './ReorderFiltersListValidation';
import {
  ReorderFiltersProps,
  ReorderFiltersOptions,
  ReorderFiltersObjectProps,
} from './IReorderFiltersList';

import { SelectedRectAngle, DeSelectedRectAngle, SvgIcon } from '@hs/icons';

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  fill: white;
`;

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
  option: {
    paddingLeft: 0,
    fontSize: 14,
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
  const [isConstraintFormDirty, setIsConstraintFormDirty] = useState(0);

  const getAllColors = () => {
    const colorsObject = sideBar.find((obj) => obj.key === 'color_constraints');
    const options = colorsObject && colorsObject.options;
    return (options && options.slice(1)) || [];
  };

  return (
    <FiltersWrapper className={classes.root}>
      <Formik
        enableReinitialize={true}
        initialValues={selectedFilters}
        validationSchema={ReoOrderFormValidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          onSubmit && onSubmit(values);
        }}
      >
        {({ errors, touched, isValid, setFieldValue, validateForm }) => (
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
                              disabled={sideBarOption.disabled || false}
                              component={Autocomplete}
                              options={sideBarOption.options || []}
                              disableCloseOnSelect={
                                sideBarOption.multi ? true : false
                              }
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
                                      'age_constraints'
                                  ) {
                                    formValues['age_constraints'] = [
                                      { from: null, to: null },
                                    ];
                                    delete formValues['color_constraints'];
                                  }
                                  if (
                                    keyName === 'attribute' &&
                                    formValues['attribute'] &&
                                    formValues['attribute']['key'] ===
                                      'color_constraints'
                                  ) {
                                    delete formValues['age_constraints'];
                                  }
                                  if (keyName != 'color_constraints') {
                                    onChange && onChange(keyName, formValues);
                                  }
                                  setSelectedFilters(formValues);
                                  setIsConstraintFormDirty(1);
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
                      } else if (sideBarOption.type === 'autoselectall') {
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
                              disabled={sideBarOption.disabled || false}
                              component={Autocomplete}
                              options={sideBarOption.options || []}
                              disableCloseOnSelect={
                                sideBarOption.multi ? true : false
                              }
                              classes={{
                                option: classes.option,
                              }}
                              limitTags={10}
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
                              renderOption={(option, selectedValue) => {
                                const displayLabel =
                                  option.display || option.name || option.value;
                                if (
                                  displayLabel &&
                                  displayLabel.toLowerCase() === 'select all'
                                ) {
                                  return (
                                    <span
                                      style={{
                                        color: Colors.PINK[500],
                                        fontSize: 18,
                                        paddingLeft: 20,
                                      }}
                                    >
                                      {displayLabel}
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      {
                                        <StyledIcon
                                          icon={
                                            selectedValue.selected
                                              ? SelectedRectAngle
                                              : DeSelectedRectAngle
                                          }
                                        />
                                      }{' '}
                                      {displayLabel}
                                    </span>
                                  );
                                }
                              }}
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>,
                                values: Array<ReorderFiltersOptions>
                              ) => {
                                if (evt) {
                                  const keyName =
                                    sideBarOption.name || sideBarOption.key;
                                  let filteredValues: ReorderFiltersOptions[] =
                                    [];
                                  if (
                                    keyName === 'color_constraints' &&
                                    values &&
                                    values.length
                                  ) {
                                    const index = values.findIndex(
                                      (obj: ReorderFiltersOptions) =>
                                        obj.key == 'all'
                                    );
                                    if (index > -1) {
                                      filteredValues = getAllColors();
                                    }
                                  }
                                  const formValues = {
                                    ...selectedFilters,
                                    [keyName]: filteredValues.length
                                      ? filteredValues
                                      : values,
                                  };
                                  if (sideBarOption.clearFields) {
                                    sideBarOption.clearFields.forEach(
                                      (element: string) => {
                                        delete formValues[element];
                                      }
                                    );
                                  }
                                  if (keyName != 'color_constraints') {
                                    onChange && onChange(keyName, formValues);
                                  }
                                  setIsConstraintFormDirty(1);
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
                {selectedFilters['age_constraints'] &&
                  selectedFilters['age_constraints'].length && (
                    <FieldArray
                      name="age_constraints"
                      render={(arrayHelpers) => (
                        <div>
                          {selectedFilters['age_constraints'].map(
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
                                  <Field
                                    component={TextField}
                                    name={`age_constraints[${index}].from`}
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
                                        `age_constraints[${index}].from`,
                                        fromValue
                                      );
                                      const formValues = { ...selectedFilters };
                                      formValues['age_constraints'][index][
                                        'from'
                                      ] = fromValue;
                                      setSelectedFilters(formValues);
                                      setIsConstraintFormDirty(1);
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={5} className={classes.agegroup}>
                                  <Field
                                    component={TextField}
                                    name={`age_constraints[${index}].to`}
                                    type="text"
                                    label={'To'}
                                    variant={'outlined'}
                                    onChange={(
                                      evt: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      setFieldValue(
                                        `age_constraints[${index}].to`,
                                        evt.target ? evt.target.value : ''
                                      );
                                      const toValue = evt.target
                                        ? evt.target.value
                                        : null;
                                      setFieldValue(
                                        `age_constraints[${index}].to`,
                                        toValue
                                      );
                                      const formValues = { ...selectedFilters };
                                      formValues['age_constraints'][index][
                                        'to'
                                      ] = toValue;
                                      setSelectedFilters(formValues);
                                      setIsConstraintFormDirty(1);
                                    }}
                                  />
                                </Grid>
                                {index > 0 && (
                                  <Grid item xs={2}>
                                    <Button
                                      type="button"
                                      color="primary"
                                      variant="outlined"
                                      onClick={() => {
                                        const formValues = {
                                          ...selectedFilters,
                                        };
                                        formValues['age_constraints'].splice(
                                          index,
                                          1
                                        );
                                        arrayHelpers.remove(index);
                                        setSelectedFilters(formValues);
                                        setIsConstraintFormDirty(1);
                                        validateForm();
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
                            disabled={
                              !isValid ||
                              !(
                                selectedFilters['age_constraints'][
                                  selectedFilters['age_constraints'].length - 1
                                ]['from'] != null ||
                                selectedFilters['age_constraints'][
                                  selectedFilters['age_constraints'].length - 1
                                ]['to'] != null
                              )
                            }
                            variant="outlined"
                            onClick={() => {
                              const formValues = { ...selectedFilters };
                              formValues['age_constraints'].push({
                                from: null,
                                to: null,
                              });
                              setSelectedFilters(formValues);
                              setIsConstraintFormDirty(1);
                              validateForm();
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
                    disabled={
                      !isValid ||
                      (!defaultSelectedValues.isConstraintFormDirty &&
                        !isConstraintFormDirty) ||
                      (selectedFilters &&
                        selectedFilters['age_constraints'] &&
                        !(
                          selectedFilters['age_constraints'][
                            selectedFilters['age_constraints'].length - 1
                          ]['from'] != null ||
                          selectedFilters['age_constraints'][
                            selectedFilters['age_constraints'].length - 1
                          ]['to'] != null
                        ))
                    }
                    style={{
                      fontWeight: 'bold',
                      fontSize: 10,
                      padding: '14px 10px',
                      margin: '10px  0 10px',
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Form>
        )}
      </Formik>
    </FiltersWrapper>
  );
};
