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
  const ranges = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: '0-20',
      label: '0 to 20',
    },
    {
      value: '21-50',
      label: '21 to 50',
    },
    {
      value: '51-100',
      label: '51 to 100',
    },
  ];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          title: '',
          type: '',
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
          if (!values.type) {
            errors.type = 'Carousel type is required';
          }
          if (!values.position) {
            errors.position = 'Position is required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Box margin={1}>
              <Field component={TextField} style={{ width: 350 }} name="title" type="text" label="Carousel Title" />
            </Box>
            <Box margin={1}>
              <Field component={TextField} style={{ width: 350 }} name="position" type="text" label="Position" />
            </Box>
            <Box margin={1}>
              <Field
                name="type"
                variant="standard"
                component={Autocomplete}
                options={ranges}
                getOptionLabel={(option: any) => option.label}
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
                getOptionLabel={(option: any) => option.name}
                style={{ width: 350 }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField {...params} label="Platform" variant="outlined" />
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
                getOptionLabel={(option: any) => option.name}
                style={{ width: 350 }}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <MuiTextField {...params} label="Sort" variant="outlined" />
                )}
              />
            </Box>
            <Box margin={1}>
              <Field component={DateTimePicker} style={{ width: 350 }} name="start_date" label="Start Date" />
            </Box>
            <Box margin={1}>
              <Field component={DateTimePicker} style={{ width: 350 }} name="end_date" label="End Date" />
            </Box>
            {isSubmitting && <LinearProgress />}
            <br />
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};
export default CarouselCreator;
