import React, { FC, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import MuiTextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Button, LinearProgress } from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { HsSnackbar, HsSnackbarProps } from '@hs/components';
import { format } from 'date-fns';
import { createService } from '@hs/services';
import {
  CreateCarouselPageState,
  CreateCarouselProps,
} from './ICreateCarouselPage';
interface Values {
  title: string;
  type: string;
  sort: string;
  position: string;
  platform: string;
  start_date: string;
  end_date: string;
}

const initialValues: CreateCarouselPageState = {
  title: '',
  type: {},
  sort: [],
  position: '',
  platform: [],
  start_date: new Date(),
  end_date: new Date(),
};

export const CreateCarouselPage: FC<CreateCarouselProps> = (
  props: CreateCarouselProps
) => {
  const loading = true;
  // const params = useParams();
  const platform = [
    { key: 'IOS', name: 'IOS' },
    { key: 'ANDROID', name: 'ANDROID' },
  ];
  const carouselTypes = [
    { key: 1, name: '1' },
    { key: 2, name: '2' },
    { key: 3, name: '3' },
    { key: 4, name: '4' },
  ];
  const [sorts, setSortingList] = useState<Array<string>>([]);
  const onSnackBarClose = (open: any) => {
    setSnackBarError({ ...HsSnackBarError, open });
  };
  const snackBarProps = {
    open: false,
    type: 'error' as const,
    message: 'Test',
    onSnackBarClose: onSnackBarClose,
  };
  const [HsSnackBarError, setSnackBarError] = useState<HsSnackbarProps>(
    snackBarProps
  );

  useEffect(() => {
    async function loadJson() {
      const response = await fetch('api/carouselservice/carousel/setup');
      if (response.status == 200) {
        const json = await response.json();
        setSortingList(json);
        return;
      }
      const error: any = response;
      throw new Error(error);
    }
    loadJson().catch((error: Error) => {
      console.error(error);
    });
  }, [loading]);

  const showStatus = (responseData: any) => {
    if (responseData.action === 'success') {
      const obj = responseData.messageDetail;
      setSnackBarError({
        ...snackBarProps,
        open: true,
        type: 'success',
        message: obj.message,
      });
    } else {
      const data: any =
        responseData && responseData.data ? responseData.data : responseData;
      const obj = data && data.messageDetail ? data.messageDetail : {};
      const type = obj.messageType ? obj.messageType.toLowerCase() : 'error';
      setSnackBarError({
        ...snackBarProps,
        open: true,
        type,
        message: obj.message,
      });
    }
  };
  return (
    <div className="create-form">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<Values> = {};
            if (!values.title) {
              errors.title = 'Title is required';
            }
            if (!values.position) {
              errors.position = 'Position is required';
            }
            if (!(values.type && values.type.key)) {
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
              const type = values.type.key;
              const postData = {
                ...values,
                start_date: format(values.start_date, "yyyy-MM-dd'T'hh:mm:ss"),
                end_date: format(values.end_date, "yyyy-MM-dd'T'hh:mm:ss"),
                platform: values.platform.map((data) => data['key']),
                sort: values.sort.map((data) => data['id']),
                type: type,
              };
              if (props.action) {
                props.action(postData);
              }
              createService
                .post({
                  url: 'api/carouselservice/pagecarousel',
                  data: postData,
                })
                .then((res: any) => {
                  showStatus(res);
                })
                .catch((error: Error) => {
                  showStatus(error);
                });
            }, 500);
          }}
          render={({ submitForm, isSubmitting, touched, errors }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  style={{ width: 350 }}
                  name="title"
                  type="text"
                  label="Carousel Title"
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  style={{ width: 350 }}
                  name="position"
                  type="text"
                  label="Position"
                />
              </Box>
              <Box margin={1}>
                <Field
                  required
                  single
                  name="type"
                  variant="standard"
                  helperText="Please select type"
                  component={Autocomplete}
                  options={carouselTypes}
                  getOptionLabel={(option: any) =>
                    option.name ? option.name : option
                  }
                  style={{ width: 350 }}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <MuiTextField
                      {...params}
                      label="Carousel Type"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box margin={1}>
                <Field
                  multiple
                  name="platform"
                  label="Select Platform"
                  variant="standard"
                  helperText="Please select platform"
                  component={Autocomplete}
                  options={platform}
                  getOptionLabel={(option: any) =>
                    option.name ? option.name : option
                  }
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
                  options={sorts}
                  getOptionLabel={(option: any) =>
                    option.value ? option.value : option
                  }
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
                <Field
                  component={DateTimePicker}
                  style={{ width: 350 }}
                  name="start_date"
                  label="Start Date"
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={DateTimePicker}
                  style={{ width: 350 }}
                  name="end_date"
                  label="End Date"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Form>
          )}
        />
      </MuiPickersUtilsProvider>
      {HsSnackBarError.open && <HsSnackbar {...HsSnackBarError} />}
    </div>
  );
};
