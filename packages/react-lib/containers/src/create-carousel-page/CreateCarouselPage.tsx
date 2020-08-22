import React, { FC, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  Chip,
  TextField as MuiTextField,
  InputLabel,
  CardContent,
  Grid,
} from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { HsSnackbar, HsSnackbarProps } from '@hs/components';
import { format } from 'date-fns';
import { createService, carouselService, SortList } from '@hs/services';
import {
  CreateCarouselPageState,
  CreateCarouselProps,
} from './ICreateCarouselPage';
import {
  StyledCreateCarouselPage,
  StyledCard,
  StyledChips,
} from './StyledCreateCarouselPage';
interface Values {
  title: string;
  carouselType: string;
  sort: string;
  position: string;
  platform: string;
  start_date: string;
  end_date: string;
}

const initialValues: CreateCarouselPageState = {
  title: '',
  carouselType: '',
  sort: [],
  position: '',
  platform: [],
  start_date: new Date(),
  end_date: new Date(),
};
const platformOptions = () =>
  [
    { display: 'IOS', value: 'IOS' },
    { display: 'ANDROID', value: 'ANDROID' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

const carouselTypesOptions = () =>
  [
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
    { display: '4', value: '4' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

export const CreateCarouselPage: FC<CreateCarouselProps> = (
  props: CreateCarouselProps
) => {
  const [sorts, setSortingList] = useState<SortList>([]);
  const loading = sorts.length == 0;
  // const params = useParams();

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
    (async () => {
      try {
        // console.log('Called');
        const sortList = await carouselService.getSortList();
        // console.log('sortList', sortList);
        setSortingList(sortList);
      } catch (error) {
        setSortingList([]);
        // console.error('error', error);
      }
    })();
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
          if (!values.carouselType) {
            errors.carouselType = 'Carousel type is required';
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
            // const carouselType = values.type.key;
            const postData = {
              ...values,
              start_date: format(values.start_date, "yyyy-MM-dd'T'hh:mm:ss"),
              end_date: format(values.end_date, "yyyy-MM-dd'T'hh:mm:ss"),
              platform: values.platform.map((data) => data['key']),
              sort: values.sort.map((data) => data['id']),
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
      >
        {({ values, isSubmitting, touched, errors }) => (
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <StyledCreateCarouselPage>
                <StyledCard variant="outlined" raised>
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      spacing={3}
                    >
                      <Grid item xs>
                        <Field
                          component={TextField}
                          fullWidth
                          name="title"
                          type="text"
                          label="Carousel Title"
                          variant={'outlined'}
                          // helperText="Enter Title"
                        />
                      </Grid>
                      <Grid item xs>
                        <Field
                          component={TextField}
                          fullWidth
                          name="position"
                          type="text"
                          label="Position"
                          variant={'outlined'}
                        />
                      </Grid>
                      <Grid item xs>
                        <Field
                          component={TextField}
                          type="text"
                          name="carouselType"
                          label="Carousel Type"
                          // helperText="Please select type"
                          select
                          inputProps={{
                            id: 'ol-select-type',
                          }}
                          variant={'outlined'}
                          fullWidth
                        >
                          {carouselTypesOptions()}
                        </Field>
                      </Grid>
                      <Grid item xs>
                        <FormControl variant={'outlined'} fullWidth>
                          <InputLabel htmlFor="ol-select-type">
                            platform
                          </InputLabel>
                          <Field
                            component={Select}
                            multiple
                            name="platform"
                            label="Platform"
                            // helperText="Please select type"
                            inputProps={{
                              id: 'ol-select-type',
                            }}
                            variant={'outlined'}
                            renderValue={(selected: string[]) => (
                              <StyledChips>
                                {(selected as string[]).map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </StyledChips>
                            )}
                          >
                            {platformOptions()}
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid item xs>
                        <Field
                          multiple
                          name="sort"
                          label="Select Sort"
                          variant="standard"
                          // helperText="Please select sort"
                          component={Autocomplete}
                          options={sorts}
                          getOptionLabel={(option: any) =>
                            option.value ? option.value : ''
                          }
                          // style={{ width: 350 }}
                          renderInput={(
                            params: AutocompleteRenderInputParams
                          ) => (
                            <MuiTextField
                              {...params}
                              error={touched['sort'] && !!errors['sort']}
                              helperText={touched['sort'] && errors['sort']}
                              label="Sort"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      {isSubmitting && <LinearProgress />}
                      <Grid item xs>
                        <Field
                          component={DateTimePicker}
                          fullWidth
                          name="start_date"
                          label="Start Date"
                        />
                      </Grid>
                      <Grid item xs>
                        <Field
                          component={DateTimePicker}
                          fullWidth
                          name="end_date"
                          label="End Date"
                        />
                      </Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        // onClick={submitForm}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </CardContent>
                </StyledCard>
              </StyledCreateCarouselPage>
            </MuiPickersUtilsProvider>
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
      {HsSnackBarError.open && <HsSnackbar {...HsSnackBarError} />}
    </div>
  );
};
