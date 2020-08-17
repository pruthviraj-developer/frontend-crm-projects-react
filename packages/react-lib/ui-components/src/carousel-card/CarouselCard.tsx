import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Box,
  Grid,
  Button,
  Avatar,
  IconButton,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ImageUpload } from 'image-upload';
import { CarouselCardProps } from './ICarouselCard';
import { SelectBox } from 'select-box';
import { AutoCompleteGrouped as AutoComplete } from 'auto-complete';
import { DarkTheme, Colors } from '@hs/utils';

const StyledCard = styled(Card)`
  max-width: 230px;
`;
const StyledFooter = styled.div`
  flexgrow: 1;
  padding-left: 15px;
  padding-bottom: 15px;
  /* width: 230px; */
  background-color: ${Colors.GREY_SHADE[500]};
`;
const CarouselCard = ({
  resolutionHeight,
  resolutionWidth,
  resolutionValidationType,
}: CarouselCardProps) => {
  return (
    <StyledCard variant={'elevation'}>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        action={
          <IconButton>
            <DeleteForeverIcon fontSize={'large'} />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <CardActionArea>
          <ImageUpload
            resolutionHeight={resolutionHeight}
            resolutionWidth={resolutionWidth}
            resolutionValidationType={resolutionValidationType}
          ></ImageUpload>
        </CardActionArea>
      </CardContent>
      <MuiThemeProvider theme={DarkTheme}>
        <StyledFooter>
          <Grid container spacing={1}>
            <Grid item xs>
              <SelectBox></SelectBox>
            </Grid>
            <Grid item xs>
              <SelectBox></SelectBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <AutoComplete></AutoComplete>
            </Grid>
          </Grid>
        </StyledFooter>
      </MuiThemeProvider>
    </StyledCard>
  );
};

export default CarouselCard;
