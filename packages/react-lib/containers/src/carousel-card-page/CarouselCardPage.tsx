import React, { useState, useEffect } from 'react';
import { State, Tile } from './ICarouselCardPage';
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
import {
  carouselService,
  productListService,
  List,
  ListOption,
} from '@hs/services';

let count = 0;
const getCount = () => ++count;

const initialValues: State = {
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

export const CarouselCardPage = () => {
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

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <FieldArray name="tiles">
              {({ remove, push }) => (
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
                                  resolutionValidationType={'absolute'}
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
                                              value:
                                                values.tiles[index].actionId,
                                            }
                                          : null
                                      }
                                      component={Autocomplete}
                                      getOptionSelected={(
                                        option: ListOption,
                                        selectedValue: ListOption
                                      ) => option.value == selectedValue?.value}
                                      options={getOptions(
                                        values.tiles[index].type
                                      )}
                                      getOptionLabel={(option: ListOption) =>
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
                          </StyledCard>
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
