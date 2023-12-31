import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { DarkTheme } from '@hs/utils';
import { ImageUpload, ImageListType } from '@hs-crm/components';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import {
  Button,
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
import { HsSnackbar, HsSnackbarProps } from '@hs-crm/components';
import { format } from 'date-fns';
import {
  carouselService,
  SortListOption,
  List,
  ListOption,
} from '@hs/services';
import {
  CreateNonCarouselPageState,
  CreateNonCarouselProps,
} from './ICreateNonCarouselPage';
import {
  StyledCreateCarouselPage,
  StyledCard,
  StyledChips,
  StyledCarouselCardPage,
  StyledCarouselCard,
  StyledFooter,
  StyledCreateNonHeroCarouselPage,
  StyledCarouselTitle,
  StyledCarouselType,
} from './StyledCreateNonCarouselPage';
import { useGetCarouselList } from './CreateNonCarouselHooks';
import { CarouselFormValidation } from './CreateNonCarouselValidation';
import {
  carouselTypesOptions,
  platformOptions,
  getTileTypeOptions,
  getPositionOptions,
} from './CreateNonCarouselMenu';

const initialValues: CreateNonCarouselPageState = {
  title: '',
  titleImage: {
    url: '',
    height: '',
    width: '',
  },
  carouselType: '',
  sorts: [],
  position: '',
  platform: [],
  startDate: new Date(),
  endDate: new Date(Date.now() + 3600 * 1000 * 24),
  tiles: [],
  userTypes: [],
  customerIds: '',
  navigation: 'false',
};
const snackBarProps: Pick<HsSnackbarProps, 'open' | 'type' | 'message'> = {
  open: false,
  type: 'error' as const,
  message: 'Test',
};
export const CreateNonCarouselPage: FC<CreateNonCarouselProps> = (
  props: CreateNonCarouselProps
) => {
  const [data, setData] = useState(initialValues);
  const [snackBarError, setSnackBarError] = useState(snackBarProps);
  const history = useHistory();
  const onSnackBarClose = (open: boolean) => {
    setSnackBarError({ ...snackBarError, open });
  };

  const listData = useGetCarouselList();
  const userTypeList: List = listData.userTypeList.list;
  const getResponseFormat = (data: string[], list: List) => {
    const dataList = [];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (data.includes(element.id)) {
        dataList.push(element);
      }
    }
    return dataList;
  };
  useEffect(() => {
    (async () => {
      try {
        if (props.carouselId) {
          const carouselData =
            await carouselService.getNonHeroCarouselData<CreateNonCarouselPageState>(
              props.carouselId
            );
          const title = carouselData.title
            ? carouselData.title.substr(0, 20)
            : '';
          const userTypeResponse = carouselData.userTypes;
          const response: any = Object.assign({}, carouselData);
          response['userTypes'] = getResponseFormat(
            userTypeResponse,
            userTypeList
          );
          response['navigation'] = response['navigation'] ? 'true' : 'false';
          setData({ ...response, title });
        } else {
          setData(initialValues);
        }
      } catch (error) {
        const errorResponse = error.data || error;
        let message = 'Try Later';
        if (errorResponse.action === 'failure') {
          message = errorResponse.messageDetail.message;
        }
        setSnackBarError({
          open: true,
          type: 'error',
          message: message,
        });
      }
    })();
  }, [props.carouselId]);

  const showStatus = (responseData: any) => {
    if (responseData.action === 'success') {
      const obj = responseData.messageDetail;
      setSnackBarError({
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
        open: true,
        type,
        message: obj.message,
      });
    }
  };
  return (
    <div className="create-form">
      <Formik
        enableReinitialize={true}
        initialValues={data}
        validationSchema={CarouselFormValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            let startDate: any = values.startDate;
            let endDate: any = values.endDate;

            if (typeof startDate === 'object') {
              startDate = format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss");
            }
            if (typeof endDate === 'object') {
              endDate = format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss");
            }

            const carouselType = values.carouselType;
            const tilesLength = values.tiles.length;
            let errorMessage;
            switch (carouselType) {
              case '1':
                if (tilesLength < 3) {
                  errorMessage = 3;
                }

                break;
              case '2':
                if (tilesLength < 5) {
                  errorMessage = 5;
                }

                break;
              case '3':
                if (tilesLength < 7) {
                  errorMessage = 7;
                }
                break;
              case '4':
                if (tilesLength < 9) {
                  errorMessage = 9;
                }

                break;
              case '5':
                if (tilesLength < 11) {
                  errorMessage = 11;
                }
                break;
            }
            if (errorMessage) {
              setSnackBarError({
                open: true,
                type: 'error',
                message: `Please add minimum ${errorMessage} tiles`,
              });
              return;
            }
            if (
              values.navigation == 'true' &&
              values['titleImage'] &&
              values['titleImage'].url
            ) {
              values['titleImage'] = { url: '', height: '', width: '' };
            }
            const postData = {
              ...values,
              userTypes: values.userTypes.map((data: ListOption) => data.id),
              navigation: values.navigation == 'true' ? true : false,
              startDate: startDate,
              endDate: endDate,
              tiles: [...values.tiles].map((tile, index) => ({
                ...tile,
                position: index + 1,
              })),
            };
            if (props.action) {
              props.action(postData);
            }
            carouselService
              .postPageCarousel<typeof postData, any>(postData)
              .then((res: any) => {
                showStatus(res);
                if (res.action === 'success') {
                  history.push('/dashboard');
                }
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
          <Form autoComplete="off">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <StyledCreateNonHeroCarouselPage>
                <Grid container spacing={2}>
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
                                disabled={values.navigation == 'true'}
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
                                name="sorts"
                                label="Select Sort"
                                variant="standard"
                                component={Autocomplete}
                                options={listData['sortList'].list}
                                loading={listData['sortList'].isLoading}
                                getOptionSelected={(
                                  option: ListOption,
                                  selectedValue: ListOption
                                ) => option.id == selectedValue?.id}
                                getOptionLabel={(option: SortListOption) =>
                                  option.value ? option.value : option.name
                                }
                                renderInput={(
                                  params: AutocompleteRenderInputParams
                                ) => (
                                  <MuiTextField
                                    {...params}
                                    helperText={
                                      touched['sorts'] && errors['sorts']
                                    }
                                    label="Sort"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs>
                              <Field
                                multiple
                                name="userTypes"
                                label="Select User Type"
                                variant="standard"
                                component={Autocomplete}
                                options={userTypeList}
                                getOptionSelected={(
                                  option: ListOption,
                                  selectedValue: ListOption
                                ) => option.id == selectedValue?.id}
                                getOptionLabel={(option: ListOption) =>
                                  option.name
                                }
                                renderInput={(
                                  params: AutocompleteRenderInputParams
                                ) => (
                                  <MuiTextField
                                    {...params}
                                    // helperText={
                                    //   touched['userTypes'] &&
                                    //   errors['userTypes']
                                    // }
                                    label="User Type"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs>
                              <StyledCarouselType>
                                <label>
                                  <Field
                                    type="radio"
                                    name="navigation"
                                    value="false"
                                  />
                                  Page Carousel
                                </label>
                              </StyledCarouselType>
                              <StyledCarouselType>
                                <label>
                                  <Field
                                    type="radio"
                                    name="navigation"
                                    value="true"
                                    onClick={() => {
                                      setFieldValue('position', 1);
                                    }}
                                  />
                                  Navigation Carousel
                                </label>
                              </StyledCarouselType>
                            </Grid>
                            <Grid item xs>
                              <Field
                                component={DateTimePicker}
                                fullWidth
                                ampm={false}
                                name="startDate"
                                label="Start Date"
                              />
                            </Grid>
                            <Grid item xs>
                              <Field
                                component={DateTimePicker}
                                fullWidth
                                ampm={false}
                                name="endDate"
                                label="End Date"
                              />
                            </Grid>
                            <Grid item xs>
                              <label> Customer Ids</label>
                              <Field
                                name="customerIds"
                                as="textarea"
                                placeholder="Customer Ids"
                                style={{ width: '100%', height: '100px' }}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </StyledCard>
                    </StyledCreateCarouselPage>
                  </Grid>
                  <Grid item xs={9}>
                    {values.navigation == 'false' && (
                      <StyledCarouselTitle>
                        <Grid item xs={8}>
                          <StyledCarouselCard
                            key={'card0'}
                            variant={'elevation'}
                          >
                            <CardHeader
                              action={
                                <IconButton
                                  onClick={() => {
                                    setFieldValue('titleImage.url', '');
                                    setFieldValue('titleImage.width', '');
                                    setFieldValue('titleImage.height', '');
                                  }}
                                >
                                  <DeleteForeverIcon fontSize={'large'} />
                                </IconButton>
                              }
                              title={'Page Carousel Title'}
                            />
                            <CardContent>
                              <CardActionArea>
                                <Field
                                  id={`image.title`}
                                  component={ImageUpload}
                                  previewHeight="100"
                                  previewWidth="500"
                                  name={`titleImage.url`}
                                  imageUrl={values.titleImage?.url}
                                  onChange={async (value: ImageListType) => {
                                    try {
                                      const resp =
                                        await carouselService.imageUpload({
                                          file: value[0].file,
                                        });
                                      setFieldValue(
                                        `titleImage.url`,
                                        `https://${resp.imageURLPrefix}/fstatic${resp.imageResponse.imageUrl}?version=${resp.imageResponse.version}`
                                      );
                                      setFieldValue(
                                        'titleImage.height',
                                        resp.imageResponse.imageAreas[0].height
                                      );
                                      setFieldValue(
                                        'titleImage.width',
                                        resp.imageResponse.imageAreas[0].width
                                      );
                                    } catch (err) {
                                      setFieldValue('titleImage', undefined);
                                    }
                                  }}
                                ></Field>
                              </CardActionArea>
                            </CardContent>
                          </StyledCarouselCard>
                        </Grid>
                      </StyledCarouselTitle>
                    )}
                    <FieldArray name="tiles">
                      {({ remove, push, move }) => (
                        <StyledCarouselCardPage>
                          <Grid container spacing={3}>
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
                                          <DeleteForeverIcon
                                            fontSize={'large'}
                                          />
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
                                              const res =
                                                await carouselService.imageUpload(
                                                  { file: value[0].file }
                                                );
                                              setFieldValue(
                                                `tiles.${index}.imageUrl`,
                                                `https://${res.imageURLPrefix}/fstatic${res.imageResponse.imageUrl}?version=${res.imageResponse.version}`
                                              );
                                              if (values.tiles.length == 1) {
                                                setFieldValue(
                                                  'tileHeight',
                                                  res.imageResponse
                                                    .imageAreas[0].height
                                                );
                                                setFieldValue(
                                                  'tileWidth',
                                                  res.imageResponse
                                                    .imageAreas[0].width
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
                                                evt: React.ChangeEvent<HTMLInputElement>
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
                                                evt: React.ChangeEvent<HTMLLIElement>
                                              ) => {
                                                move(
                                                  index,
                                                  evt.target.value - 1
                                                );
                                                setFieldValue(
                                                  `tiles.${
                                                    evt.target.value - 1
                                                  }.position`,
                                                  evt.target.value
                                                );
                                              }}
                                            >
                                              {getPositionOptions(
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
                                                      name: values.tiles[index]
                                                        .actionName,
                                                      id: values.tiles[index]
                                                        .actionId,
                                                    }
                                                  : null
                                              }
                                              component={Autocomplete}
                                              getOptionSelected={(
                                                option: ListOption,
                                                selectedValue: ListOption
                                              ) =>
                                                option.id == selectedValue?.id
                                              }
                                              options={
                                                listData[
                                                  values.tiles[index].type
                                                ].list
                                              }
                                              getOptionLabel={(
                                                option: ListOption
                                              ) =>
                                                option.name ? option.name : ''
                                              }
                                              loading={
                                                listData[
                                                  values.tiles[index].type
                                                ].isLoading
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
                                disabled={
                                  isSubmitting ||
                                  (!isValid && values.tiles.length > 0) ||
                                  (values.tiles.length === 12 ? true : false)
                                }
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
                        </StyledCarouselCardPage>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
              </StyledCreateNonHeroCarouselPage>
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
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
      {snackBarError.open && (
        <HsSnackbar
          onSnackBarClose={onSnackBarClose}
          open={snackBarError.open}
          type={snackBarError.type}
          message={snackBarError.message}
        />
      )}
    </div>
  );
};
