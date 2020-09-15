import React from 'react';
import { State } from './ICarouselCardPage';
import {
  Button,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
  Avatar,
  IconButton,
  MenuItem,
  Box,
  TextField as MuiTextField,
} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab';
import {
  StyledCarouselPage,
  StyledCard,
  StyledFooter,
} from './StyledCarouselCardPage';
import { Formik, Field, Form, FieldArray } from 'formik';
import { DarkTheme } from '@hs/utils';
import { TextField } from 'formik-material-ui';
import { ImageUpload, ImageListType } from '@hs/components';
import { carouselService, ListOption } from '@hs/services';
import { useGetCarouselList } from './CarouselCardHooks';
import { CardPageValidation } from './CarouselCardValidation';

// let count = 0;
// const getCount = () => ++count;

const initialValues: State = {
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

export const CarouselCardPage = () => {
  const listData = useGetCarouselList();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={CardPageValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, isSubmitting, setFieldValue, isValid }) => (
          <Form>
            <FieldArray name="tiles">
              {({ remove, push, move }) => (
                <StyledCarouselPage>
                  <Grid container direction="row" spacing={2}>
                    {values.tiles.length > 0 &&
                      values.tiles.map((tile, index) => (
                        <Grid item xs={3} key={'CarouselTile' + index}>
                          <StyledCard
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
                                      setFieldValue('tileHeight', undefined);
                                      setFieldValue('tileWidth', undefined);
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
                                  onChange={async (value: ImageListType) => {
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
                                          res.imageResponse.imageAreas[0].height
                                        );
                                        setFieldValue(
                                          'tileWidth',
                                          res.imageResponse.imageAreas[0].width
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
                                          evt.target ? evt.target.value : ''
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
                                        // setFieldValue(
                                        //   `tiles.${index}.position`,
                                        //   evt.target.value
                                        // );
                                        move(index, evt.target.value - 1);
                                        setFieldValue(
                                          `tiles.${
                                            evt.target.value - 1
                                          }.position`,
                                          evt.target.value
                                        );
                                      }}
                                    >
                                      {getPostionOptions(values.tiles.length)}
                                    </Field>
                                  </Grid>
                                  <Grid item xs>
                                    <Field
                                      name={`tiles.${index}.actionObj`}
                                      variant="standard"
                                      // helperText="Please select sort"
                                      // defaultValue={{
                                      //   name: values.tiles[index].actionName,
                                      //   value: values.tiles[index].actionId,
                                      // }}
                                      value={
                                        values.tiles[index].actionId
                                          ? {
                                              name:
                                                values.tiles[index].actionName,
                                              id: values.tiles[index].actionId,
                                            }
                                          : null
                                      }
                                      component={Autocomplete}
                                      getOptionSelected={(
                                        option: ListOption,
                                        selectedValue: ListOption
                                      ) => option.id == selectedValue?.id}
                                      options={
                                        listData[values.tiles[index].type].list
                                      }
                                      getOptionLabel={(option: ListOption) =>
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
                          </StyledCard>
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
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};
