import React, { FC, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { DarkTheme } from '@hs/utils';
import { ImageUpload, ImageListType } from '@hs/components';
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
  CardHeader,
  CardActionArea,
  Avatar,
  IconButton,
  Box,
  FormHelperText,
} from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DateFnsUtils from '@date-io/date-fns';
import { HsSnackbar, HsSnackbarProps } from '@hs/components';
import { format } from 'date-fns';
import {
  createService,
  carouselService,
  SortListOption,
  ListOption,
} from '@hs/services';
import { CreateCarouselProps } from './../create-carousel-page';
import { CreateCarouselPageState } from './ICreateCarouselPage';
import {
  StyledCreateCarouselPage,
  StyledCard,
  StyledChips,
  StyledCarouselPage,
  StyledCarouselCard,
  StyledFooter,
} from './StyledCreateNonCarouselPage';
import { useGetCarouselList } from './CreateNonCarouselHooks';
import { CarouselFormValidation } from './CreateNonCarouselValidation';
const initialValues: CreateCarouselPageState = {
  title: '',
  carouselType: '',
  sort: [],
  position: '',
  platform: [],
  start_date: new Date(),
  end_date: new Date(),
  tileHeight: 400,
  tileWidth: 500,
  tiles: [
    {
      type: 'plp',
      position: 1,
      actionId: '11233',
      actionName: 'TEST123 - 11233',
      imageUrl:
        'https://static.hopscotch.in/fstatic/product/202008/067483ca-5952-48fa-863c-f341687d0d9b_full.jpg?version=1597741405901',
    },
    {
      type: 'plp',
      position: 2,
      imageUrl:
        'https://static.hopscotch.in/fstatic/product/202008/3d3e3f8c-33a9-415d-a092-9623e7e05ca6_full.jpg?version=1597741411488',
    },
  ],
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

const getPostionOptions = (count = 1) => {
  const options = [...new Array(count)].map((_, index) => (
    <MenuItem key={'position' + index.toString()} value={index + 1}>
      {index + 1}
    </MenuItem>
  ));
  return options;
};
const getTileTypeOptions = () =>
  [
    { display: 'PLP', value: 'plp' },
    { display: 'Special Page', value: 'sp' },
    { display: 'Boutique', value: 'boutique' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

export const CreateNonCarouselPage: FC<CreateCarouselProps> = (
  props: CreateCarouselProps
) => {
  const onSnackBarClose = (open: boolean) => {
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

  const listData = useGetCarouselList();

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
        validationSchema={CarouselFormValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            const postData = {
              ...values,
              start_date: format(values.start_date, "yyyy-MM-dd'T'hh:mm:ss"),
              end_date: format(values.end_date, "yyyy-MM-dd'T'hh:mm:ss"),
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
        {({
          values,
          isSubmitting,
          setFieldValue,
          touched,
          errors,
          isValid,
          dirty,
        }) => (
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container direction="row" justify="center" spacing={5}>
                <Grid item xs={3}>
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
                                error={
                                  touched['platform'] && !!errors['platform']
                                }
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
                              <FormHelperText error>
                                {errors['platform']}
                              </FormHelperText>
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
                              options={listData['sortList'].list}
                              loading={listData['sortList'].isLoading}
                              getOptionLabel={(option: SortListOption) =>
                                option.value ? option.value : ''
                              }
                              // style={{ width: 350 }}
                              renderInput={(
                                params: AutocompleteRenderInputParams
                              ) => (
                                <MuiTextField
                                  {...params}
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
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </StyledCreateCarouselPage>
                </Grid>
                <Grid item xs={9}>
                  <FieldArray name="tiles">
                    {({ remove, push, move }) => (
                      <StyledCarouselPage>
                        <Grid container direction="row" spacing={2}>
                          {values.tiles.length > 0 &&
                            values.tiles.map((tile, index) => (
                              <Grid item xs={3} key={'CarouselTile' + index}>
                                <StyledCarouselCard
                                  key={'card' + index}
                                  variant={'elevation'}
                                >
                                  <CardHeader
                                    avatar={<Avatar>T{tile.position}</Avatar>}
                                    action={
                                      <IconButton
                                        onClick={() => {
                                          remove(index);
                                          if (values.tiles.length == 1) {
                                            setFieldValue(
                                              'tileHeight',
                                              undefined
                                            );
                                            setFieldValue(
                                              'tileWidth',
                                              undefined
                                            );
                                          }
                                        }}
                                      >
                                        <DeleteForeverIcon fontSize={'large'} />
                                      </IconButton>
                                    }
                                    title={'Image'}
                                    subheader={`Supported ${values.tileHeight}X${values.tileWidth}`}
                                  />
                                  <CardContent>
                                    <CardActionArea>
                                      <Field
                                        id={`image.${index}`}
                                        component={ImageUpload}
                                        name={`tiles.${index}.imageUrl`}
                                        resolutionHeight={values.tileHeight}
                                        resolutionWidth={values.tileWidth}
                                        resolutionValidationType={(() =>
                                          values.tiles.length > 1
                                            ? 'absolute'
                                            : '')()}
                                        imageUrl={tile.imageUrl}
                                        onChange={async (
                                          value: ImageListType
                                        ) => {
                                          try {
                                            const res = await carouselService.imageUpload(
                                              { file: value[0].file }
                                            );
                                            setFieldValue(
                                              `tiles.${index}.imageUrl`,
                                              `https://${res.imageURLPrefix}/fstatic${res.imageResponse.imageUrl}?version=${res.imageResponse.version}`
                                            );
                                            if (values.tiles.length == 1) {
                                              setFieldValue(
                                                'tileHeight',
                                                res.imageResponse.imageAreas[0]
                                                  .height
                                              );
                                              setFieldValue(
                                                'tileWidth',
                                                res.imageResponse.imageAreas[0]
                                                  .width
                                              );
                                            }
                                          } catch (err) {
                                            setFieldValue(
                                              `tiles.${index}.imageUrl`,
                                              undefined
                                            );
                                          }
                                        }}
                                      ></Field>
                                    </CardActionArea>
                                  </CardContent>
                                  <MuiThemeProvider theme={DarkTheme}>
                                    <StyledFooter>
                                      <Grid container spacing={1}>
                                        <Grid item xs>
                                          <Field
                                            component={TextField}
                                            type="text"
                                            name={`tiles.${index}.type`}
                                            label="Type"
                                            select
                                            inputProps={{
                                              id: 'outlined-select',
                                            }}
                                            variant={'outlined'}
                                            onChange={(
                                              evt: React.ChangeEvent<
                                                HTMLInputElement
                                              >
                                            ) => {
                                              setFieldValue(
                                                `tiles.${index}.type`,
                                                evt.target
                                                  ? evt.target.value
                                                  : ''
                                              );
                                              setFieldValue(
                                                `tiles.${index}.actionId`,
                                                ''
                                              );
                                              setFieldValue(
                                                `tiles.${index}.actionName`,
                                                ''
                                              );
                                            }}
                                          >
                                            {getTileTypeOptions()}
                                          </Field>
                                        </Grid>
                                        <Grid item xs>
                                          <Field
                                            component={TextField}
                                            type="text"
                                            name={`tiles.${index}.position`}
                                            label="Position"
                                            value={index + 1}
                                            select
                                            inputProps={{
                                              id: 'outlined-select',
                                            }}
                                            disabled={!isValid}
                                            variant={'outlined'}
                                            onChange={(
                                              evt: React.ChangeEvent<
                                                HTMLLIElement
                                              >
                                            ) => {
                                              move(index, evt.target.value - 1);
                                              setFieldValue(
                                                `tiles.${
                                                  evt.target.value - 1
                                                }.position`,
                                                evt.target.value
                                              );
                                            }}
                                          >
                                            {getPostionOptions(
                                              values.tiles.length
                                            )}
                                          </Field>
                                        </Grid>
                                        <Grid item xs>
                                          <Field
                                            name={`tiles.${index}.actionObj`}
                                            variant="standard"
                                            value={
                                              values.tiles[index].actionId
                                                ? {
                                                    name:
                                                      values.tiles[index]
                                                        .actionName,
                                                    id:
                                                      values.tiles[index]
                                                        .actionId,
                                                  }
                                                : null
                                            }
                                            component={Autocomplete}
                                            getOptionSelected={(
                                              option: ListOption,
                                              selectedValue: ListOption
                                            ) => option.id == selectedValue?.id}
                                            options={
                                              listData[values.tiles[index].type]
                                                .list
                                            }
                                            getOptionLabel={(
                                              option: ListOption
                                            ) =>
                                              option.name ? option.name : ''
                                            }
                                            loading={
                                              listData[values.tiles[index].type]
                                                .isLoading
                                            }
                                            onChange={(
                                              _evt: React.ChangeEvent,
                                              actionvalue: ListOption
                                            ) => {
                                              setFieldValue(
                                                `tiles.${index}.actionId`,
                                                actionvalue?.id
                                              );
                                              setFieldValue(
                                                `tiles.${index}.actionName`,
                                                actionvalue?.name
                                              );
                                            }}
                                            renderInput={(
                                              params: AutocompleteRenderInputParams
                                            ) => (
                                              <MuiTextField
                                                {...params}
                                                // error={
                                                //   touched['sort'] && !!errors['sort']
                                                // }
                                                // helperText={
                                                //   touched['sort'] && errors['sort']
                                                // }
                                                label={`Select ${values.tiles[index].type}`}
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Grid>
                                      </Grid>
                                    </StyledFooter>
                                  </MuiThemeProvider>
                                </StyledCarouselCard>
                              </Grid>
                            ))}
                          <Grid item xs={2}>
                            <Button
                              color={'primary'}
                              variant={'contained'}
                              disabled={isSubmitting || !isValid}
                              size={'large'}
                              onClick={() =>
                                push({
                                  type: 'plp',
                                  position: values.tiles.length + 1,
                                })
                              }
                            >
                              Add Tile
                            </Button>
                          </Grid>
                        </Grid>
                      </StyledCarouselPage>
                    )}
                  </FieldArray>
                </Grid>
              </Grid>
              <Box margin={3}>
                <Button
                  color={'primary'}
                  variant={'contained'}
                  disabled={isSubmitting || !isValid || !dirty}
                  size={'large'}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </MuiPickersUtilsProvider>
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
      {HsSnackBarError.open && <HsSnackbar {...HsSnackBarError} />}
    </div>
  );
};
