import React, { useRef } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
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
  padding-left: 15px;
  padding-bottom: 15px;
  /* width: 230px; */
  background-color: ${Colors.GREY_SHADE[500]};
`;
export const CarouselCard = ({
  imageupload,
  positionBox,
  typeBox,
  autoCopmpleOptions,
  ...props
}: CarouselCardProps) => {
  // const [state, setstate] = useState<CarouselCardState>({
  //   type: props.type,
  //   type_id: props.type_id,
  //   position: props.position,
  //   image_url: props.image_url,
  // });
  const cardIdRef = useRef('');
  const getCardId = () => {
    if (cardIdRef.current == '') {
      cardIdRef.current = props.cardId;
    }
    return cardIdRef.current;
  };
  const handleDelete = () => {
    if (props.onDelete) props.onDelete(getCardId());
  };
  const handlePositionChange = (position) => {
    if (props.onPositionChange)
      props.onPositionChange({
        cardId: getCardId(),
        position: position,
      });
  };
  // const handleChange = () => {};
  return (
    <StyledCard variant={'elevation'}>
      <CardHeader
        avatar={<Avatar>R+{props.position}</Avatar>}
        action={
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon fontSize={'large'} />
          </IconButton>
        }
        title={props.cardId}
        subheader="September 14, 2016"
      />
      <CardContent>
        <CardActionArea>
          <ImageUpload {...imageupload}></ImageUpload>
        </CardActionArea>
      </CardContent>
      <MuiThemeProvider theme={DarkTheme}>
        <StyledFooter>
          <Grid container spacing={1}>
            <Grid item xs>
              <SelectBox
                placeholder={'Type'}
                size={'small'}
                {...typeBox}
              ></SelectBox>
            </Grid>
            <Grid item xs>
              <SelectBox
                placeholder={'Positon'}
                size={'small'}
                {...positionBox}
                onChange={handlePositionChange}
              ></SelectBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <AutoComplete {...autoCopmpleOptions}></AutoComplete>
            </Grid>
          </Grid>
        </StyledFooter>
      </MuiThemeProvider>
    </StyledCard>
  );
};
