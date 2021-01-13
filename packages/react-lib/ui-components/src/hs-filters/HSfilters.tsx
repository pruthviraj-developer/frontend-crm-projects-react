import React, { FC, useState } from 'react';
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
  Button,
  Drawer,
  Select
} from '@material-ui/core';

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
export const HsFilters: FC<IHsFilters> = ({
  sideBar,
  defaultSelectedValues,
  updateFilters
}: IHsFilters) => {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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
        onSubmit={()=>{}}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form autoComplete="off">
            <Grid container direction="column" justify="center" spacing={1}>
              <Paper variant="outlined" style={{ padding: '10px 20px' }}>
                <Grid container direction="column" justify="center" spacing={3}>
                  {sideBar &&
                    sideBar.map((sideBarOption: FFiltersOptions) => {
                      if (sideBarOption.type === 'autocomplete') {
                        return (
                          <Grid item xs key={sideBarOption.name}>
                            <Field
                              multiple
                              variant="standard"
                              name={sideBarOption.name}
                              label={sideBarOption.label}
                              component={Autocomplete}
                              options={sideBarOption.options || []}
                              getOptionLabel={(option) =>
                                option.display ? option.display : ''
                              }
                              getOptionSelected={(
                                option: AutoCompleteOptions,
                                selectedValue: AutoCompleteOptions
                              ) => option.key == selectedValue?.key}
                              onChange={(
                                _evt: React.ChangeEvent,
                                actionvalue: AutoCompleteOptions
                              ) => {
                                let formValues = { ...selectedFilters,[sideBarOption.name]:actionvalue};
                                setFieldValue(sideBarOption.name,actionvalue);
                                setSelectedFilters(formValues);
                                updateFilters && updateFilters(formValues);
                              }}
                              renderInput={(
                                params: AutocompleteRenderInputParams
                              ) => (
                                <MuiTextField
                                  {...params}
                                  error={touched['sort'] && !!errors['sort']}
                                  helperText={touched['sort'] && errors['sort']}
                                  label={sideBarOption.label}
                                  variant="outlined"
                                />
                              )}
                            />
                          </Grid>
                        );
                      } else if (sideBarOption.type === 'select') {
                        return (
                          <Grid item xs>
                            <Field
                              select
                              variant={'outlined'}
                              name={sideBarOption.name}
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
                                  sideBarOption.name,
                                  evt.target ? evt.target.value : ''
                                );
                              }}
                              fullWidth
                            >
                              {sideBarOption?.options?.map((item:any, index) => (
                                <MenuItem key={index} value={item}>
                                  {item.display}
                                </MenuItem>
                              ))}
                            </Field>
                          </Grid>
                        );
                      } else {
                        return (
                          <Grid item xs key={sideBarOption.name}>
                            <Field
                              variant={'outlined'}
                              name={sideBarOption.name}
                              label={sideBarOption.label}
                              component={TextField}
                              type="text"
                              onChange={(
                                evt: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  sideBarOption.name,
                                  evt.target ? evt.target.value : ''
                                );
                              }}
                              fullWidth
                            ></Field>
                          </Grid>
                        );
                      }
                    })}
                </Grid>
              </Paper>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
