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
} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  StyledCarouselPage,
  StyledCard,
  StyledFooter,
} from './StyledCarouselCardPage';
import { Formik, Field, Form, FieldArray } from 'formik';
import { DarkTheme } from '@hs/utils';
import { TextField } from 'formik-material-ui';
import { ImageUpload, ImageListType } from '@hs/components';
import { carouselService } from '@hs/services';

let count = 0;
const getCount = () => ++count;

const initialValues: State = {
  imageWidth: 400,
  imageHeight: 500,
  tiles: [],
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
                              avatar={<Avatar>R+{tile.position}</Avatar>}
                              action={
                                <IconButton onClick={() => remove(index)}>
                                  <DeleteForeverIcon fontSize={'large'} />
                                </IconButton>
                              }
                              title={'C' + index}
                              subheader="September 14, 2016"
                            />
                            <CardContent>
                              <CardActionArea>
                                <Field
                                  id={`image.${index}`}
                                  component={ImageUpload}
                                  name={`tiles.${index}.imageUrl`}
                                  value={tile.imageUrl}
                                  onChange={async (value: ImageListType) => {
                                    try {
                                      const res = await carouselService.imageUpload(
                                        { file: value[0].file }
                                      );
                                      setFieldValue(
                                        `tiles.${index}.imageUrl`,
                                        res.imageResponse.imageUrl
                                      );
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
