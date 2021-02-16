import React, { FC, useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import clsx from 'clsx';

import {
  TextField,
  TextField as MuiTextField,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Drawer,
  Select,
  Button,
} from '@material-ui/core';
import * as Yup from 'yup';

import { FFiltersOptions, AutoCompleteOptions, IHsFilters } from './IFilters';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const initialValues = {};

const filtersFormValidation = Yup.object().shape({
  quantity: Yup.number()
    .required('Please enter value')
    .positive()
    .typeError('Please enter only numbers'),
});

export const HsFilters: FC<IHsFilters> = ({
  sideBar,
  sideBarState,
  defaultSelectedValues,
  updateFilters,
  updateFilter,
}: IHsFilters) => {
  const classes = useStyles();
  const [state, setState] = useState(() => {
    return (
      sideBarState || {
        top: false,
        left: false,
        bottom: false,
        right: false,
      }
    );
  });
  const [selectedFilters, setSelectedFilters] = useState(
    defaultSelectedValues || initialValues
  );
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      style={{ width: '500px', margin: '10px' }}
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Formik
        enableReinitialize={true}
        initialValues={selectedFilters}
        validationSchema={filtersFormValidation}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          updateFilters && updateFilters(values);
        }}
      >
        {({ errors, setFieldValue, touched, isValid }) => (
          <Form autoComplete="off">
            <Grid container direction="column" justify="center" spacing={1}>
              <Paper variant="outlined" style={{ padding: '10px 20px' }}>
                <Grid container direction="column" justify="center" spacing={3}>
                  {sideBar &&
                    sideBar.map((sideBarOption: FFiltersOptions) => {
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
                              multiple
                              variant="standard"
                              name={sideBarOption.name || sideBarOption.key}
                              label={
                                sideBarOption.label || sideBarOption.display
                              }
                              component={Autocomplete}
                              options={sideBarOption.options || []}
                              getOptionLabel={(option: any) =>
                                option.display
                                  ? option.display
                                  : option.value
                                  ? option.value
                                  : ''
                              }
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>,
                                values: AutoCompleteOptions[]
                              ) => {
                                if (evt) {
                                  if (
                                    (sideBarOption.input_type === 'S' ||
                                      sideBarOption.isSingle) &&
                                    values.length
                                  ) {
                                    values.splice(0, values.length - 1);
                                  }
                                  const keyName =
                                    sideBarOption.name || sideBarOption.key;
                                  const formValues = {
                                    ...selectedFilters,
                                    [keyName]: values,
                                  };
                                  setFieldValue(keyName, values);
                                  // hardcoding as these are based on other  drop down values
                                  if (keyName === 'category_id') {
                                    setFieldValue('sub_cat', '');
                                    setFieldValue('pt', '');
                                    delete formValues['sub_cat'];
                                    delete formValues['pt'];
                                  }
                                  if (keyName === 'sub_cat') {
                                    setFieldValue('pt', '');
                                    delete formValues['pt'];
                                  }
                                  if (keyName !== 'mathOperator') {
                                    updateFilter &&
                                      updateFilter(keyName, values);
                                    updateFilters && updateFilters(formValues);
                                  } else if (keyName === 'mathOperator') {
                                    setFieldValue('quantity', '');
                                    delete formValues['quantity'];
                                    if (
                                      formValues.mathOperator &&
                                      formValues.mathOperator.length === 0
                                    ) {
                                      updateFilter &&
                                        updateFilter(keyName, values);
                                      updateFilters &&
                                        updateFilters(formValues);
                                    }
                                  }
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
                      } else if (sideBarOption.type === 'select') {
                        return (
                          <Grid
                            item
                            xs
                            key={sideBarOption.name || sideBarOption.key}
                          >
                            <Field
                              select="true"
                              variant={'outlined'}
                              name={sideBarOption.name || sideBarOption.key}
                              label={sideBarOption.label}
                              component={Select}
                              type="text"
                              inputProps={{
                                id: 'ol-select-type',
                              }}
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  sideBarOption.name || sideBarOption.key,
                                  evt.target ? evt.target.value : ''
                                );
                              }}
                              fullWidth
                            >
                              {sideBarOption?.options?.map(
                                (item: any, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item.display}
                                  </MenuItem>
                                )
                              )}
                            </Field>
                          </Grid>
                        );
                      } else {
                        return (
                          <Grid
                            item
                            xs
                            key={sideBarOption.name || sideBarOption.key}
                          >
                            <Field
                              variant={'outlined'}
                              name={sideBarOption.name || sideBarOption.key}
                              label={sideBarOption.label}
                              component={TextField}
                              type="text"
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  sideBarOption.name || sideBarOption.key,
                                  evt.target ? evt.target.value : ''
                                );
                              }}
                              fullWidth
                            ></Field>
                          </Grid>
                        );
                      }
                    })}
                  {selectedFilters['mathOperator'] &&
                    selectedFilters['mathOperator'].length > 0 && (
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={3}
                        style={{ margin: 0 }}
                      >
                        <Grid item xs key="quantity">
                          <Field
                            variant="outlined"
                            name="quantity"
                            label="Quantity"
                            component={TextField}
                            value={selectedFilters['quantity'] || ''}
                            error={touched.name && Boolean(errors.name)}
                            type="text"
                            helperText="Enter only numbers"
                            onChange={(
                              evt: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const value = evt.target ? evt.target.value : '';
                              setFieldValue('quantity', value);
                              setSelectedFilters({
                                ...selectedFilters,
                                quantity: value,
                              });
                            }}
                          ></Field>
                        </Grid>
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
                              margin: '0  0 10px',
                            }}
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                </Grid>
              </Paper>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );

  useEffect(() => {
    setState(sideBarState || {});
  }, [sideBarState]);

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor: any) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
