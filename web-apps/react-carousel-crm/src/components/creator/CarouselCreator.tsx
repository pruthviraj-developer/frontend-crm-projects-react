import React, { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import MuiTextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Button, LinearProgress } from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// Depending on the library you picked
import DateFnsUtils from '@date-io/date-fns';

interface Values {
  title: string;
  type: string;
  sort: string;
  position: string;
  platform: string;
  start_date: string;
  end_date: string;
}

const CarouselCreator: FC = () => {
  const platform = [
    { key: 'IOS', name: 'IOS' },
    { key: 'ANDROID', name: 'ANDROID' },
  ];
  return (
    <Formik
      initialValues={{
        title: '',
        type: [],
        sort: [],
        position: '',
        platform: [],
        start_date: undefined,
        end_date: undefined,
      }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.title) {
          errors.title = 'Title is required';
        }
        if (!values.position) {
          errors.position = 'Position is required';
        }
        if (!(values.type && values.type.length)) {
          errors.type = 'Carousel type is required';
        }
        if (!(values.platform && values.platform.length)) {
          errors.platform = 'Platform is required';
        }
        if (!(values.sort && values.sort.length)) {
          errors.sort = 'Sort is required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({ submitForm, isSubmitting, touched, errors }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Form>
            <Box margin={1}>
              <Field component={TextField} style={{ width: 350 }} name="title" type="text" label="Carousel Title" />
            </Box>
            <Box margin={1}>
              <Field component={TextField} style={{ width: 350 }} name="position" type="text" label="Position" />
            </Box>
            <Box margin={1}>
              <Field
                required
                name="type"
                variant="standard"
                component={Autocomplete}
                options={platform}
                getOptionLabel={(option: any) => (option.name ? option.name : option)}
                style={{ width: 350 }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField {...params} label="Carousel Type" variant="outlined" />
                )}
              />
            </Box>
            <Box margin={1}>
              <Field
                multiple
                name="platform"
                label="Select Platform"
                variant="standard"
                component={Autocomplete}
                options={platform}
                getOptionLabel={(option: any) => (option.name ? option.name : option)}
                style={{ width: 350 }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={touched['platform'] && !!errors['platform']}
                    helperText={touched['platform'] && errors['platform']}
                    label="Platform"
                    variant="outlined"
                  />
                )}
              />
            </Box>
            <Box margin={1}>
              <Field
                multiple
                name="sort"
                label="Select Sort"
                variant="standard"
                helperText="Please select sort"
                component={Autocomplete}
                options={platform}
                getOptionLabel={(option: any) => (option.name ? option.name : option)}
                style={{ width: 350 }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField
                    {...params}
                    error={touched['sort'] && !!errors['sort']}
                    helperText={touched['sort'] && errors['sort']}
                    label="Sort"
                    variant="outlined"
                  />
                )}
              />
            </Box>
            {isSubmitting && <LinearProgress />}
            <Box margin={1}>
              <Field component={DateTimePicker} style={{ width: 350 }} name="start_date" label="Start Date" />
            </Box>
            <Box margin={1}>
              <Field component={DateTimePicker} style={{ width: 350 }} name="end_date" label="End Date" />
            </Box>
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
              Submit
            </Button>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    />
  );
};
export default CarouselCreator;
