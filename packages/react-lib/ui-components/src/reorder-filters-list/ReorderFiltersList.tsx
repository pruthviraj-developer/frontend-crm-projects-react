import React, { FC, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from '@emotion/styled';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import {
  TextField as MuiTextField,
  Grid,
  makeStyles,
  Paper,
  Button,
} from '@material-ui/core';

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
  width: 100%;
`;
export const ReorderFiltersList: FC<ReorderFiltersObjectProps> = ({
  sideBar,
  defaultSelectedValues,
  onSubmit,
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
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          onSubmit && onSubmit(values);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched, isValid }) => (
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
                                  if (sideBarOption.onChange) {
                                    sideBarOption.onChange(keyName, formValues);
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
                      } else {
                        return;
                      }
                    })}
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
