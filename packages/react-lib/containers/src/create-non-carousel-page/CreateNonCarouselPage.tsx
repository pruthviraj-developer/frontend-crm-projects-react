import React, { FC, useState, useEffect } from 'react';
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
} from '@material-ui/core';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DateFnsUtils from '@date-io/date-fns';
import { HsSnackbar, HsSnackbarProps } from '@hs/components';
import { format } from 'date-fns';
import { createService, carouselService, SortList } from '@hs/services';
import { productListService, List, ListOption } from '@hs/services';
import { CreateCarouselProps } from './../create-carousel-page';
import { CreateCarouselPageState } from './ICreateCarouselPage';
import {
  StyledCreateCarouselPage,
  StyledCard,
  StyledChips,
} from './StyledCreateCarouselPage';
import {
  StyledCarouselPage,
  StyledCarouselCard,
  StyledFooter,
} from './StyledCarouselCardPage';

import { Tile } from 'carousel-card-page';
interface Values {
  title: string;
  carouselType: string;
  sort: string;
  position: string;
  platform: string;
  start_date: string;
  end_date: string;
}

let count = 0;
const getCount = () => ++count;

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
      position: getCount(),
      actionId: '11233',
      actionName: 'TEST123 - 11233',
      imageUrl:
        'https://static.hopscotch.in/fstatic/product/202008/067483ca-5952-48fa-863c-f341687d0d9b_full.jpg?version=1597741405901',
    },
    {
      type: 'plp',
      position: getCount(),
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

const getPostionOptions = () => {
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
  const [sorts, setSortingList] = useState<SortList>([]);
  const loading = sorts.length == 0;
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

  const [plpList, setPlpList] = useState<List>([]);
  const [spList, setSpList] = useState<List>([]);
  const [boutiqueList, setBoutiqueList] = useState<List>([]);
  const isPlpLoading = plpList.length === 0;
  const getOptions = (optionType: Tile['type'] = 'plp') => {
    if (optionType == 'plp') return plpList;
    else if (optionType == 'sp') return spList;
    else if (optionType == 'boutique') return boutiqueList;
    return [];
  };

  useEffect(() => {
    (async () => {
      try {
        const plpList = await productListService.getPlpList();
        setPlpList(plpList);
      } catch (error) {
        setPlpList([]);
      }
    })();
    return () => {
      setPlpList([]);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const plpList = await productListService.getSpList();
        setSpList(plpList);
      } catch (error) {
        setSpList([]);
      }
    })();
    return () => {
      setSpList([]);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const boutiqueList = await productListService.getBoutiqueList();
        setBoutiqueList(boutiqueList);
      } catch (error) {
        setBoutiqueList([]);
      }
    })();
    return () => {
      setBoutiqueList([]);
    };
  }, []);

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
        {({ values, isSubmitting, setFieldValue, touched, errors }) => (
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
                        </Grid>
                      </CardContent>
                    </StyledCard>
                  </StyledCreateCarouselPage>
                </Grid>
                <Grid item xs={9}>
                  <FieldArray name="tiles">
                    {({ remove, push }) => (
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
                                        resolutionValidationType={'absolute'}
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
                                            select
                                            inputProps={{
                                              id: 'outlined-select',
                                            }}
                                            variant={'outlined'}
                                          >
                                            {getPostionOptions()}
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
                                                    value:
                                                      values.tiles[index]
                                                        .actionId,
                                                  }
                                                : null
                                            }
                                            component={Autocomplete}
                                            getOptionSelected={(
                                              option: ListOption,
                                              selectedValue: ListOption
                                            ) =>
                                              option.value ==
                                              selectedValue?.value
                                            }
                                            options={getOptions(
                                              values.tiles[index].type
                                            )}
                                            getOptionLabel={(
                                              option: ListOption
                                            ) =>
                                              option.name ? option.name : ''
                                            }
                                            loading={isPlpLoading}
                                            onChange={(
                                              _evt: React.ChangeEvent,
                                              actionvalue: ListOption
                                            ) => {
                                              setFieldValue(
                                                `tiles.${index}.actionId`,
                                                actionvalue?.value
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
                              disabled={isSubmitting}
                              size={'large'}
                              onClick={() =>
                                push({
                                  type: 'plp',
                                  position: getCount(),
                                  id: null,
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
                  disabled={isSubmitting}
                  size={'large'}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </MuiPickersUtilsProvider>
          </Form>
        )}
      </Formik>
      {HsSnackBarError.open && <HsSnackbar {...HsSnackBarError} />}
    </div>
  );
};
